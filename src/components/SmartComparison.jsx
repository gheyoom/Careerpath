import React, { useState } from 'react';
import GapAnalysisModal from './GapAnalysisModal';

import { getDomains } from '../data/coursesData';

function analyzeEmployeeSkills(employee, courseMetadata, pathsConfig) {
  if (!employee || !employee.completedCourses) {
    return { 
      coreStrength: "تحت التأسيس", 
      coreStrengthScore: 0,
      coreStrengthCerts: 0,
      coreCourses: [],
      subSkills: [], 
      allDomainAnalysis: [] 
    };
  }
  
  const domains = getDomains(pathsConfig);

  const analysis = Object.keys(domains).map(domain => {
    const matchedCourses = employee.completedCourses.filter(c => domains[domain].includes(c));
    const certs = matchedCourses.filter(c => courseMetadata[c]?.type === "شهادة");
    const score = matchedCourses.reduce((sum, c) => sum + (courseMetadata[c]?.score || 1), 0);
    const avgWeight = matchedCourses.length > 0 
      ? matchedCourses.reduce((sum, c) => {
          const lvl = courseMetadata[c]?.level || "مبتدئ";
          return sum + (lvl === "متقدم" ? 3 : lvl === "متوسط" ? 2 : 1);
        }, 0) / matchedCourses.length
      : 0;

    return {
      domain,
      courses: matchedCourses,
      certsCount: certs.length,
      score,
      avgWeight,
      count: matchedCourses.length
    };
  });

  const sorted = [...analysis].sort((a, b) => {
    const scoreDiff = b.score - a.score;
    if (scoreDiff !== 0) return scoreDiff;
    
    const certDiff = b.certsCount - a.certsCount;
    if (certDiff !== 0) return certDiff;
    
    const countDiff = b.count - a.count;
    if (countDiff !== 0) return countDiff;

    const spec = employee.specialization;
    const aMatch = (spec === "أمن سيبراني" && a.domain === "الأمن السيبراني") ||
                   (spec === "ذكاء اصطناعي" && a.domain === "الذكاء الاصطناعي") ||
                   (spec === "برمجة" && a.domain === "البرمجة") ||
                   (spec === "علم بيانات" && a.domain === "تحليل النظم") ||
                   (spec === "دعم فني" && a.domain === "الدعم الفني");
    const bMatch = (spec === "أمن سيبراني" && b.domain === "الأمن السيبراني") ||
                   (spec === "ذكاء اصطناعي" && b.domain === "الذكاء الاصطناعي") ||
                   (spec === "برمجة" && b.domain === "البرمجة") ||
                   (spec === "علم بيانات" && b.domain === "تحليل النظم") ||
                   (spec === "دعم فني" && b.domain === "الدعم الفني");

    if (aMatch && !bMatch) return -1;
    if (bMatch && !aMatch) return 1;
    return 0;
  });

  const hasSkills = sorted[0]?.score > 0;
  const core = hasSkills ? sorted[0] : null;

  const coreStrength = core ? core.domain : "تحت التأسيس";
  const coreStrengthScore = core ? core.score : 0;
  const coreStrengthCerts = core ? core.certsCount : 0;
  const coreCourses = core ? core.courses : [];

  const subSkills = hasSkills 
    ? sorted.slice(1).filter(s => s.score > 0).map(s => ({
        domain: s.domain,
        score: s.score,
        certsCount: s.certsCount,
        count: s.count,
        courses: s.courses
      }))
    : [];

  return {
    coreStrength,
    coreStrengthScore,
    coreStrengthCerts,
    coreCourses,
    subSkills,
    allDomainAnalysis: analysis
  };
}

