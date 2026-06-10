import React, { useState } from 'react';
import GapAnalysisModal from './GapAnalysisModal';

import { pathRequirements } from '../data/coursesData';

const getMatchedCourses = (emp, path) => {
  if (!emp || !path || !pathRequirements[path]) return [];
  const reqs = pathRequirements[path];
  
  return reqs.filter(course => {
    return emp.completedCourses.includes(course);
  });
};

const PathPivotCanvas = ({ employees, setEmployees, selectedEmployee, setSelectedEmployee }) => {
  const [showPivotModal, setShowPivotModal] = useState(false);
  const [pivotTarget, setPivotTarget] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleDragStart = (e, emp) => {
    e.dataTransfer.setData("employeeId", emp.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetPath) => {
    e.preventDefault();
    const empId = e.dataTransfer.getData("employeeId");
    if (empId && selectedEmployee && parseInt(empId) === selectedEmployee.id) {
      setPivotTarget(targetPath);
      setShowPivotModal(true);
    }
  };

  const handlePivotSubmit = () => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === selectedEmployee.id) {
        const matched = getMatchedCourses(emp, pivotTarget);
        const totalReqs = pathRequirements[pivotTarget] || [];
        const score = totalReqs.length > 0 ? Math.round((matched.length / totalReqs.length) * 100) : 0;
        
        const pending = totalReqs.filter(c => !emp.completedCourses.includes(c));
        const currentReqs = pending.slice(0, 1);
        const nextReqs = pending.slice(1);

        const updated = {
          ...emp,
          specialization: pivotTarget === "مسار هندسة الذكاء الاصطناعي" ? "ذكاء اصطناعي" : 
                          pivotTarget === "مسار الأمن السيبراني" ? "أمن سيبراني" : 
                          pivotTarget === "مسار البيانات" ? "علم بيانات" : 
                          (pivotTarget === "مسار فني كمبيوتر" || pivotTarget === "مسار فني دعم تقني") ? "دعم فني" : "برمجة",
          targetPosition: pivotTarget === "مسار هندسة الذكاء الاصطناعي" ? "مهندس ذكاء اصطناعي" : 
                          pivotTarget === "مسار الأمن السيبراني" ? "مهندس أمن سيبراني" : 
                          pivotTarget === "مسار البيانات" ? "محلل نظم" : 
                          pivotTarget === "مسار فني كمبيوتر" ? "فني كمبيوتر" : 
                          pivotTarget === "مسار فني دعم تقني" ? "فني دعم تقني" : "مبرمج",
          readinessScore: score,
          completedCourses: matched,
          currentRequirements: currentReqs,
          nextRequirements: nextReqs
        };
        setSelectedEmployee(updated);
        return updated;
      }
      return emp;
    }));
    setShowPivotModal(false);
    setToastMessage(`تم اعتماد ${pivotTarget} بنجاح للموظف ${selectedEmployee.fullName}!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const pathScores = selectedEmployee ? Object.keys(pathRequirements).map(path => {
    const matched = getMatchedCourses(selectedEmployee, path);
    const totalReqs = pathRequirements[path] || [];
    const score = totalReqs.length > 0 ? Math.round((matched.length / totalReqs.length) * 100) : 0;
    return { path, score, matchedCount: matched.length };
  }) : [];

  const recommendedPath = selectedEmployee ? [...pathScores].sort((a, b) => b.score - a.score || b.matchedCount - a.matchedCount)[0] : null;

  return (
    <div className="flex flex-col gap-6 relative text-right">
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce border border-blue-500">
          <i className="fa-solid fa-circle-check text-xl"></i>
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {selectedEmployee ? (
        <>
          {/* Top Section: Employee Info (Draggable) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm justify-start">
              <i className="fa-solid fa-user-tag text-emerald-500"></i>
              <span>الموظف النشط (قابل للسحب لنقل مساره)</span>
            </h3>
            
            <div 
              draggable
              onDragStart={(e) => handleDragStart(e, selectedEmployee)}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4 border-l-4 border-l-emerald-500 max-w-2xl"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="text-right w-full">
                  <h4 className="font-bold text-base text-slate-800">{selectedEmployee.fullName}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedEmployee.currentPosition} • {selectedEmployee.currentDepartment}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-semibold border border-blue-100">
                      المسار الحالي: {selectedEmployee.specialization}
                    </span>
                    {selectedEmployee.targetPosition && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold border border-slate-200">
                        المنصب المستهدف: {selectedEmployee.targetPosition}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center text-[10px] text-slate-400 flex flex-col items-center shrink-0 pl-2">
                <i className="fa-solid fa-grip-lines mb-1 text-base text-slate-300"></i>
                <span>اسحب بطاقة الموظف من هنا وأفلتها على المسار الجديد أدناه</span>
              </div>
            </div>
          </div>

          {/* Middle Section: Dropzones (6 column grid) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm justify-start">
              <i className="fa-solid fa-boxes-stacked text-blue-500"></i>
              <span>المسارات التقنية المتاحة (اسحب الموظف وأفلته فوق المسار المطلوب)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {["مسار هندسة الذكاء الاصطناعي", "مسار الأمن السيبراني", "مسار البرمجة", "مسار البيانات", "مسار فني كمبيوتر", "مسار فني دعم تقني"].map(path => {
                const score = pathScores.find(p => p.path === path)?.score || 0;
                const isRecommended = recommendedPath && recommendedPath.path === path;
                
                return (
                  <div 
                    key={path}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, path)}
                    className={`bg-white border-2 p-4 rounded-xl shadow-sm flex flex-col justify-between hover:border-blue-400 transition-all relative ${
                      isRecommended ? 'border-emerald-300 bg-emerald-50/10' : 'border-slate-200'
                    }`}
                  >
                    {isRecommended && (
                      <span className="absolute -top-2.5 right-4 bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm">
                        موصى به
                      </span>
                    )}
                    
                    <div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3 ${
                        isRecommended ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'
                      }`}>
                        <i className={`fa-solid ${
                          path.includes('الذكاء') ? 'fa-brain' : 
                          path.includes('الأمن') ? 'fa-shield-halved' : 
                          path.includes('البرمجة') ? 'fa-code' : 
                          path.includes('البيانات') ? 'fa-magnifying-glass-chart' : 
                          path.includes('دعم') ? 'fa-headset' : 'fa-laptop-code'
                        }`}></i>
                      </div>
                      <h4 className="font-bold text-xs text-slate-800 leading-tight">{path}</h4>
                      <p className="text-[9px] text-slate-400 mt-1 leading-normal">الجاهزية الأولية: {score}%</p>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] text-blue-500 font-semibold">
                      <span>أفلت الموظف هنا</span>
                      <i className="fa-solid fa-arrow-down-long animate-bounce text-[10px]"></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Section: 3 Cards (Comparison and Recommendations) */}
          <div>
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm justify-start">
              <i className="fa-solid fa-chart-line text-blue-500"></i>
              <span>التحليل المقارن والجاهزية المهنية للموظف</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: سجل الدورات التدريبية المكتملة */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-700 border-b border-slate-100 pb-2 mb-3 flex items-center gap-1.5">
                    <i className="fa-solid fa-award text-emerald-500"></i>
                    <span>سجل الدورات المكتملة للموظف</span>
                  </h4>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto">
                    {selectedEmployee.completedCourses && selectedEmployee.completedCourses.length > 0 ? (
                      selectedEmployee.completedCourses.map((c, i) => (
                        <div key={i} className="bg-emerald-50/50 border border-emerald-100/50 p-2 rounded-lg flex items-center gap-2 text-[10px] text-emerald-800">
                          <i className="fa-solid fa-check text-emerald-500 shrink-0"></i>
                          <span>{c}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-[10px] text-slate-400">لا يوجد سجل دورات مكتملة حالياً</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-semibold">
                  مجموع: {selectedEmployee.completedCourses?.length || 0} دورات مكتملة
                </div>
              </div>

              {/* Card 2: المسارات المهنية الموصى بها */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-700 border-b border-slate-100 pb-2 mb-3 flex items-center gap-1.5">
                    <i className="fa-solid fa-wand-magic-sparkles text-amber-500"></i>
                    <span>المسارات المستقبلية الموصى بها</span>
                  </h4>
                  <div className="space-y-2.5">
                    {pathScores.map(p => {
                      const isBest = recommendedPath && recommendedPath.path === p.path;
                      return (
                        <div key={p.path} className={`p-2 rounded-lg border flex flex-col gap-1 text-[10px] ${
                          isBest ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 font-bold' : 'bg-slate-50/50 border-slate-100 text-slate-600'
                        }`}>
                          <div className="flex justify-between items-center">
                            <span className="truncate max-w-[70%]">{p.path}</span>
                            <span className={isBest ? 'text-emerald-600 font-bold' : 'text-slate-500'}>{p.score}% جاهزية</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1">
                            <div className={`h-1 rounded-full ${isBest ? 'bg-emerald-500' : 'bg-slate-400'}`} style={{ width: `${p.score}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>الأنسب: {recommendedPath?.path}</span>
                </div>
              </div>

              {/* Card 3: أثر تغيير المسار المهني */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-700 border-b border-slate-100 pb-2 mb-3 flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-info text-blue-500"></i>
                    <span>أثر نقل المسار وتغيير التخصص</span>
                  </h4>
                  <div className="space-y-2 text-[10px] text-slate-600">
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-400">تغيير التخصص الحالي:</span>
                      <span className="font-bold text-slate-700">{selectedEmployee.specialization} ➜ (حسب المسار المختار)</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-400">المنصب الترقوي المستهدف:</span>
                      <span className="font-bold text-slate-700">تكييف للمسمى المهني الجديد</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-400">خطة تمكين سريعة:</span>
                      <span className="font-bold text-blue-600">تقليص الهدر التدريبي بنسبة 100%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-500 leading-snug">
                  * سيتم احتساب الجاهزية الحالية وتوليد خطة لسد الفجوة التدريبية فور سحب الموظف وإفلاته.
                </div>
              </div>

            </div>
          </div>
        </>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center">
          <i className="fa-solid fa-user-slash text-4xl text-slate-300 mb-3"></i>
          <p className="text-slate-500 text-sm font-semibold">الرجاء اختيار موظف من لوحة كاشف المواهب أولاً للاستعراض.</p>
        </div>
      )}

      {showPivotModal && (
        <GapAnalysisModal 
          employee={selectedEmployee} 
          targetPath={pivotTarget} 
          matchedCourses={getMatchedCourses(selectedEmployee, pivotTarget)}
          onClose={() => setShowPivotModal(false)} 
          onSubmit={handlePivotSubmit} 
        />
      )}
    </div>
  );
};

export default PathPivotCanvas;