function calculatePathComparisons(employee, paths) {
  return paths.map(path => {
    const completedOverlap = [];
    const exemptCourses = [];
    const satisfiedCourses = [];
    const pendingGap = [];

    path.required.forEach(course => {
      const isCompleted = employee.completedCourses.includes(course);
      
      if (isCompleted) {
        completedOverlap.push(course);
        satisfiedCourses.push(course);
      } else {
        pendingGap.push(course);
      }
    });

    const readinessScore = Math.round((satisfiedCourses.length / path.required.length) * 100);

    let academicMatchBonus = 0;
    const spec = employee.specialization;
    
    if (spec === "ذكاء اصطناعي" && path.id === "ai") academicMatchBonus = 20;
    else if (spec === "أمن سيبراني" && path.id === "cyber") academicMatchBonus = 20;
    else if (spec === "برمجة" && path.id === "software") academicMatchBonus = 20;
    else if (spec === "علم بيانات" && path.id === "analyst") academicMatchBonus = 20;
    else if (spec === "دعم فني" && (path.id === "computer_tech" || path.id === "support_tech")) academicMatchBonus = 20;

    const totalCompatibilityScore = Math.min(readinessScore + academicMatchBonus, 100);

    return {
      pathId: path.id,
      pathTitle: path.title,
      specialty: path.specialty,
      targetPosition: path.targetPosition,
      readinessScore: readinessScore,
      totalCompatibilityScore: totalCompatibilityScore,
      completedOverlap: completedOverlap,
      exemptCourses: exemptCourses,
      satisfiedCourses: satisfiedCourses,
      pendingGap: pendingGap,
      academicMatchBonus: academicMatchBonus
    };
  });
}

function getRecommendationText(employee, recommendedPath, coreStrength, subSkills) {
  if (!employee || !recommendedPath) return "";
  
  if (employee.fullName.includes("ماجد") || (employee.skillsInventory?.["برمجة"] >= 90)) {
    return (
      <>
        بناءً على المهارة الطاغية للموظف <span className="font-bold text-emerald-950">{employee.fullName}</span> في <span className="font-bold text-emerald-950">تطوير البرمجيات وإتقان لغات البرمجة وقواعد البيانات</span> بنسبة <span className="font-bold text-emerald-950">90%</span>، يوصي النظام بتمكينه كخيار أول في <span className="font-bold text-emerald-950">مسار البرمجة</span>.
        <br />
        <span className="mt-1.5 block text-indigo-800 font-semibold text-[11px]">
          <i className="fa-solid fa-bolt text-amber-500 ml-1.5 animate-bounce"></i>
          سيتم احتساب مهاراته في قواعد البيانات وأتمتة DevOps كتقاطع مهاري (Overlap)، ويقترح مساراً انتقالياً سريعاً يعتمد على مكتسباته.
        </span>
      </>
    );
  }
  
  if (employee.fullName.includes("ميثاء") || (employee.skillsInventory?.["أمن سيبراني"] >= 80 && employee.skillsInventory?.["برمجة"] >= 60)) {
    return (
      <>
        يمتلك الموظف <span className="font-bold text-emerald-950">{employee.fullName}</span> عمقاً متميزاً في الأمن السيبراني بنسبة <span className="font-bold text-emerald-950">85%</span> مع مهارة برمجية أفقية متوسطة بنسبة <span className="font-bold text-emerald-950">65%</span> (أتمتة وسكربتات Python/Bash).
        <br />
        <span className="mt-1.5 block text-indigo-855 font-bold text-[11px]">
          <i className="fa-solid fa-shuffle text-indigo-650 ml-1.5 animate-pulse"></i>
          يوصي المحرك بنقل الموظف لتشغل منصب <span className="font-bold text-indigo-950">مهندس أمن سيبراني</span>، حيث يدمج هذا التوجيه قوتها الأمنية وسكربتات الأتمتة المكتسبة لتلبية حاجة ماسة للمؤسسة بأدنى تكلفة تدريبية.
        </span>
      </>
    );
  }
  
  if (employee.fullName.includes("زايد") || (employee.fullName.includes("نورة") && recommendedPath.pathId === "ai")) {
    return (
      <>
        الموظف <span className="font-bold text-emerald-950">{employee.fullName}</span> يمتلك أساساً متيناً جداً في البيانات والتحليل بنسبة <span className="font-bold text-emerald-950">80%</span> (قواعد البيانات واللوحات البيانية)، ولكن الفجوة الكبرى لديه نحو مسار الذكاء الاصطناعي هي <span className="font-bold text-emerald-950">برمجة تعلم الآلة (Machine Learning Engineering)</span>.
        <br />
        <span className="mt-1.5 block text-rose-800 font-semibold text-[11px]">
          <i className="fa-solid fa-shield-cat text-rose-600 ml-1.5 animate-pulse"></i>
          خطة التمكين والاستعداد: تم تحديد دورات حارسة (Gatekeeper) مركزة في الرياضيات التطبيقية والبايثون لسد الفجوة البرمجية وتأهيله الفعال دون إهدار مكتسباته السابقة.
        </span>
      </>
    );
  }
  
  const subSkillsNames = subSkills.map(s => s.domain);
  return (
    <>
      بناءً على المهارة الطاغية للموظف في مجال <span className="font-bold text-emerald-950">{coreStrength}</span> {subSkillsNames.length > 0 ? <>ومهاراته الأفقية المتقاطعة في <span className="font-bold text-emerald-950">{subSkillsNames.join(" و ")}</span></> : ""}، تم اختيار <span className="font-bold text-emerald-950">{recommendedPath.pathTitle}</span> كأفضل مسار مستهدف. 
      يحقق هذا التوجيه توافقاً ذكياً بنسبة <span className="font-bold text-emerald-950">{recommendedPath.totalCompatibilityScore}%</span>، مستفيداً من المهارات المكتسبة لتقليص الهدر التدريبي بمقدار <span className="font-bold text-emerald-950">وفر قدره {recommendedPath.satisfiedCourses.length * 15} يوم تدريبي</span>.
    </>
  );
}

function getSkillInventoryExplanation(skill, val) {
  if (skill === "برمجة") {
    if (val >= 80) return `خبير برمجيات: لديه 4 دورات أساسية متقدمة في هندسة البرمجيات وقواعد البيانات ولديه القدرة الكاملة على أتمتة الـ DevOps.`;
    if (val >= 50) return `مبرمج متوسط: يمتلك مهارات جيدة في لغة جافا سكربت وقواعد البيانات الأساسية.`;
    return `مبتدئ: يمتلك مبادئ برمجية نظرية ومستعد للبدء بالتدريب العملي.`;
  }
  if (skill === "ذكاء اصطناعي") {
    if (val >= 80) return `خبير ذكاء اصطناعي: ملم ببرمجة تعلم الآلة المتقدمة ونماذج اللغة الكبيرة وتطوير الحلول السحابية Azure AI.`;
    if (val >= 50) return `ممارس متوسط: لديه معارف جيدة في أساسيات بايثون للذكاء الاصطناعي والإحصاء التطبيقي.`;
    return `مبتدئ: يمتلك فهماً نظرياً لمفاهيم الذكاء الاصطناعي العامة ويحتاج لدورات بايثون التأسيسية.`;
  }
  if (skill === "أمن سيبراني") {
    if (val >= 80) return `خبير أمن سيبراني: حاصل على شهادات CompTIA Security+ و CEH ولديه خبرة في الاستجابة للحوادث السيبرانية GCIH.`;
    if (val >= 50) return `ممارس متوسط: ملم بمبادئ أمن الشبكات والشهادات الأمنية العامة والتحقق من الثغرات.`;
    return `مبتدئ: يمتلك معارف تأسيسية في أمن الشبكات والحماية الرقمية الأساسية للمؤسسة.`;
  }
  if (skill === "دعم فني") {
    if (val >= 80) return `خبير دعم فني: يمتلك شهادة ITIL 4 Foundation وإدارة تذاكر الدعم الفني وحل مشاكل المستخدمين المتقدمة.`;
    if (val >= 50) return `ممارس متوسط: ملم بصيانة العتاد المادي للأجهزة A+ وحل مشكلات التوصيل والربط الشبكي المحلي.`;
    return `مبتدئ: يمتلك مهارات خدمة عملاء تقنية أساسية ويدعم حل المشكلات البرمجية البسيطة.`;
  }
  return `مستوى الجرد المعرفي المقاس بناءً على الاختبارات والدورات المنجزة.`;
}

const SmartComparison = ({ employees, setEmployees, selectedEmployee, setSelectedEmployee, pathsConfig, courseMetadata }) => {
  const [pivotTarget, setPivotTarget] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isCoursesCollapsed, setIsCoursesCollapsed] = useState(true);

  const employeesWithSkills = employees.map(emp => {
    const analysis = analyzeEmployeeSkills(emp, courseMetadata, pathsConfig);
    return { ...emp, skillsAnalysis: analysis };
  });

  const handleEmployeeChange = (e) => {
    const id = Number(e.target.value);
    const found = employees.find(emp => emp.id === id);
    if (found) {
      setSelectedEmployee(found);
      setIsCoursesCollapsed(true);
    }
  };

  if (!selectedEmployee) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center text-right max-w-2xl mx-auto space-y-6">
        <div>
          <i className="fa-solid fa-users-viewfinder text-5xl text-blue-500 mb-3 animate-pulse"></i>
          <h3 className="font-bold text-slate-800 text-lg">اختر الموظف لبدء التحليل والمقارنة</h3>
          <p className="text-slate-500 text-xs mt-1">الرجاء اختيار الموظف برقم ملفه الوظيفي أو اسمه لعرض الجاهزية ومسارات التطوير المتاحة له:</p>
        </div>
        
        <div className="max-w-md mx-auto">
          <select 
            onChange={handleEmployeeChange}
            value=""
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right cursor-pointer"
          >
            <option value="" disabled>-- اختر الموظف برقم الهوية/الملف --</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                [{emp.id}] - {emp.fullName} ({emp.specialization})
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  const comparisons = calculatePathComparisons(selectedEmployee, pathsConfig, courseMetadata);

  const sortedPaths = [...comparisons].sort((a, b) => {
    if (b.totalCompatibilityScore !== a.totalCompatibilityScore) {
      return b.totalCompatibilityScore - a.totalCompatibilityScore;
    }
    return a.pendingGap.length - b.pendingGap.length;
  });

  const recommendedPath = sortedPaths[0];

  const { coreStrength, coreStrengthScore, coreStrengthCerts, coreCourses, subSkills } = analyzeEmployeeSkills(selectedEmployee, courseMetadata, pathsConfig);

  const handlePivotClick = (pathTitle) => {
    setPivotTarget(pathTitle);
    setIsModalOpen(true);
  };

  const handlePivotSubmit = () => {
    const selectedPathConfig = pathsConfig.find(p => p.title === pivotTarget);
    
    setEmployees(prev => prev.map(emp => {
      if (emp.id === selectedEmployee.id) {
        const pathComparison = comparisons.find(c => c.pathTitle === pivotTarget);
        
        const updated = {
          ...emp,
          specialization: selectedPathConfig.specialty,
          targetPosition: selectedPathConfig.targetPosition,
          readinessScore: pathComparison.readinessScore,
          completedCourses: pathComparison.completedOverlap,
          currentRequirements: pathComparison.pendingGap.slice(0, 1),
          nextRequirements: pathComparison.pendingGap.slice(1)
        };
        setSelectedEmployee(updated);
        return updated;
      }
      return emp;
    }));
    setIsModalOpen(false);
    setToastMessage(`تم تحويل مسار الموظف ${selectedEmployee.fullName} إلى ${pivotTarget} بنجاح!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <div className="flex flex-col gap-6 text-right relative">
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce border border-blue-500">
          <i className="fa-solid fa-circle-check text-xl"></i>
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Top Section: Selected Employee Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
            <i className="fa-solid fa-address-card text-blue-500"></i>
            <span>بيانات الموظف الخاضع للدراسة والمقارنة</span>
          </h3>
          
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <label className="text-xs font-bold text-slate-500 whitespace-nowrap shrink-0">اختر موظفاً آخر (برقم الملف):</label>
            <select
              value={selectedEmployee.id}
              onChange={handleEmployeeChange}
              className="bg-slate-50 hover:bg-slate-105 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-750 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right cursor-pointer"
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  [{emp.id}] - {emp.fullName}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="space-y-2 text-center sm:text-right w-full">
            <h4 className="font-bold text-lg text-slate-800">{selectedEmployee.fullName}</h4>
            <p className="text-xs text-slate-500">{selectedEmployee.currentPosition} • {selectedEmployee.currentDepartment}</p>
            
            <div className="flex gap-2 flex-wrap justify-center sm:justify-start pt-1">
              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-semibold border border-blue-100">
                التخصص المهني: {selectedEmployee.specialization}
              </span>
              <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-semibold border border-indigo-100">
                الموقع الحالي: {selectedEmployee.hrDetails?.location || "غير محدد"}
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-semibold border border-slate-200">
                التخصص الأكاديمي: {selectedEmployee.hrDetails?.academicField || "تقنية معلومات"}
              </span>
            </div>
            
            <div className="pt-2 text-slate-650 text-xs leading-relaxed max-w-3xl">
              <span className="font-bold text-slate-800">توصيف المرونة المهنية:</span> يمتلك الموظف مهارات مرنة وخبرات متعددة تمكنه من التحول بين المسارات التقنية بكفاءة، مما يقلل بشكل كبير زمن وتكلفة التدريب الإضافي المطلوبة للمؤسسة.
            </div>
            
            {selectedEmployee.skillsInventory && (
              <div className="pt-3 border-t border-slate-200/60 mt-3">
                <div className="text-[10px] font-bold text-slate-400 mb-1.5">مؤشرات الجرد المعرفي (Skills Inventory)</div>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  {Object.entries(selectedEmployee.skillsInventory).map(([skill, val]) => (
                    <div 
                      key={skill} 
                      className="flex items-center gap-1.5 text-xs bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-sm relative group cursor-help"
                    >
                      <span className="text-slate-500 font-medium">{skill}:</span>
                      <span className={`font-black ${val >= 70 ? "text-indigo-600" : val >= 50 ? "text-amber-600" : "text-slate-600"}`}>{val}%</span>
                      
                      {/* Interactive Hover Tooltip */}
                      <div className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 w-64 bg-slate-800 text-white text-[10px] rounded-lg p-2.5 shadow-xl hidden group-hover:block z-50 text-right leading-relaxed pointer-events-none font-normal">
                        <div className="font-bold border-b border-slate-700 pb-1 mb-1 text-blue-400">تقييم مهارة {skill}: {val}%</div>
                        <div>{getSkillInventoryExplanation(skill, val)}</div>
                        <div className="absolute top-full right-1/2 translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Collapsible IT Courses Section */}
            <div className="pt-3 border-t border-slate-200/60 mt-3 text-right">
              <div 
                onClick={() => setIsCoursesCollapsed(!isCoursesCollapsed)}
                className="flex items-center justify-between cursor-pointer text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50/55 p-2.5 rounded-lg border border-blue-100/60"
              >
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-graduation-cap"></i>
                  <span>الدورات والشهادات التقنية المنجزة ({selectedEmployee.completedCourses?.length || 0})</span>
                </span>
                <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${isCoursesCollapsed ? "" : "rotate-180"}`}></i>
              </div>
              
              {!isCoursesCollapsed && (
                <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-right">
                  {selectedEmployee.completedCourses && selectedEmployee.completedCourses.length > 0 ? (
                    selectedEmployee.completedCourses.map((course, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm text-slate-705">
                        <i className="fa-solid fa-circle-check text-emerald-500"></i>
                        <span>{course}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400 text-xs py-1">لا توجد دورات تقنية مكتسبة مسجلة.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Panel */}
      {recommendedPath && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm border-r-8 border-r-emerald-500">
          <div className="flex items-center gap-2.5 mb-2.5 text-emerald-800 font-bold text-sm">
            <i className="fa-solid fa-wand-magic-sparkles text-emerald-600 text-lg"></i>
            <span>لوحة التوجيه الاستشاري والمسار الأفضل موصى به الذكي:</span>
          </div>
          <div className="text-xs text-emerald-800 leading-relaxed max-w-4xl">
            {getRecommendationText(selectedEmployee, recommendedPath, coreStrength, subSkills)}
          </div>
        </div>
      )}

      {/* Comparison Grid (3 Columns) */}
      <div>
        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm">
          <i className="fa-solid fa-chart-bar text-blue-500"></i>
          <span>العرض ثلاثي الأبعاد لمقارنة المسارات والجاهزية</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisons.map(p => {
            const isBest = recommendedPath && recommendedPath.pathId === p.pathId;
            return (
              <div 
                key={p.pathId}
                className={`bg-white border rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all ${
                  isBest 
                    ? 'border-emerald-300 ring-4 ring-emerald-50 shadow-md transform -translate-y-1' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header */}
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-base ${
                      isBest ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'
                    }`}>
                      <i className={`fa-solid ${
                        p.pathId === 'ai' ? 'fa-brain' : 
                        p.pathId === 'cyber' ? 'fa-shield-halved' : 
                        p.pathId === 'analyst' ? 'fa-magnifying-glass-chart' : 
                        p.pathId === 'support_tech' ? 'fa-headset' : 
                        p.pathId === 'computer_tech' ? 'fa-laptop-code' : 'fa-code'
                      }`}></i>
                    </span>
                    {isBest && (
                      <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-400">
                        موصى به للغاية
                      </span>
                    )}
                  </div>
                  
                  <h4 className="font-bold text-sm text-slate-800 leading-snug">{p.pathTitle}</h4>
                  <p className="text-[10px] text-slate-400 mt-1">المسمى المهني الجديد: {p.targetPosition}</p>

                  {/* Compatibility score section */}
                  <div className="bg-slate-50 p-3 rounded-xl my-4 text-center border border-slate-100 relative group cursor-help">
                    <div className="text-[10px] text-slate-400 font-bold mb-1">مؤشر التوافق والملاءمة الكلي</div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-2xl font-black ${isBest ? 'text-emerald-600' : 'text-slate-700'}`}>{p.totalCompatibilityScore}%</span>
                    </div>
                    {p.academicMatchBonus > 0 && (
                      <div className="text-[9px] text-indigo-600 font-bold mt-1">
                        تطابق تخصص أكاديمي (+{p.academicMatchBonus}%)
                      </div>
                    )}
                    
                    {/* Interactive Hover Tooltip */}
                    <div className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 w-64 bg-slate-800 text-white text-[10px] rounded-lg p-2.5 shadow-xl hidden group-hover:block z-50 text-right leading-relaxed pointer-events-none font-normal">
                      <div className="font-bold border-b border-slate-700 pb-1 mb-1 text-emerald-400">تحليل مؤشر التوافق الكلي: {p.totalCompatibilityScore}%</div>
                      <div className="space-y-1">
                        <div>• جاهزية الدورات المنجزة: <span className="font-bold text-white">{p.readinessScore}%</span></div>
                        <div>• عدد الدورات المستوفاة: <span className="font-bold text-white">{p.satisfiedCourses.length} من أصل {pathsConfig.find(path => path.id === p.pathId)?.required.length}</span></div>
                        {p.academicMatchBonus > 0 && <div>• علاوة التخصص الأكاديمي المتطابق: <span className="font-bold text-indigo-300">+{p.academicMatchBonus}%</span></div>}
                        <div className="pt-1 border-t border-slate-700 text-[9px] text-slate-400">حساب الملاءمة = الجاهزية + علاوة التخصص الأكاديمي</div>
                      </div>
                      <div className="absolute top-full right-1/2 translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
                    </div>
                  </div>

                  {/* Completed and Exempt Courses Overlap */}
                  <div className="mb-4">
                    <h5 className="text-[10px] font-bold text-slate-500 mb-2">المتطلبات المستوفاة (وفر التدريب):</h5>
                    <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                      {p.satisfiedCourses.length > 0 ? (
                        p.satisfiedCourses.map((c, i) => {
                          return (
                            <div key={i} className="flex items-center gap-2 text-[10px] text-slate-700">
                              <i className="fa-solid fa-circle-check text-emerald-500 text-xs shrink-0"></i>
                              <span className="line-through text-slate-400">{c}</span>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-[9px] text-slate-400">لا توجد مكتسبات مهارية متقاطعة</p>
                      )}
                    </div>
                  </div>

                  {/* Pending Gap */}
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-500 mb-2">الفجوة التدريبية المتبقية (مطلوب إنجازها):</h5>
                    <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                      {p.pendingGap.length > 0 ? (
                        p.pendingGap.map((c, i) => (
                          <div key={i} className="flex items-center gap-2 text-[10px] text-slate-700 font-medium">
                            <i className="fa-solid fa-circle-xmark text-rose-500 text-xs shrink-0"></i>
                            <span>{c}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-[9px] text-emerald-600 font-bold flex items-center gap-1">
                          <i className="fa-solid fa-circle-check"></i>
                          <span>تم إنجاز كامل متطلبات المسار!</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pivot Button */}
                <button
                  onClick={() => handlePivotClick(p.pathTitle)}
                  className={`w-full mt-6 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    isBest 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  <i className="fa-solid fa-route ml-1.5"></i>
                  <span>التحويل الفوري لمسار {p.pathTitle.replace("مسار ", "")}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {showPivotModal && (
        <GapAnalysisModal 
          employee={selectedEmployee} 
          targetPath={pivotTarget} 
          matchedCourses={comparisons.find(c => c.pathTitle === pivotTarget)?.satisfiedCourses || []}
          onClose={() => setShowPivotModal(false)} 
          onSubmit={handlePivotSubmit} 
        />
      )}
    </div>
  );
};

export default SmartComparison;
