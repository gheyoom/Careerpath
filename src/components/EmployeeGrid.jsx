import React from 'react';

const EmployeeGrid = ({ filteredEmployees, selectedEmployee, setSelectedEmployee, viewMode = 'list' }) => {
  const getReadinessClasses = (emp) => {
    const score = emp.readinessScore;
    const needsCourses = emp.currentRequirements && emp.currentRequirements.length > 0;
    if (score === 0) return { dot: "bg-slate-400", text: "text-slate-500", progressBg: "bg-slate-300" };
    if (score >= 85) return { dot: "bg-emerald-500", text: "text-emerald-650", progressBg: "bg-emerald-500" };
    if (!needsCourses) return { dot: "bg-blue-500", text: "text-blue-600", progressBg: "bg-blue-500" };
    return { dot: "bg-amber-500", text: "text-amber-650", progressBg: "bg-amber-500" };
  };

  const formatGrade = (grade) => {
    if (!grade) return grade;
    if (grade.includes("أ-ب")) return "مدني\\4";
    if (grade.includes("ج-د")) return "مدني\\5";
    if (grade.includes("هـ-و") || grade.includes("ه-و")) return "مدني\\6";
    if (grade.includes("ز-ح")) return "مدني\\7";
    if (grade.includes("ط-ي")) return "مدني\\8";
    if (grade.includes("ك-ل")) return "مدني\\9";
    return grade;
  };

  const getEmployeeGrade = (emp) => {
    const title = emp.hrDetails?.approvedTitle || emp.currentPosition || "";
    if (emp.employeeType === 'military') {
      if (title.includes("مهندس")) return "رائد";
      if (title.includes("مبرمج") || title.includes("محلل")) return "نقيب";
      if (title.includes("فني دعم تقني") || title.includes("فني دعم")) return "وكيل أول";
      if (title.includes("فني كمبيوتر") || title.includes("فني")) return "عريف أول";
      return "عريف أول";
    }
    
    // Civil grades
    if (title.includes("فني كمبيوتر")) return "الدرجة 6";
    if (title.includes("فني دعم تقني") || title.includes("فني")) return "الدرجة 5";
    if (title.includes("مهندس")) return "الدرجة 3";
    if (title.includes("مبرمج") || title.includes("محلل")) return "الدرجة 4";
    return "الدرجة 4";
  };

  return (
    <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex flex-col gap-3"}>
      {filteredEmployees.map(emp => {
        const isSelected = selectedEmployee && selectedEmployee.id === emp.id;
        const isMilitary = emp.employeeType === 'military';
        
        return viewMode === 'list' ? (
          <div 
            key={emp.id}
            onClick={() => setSelectedEmployee(emp)}
            className={`bg-white rounded-xl border p-4 cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 ${
              isSelected ? 'border-blue-500 ring-2 ring-blue-100 shadow-md' : 'border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4 w-[35%]">
              <div className="text-right">
                <h4 className="font-bold text-sm text-slate-800 leading-tight flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getReadinessClasses(emp).dot}`}></span>
                  {emp.hrDetails?.jobGrade && emp.hrDetails.jobGrade !== 'غير محدد' ? `${formatGrade(emp.hrDetails.jobGrade)} / ${emp.fullName}` : emp.fullName}
                </h4>
                <p className="text-[11px] text-slate-400 font-semibold mt-1">{emp.hrDetails?.approvedTitle || emp.currentPosition}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-[35%] text-xs text-right border-r border-slate-100 pr-4">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-building text-slate-400 w-3 text-center"></i>
                <span className="font-semibold text-slate-700">{emp.currentDepartment}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-slate-400 w-3 text-center"></i>
                <span className="text-slate-500">{emp.hrDetails?.location || "غير محدد"}</span>
              </div>
            </div>

            <div className="w-[30%] text-right flex flex-col justify-center border-r border-slate-100 pr-4">
              <div className="flex justify-between w-full items-center text-[10px] text-slate-400 mb-1 font-semibold">
                <span>الجاهزية</span>
                <span className={`font-bold ${getReadinessClasses(emp).text}`}>{emp.readinessScore}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full transition-all ${getReadinessClasses(emp).progressBg}`} style={{ width: `${emp.readinessScore}%` }}></div>
              </div>
            </div>
          </div>
        ) : (
          <div 
            key={emp.id}
            onClick={() => setSelectedEmployee(emp)}
            className={`bg-white rounded-xl border p-5 cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              isSelected ? 'border-blue-500 ring-2 ring-blue-100 shadow-md transform -translate-y-1' : 'border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
              <div className="text-right w-full">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-sm text-slate-800 leading-tight flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getReadinessClasses(emp).dot}`}></span>
                    {emp.hrDetails?.jobGrade && emp.hrDetails.jobGrade !== 'غير محدد' ? `${formatGrade(emp.hrDetails.jobGrade)} / ${emp.fullName}` : emp.fullName}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">#{emp.id}</p>
                </div>
              </div>

            <div className="bg-slate-50 rounded-lg p-3 my-4 space-y-1.5 text-xs text-right border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-400">المنصب:</span>
                <span className="font-semibold text-slate-700">{emp.hrDetails?.approvedTitle || emp.currentPosition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">القسم:</span>
                <span className="font-bold text-slate-700">{emp.currentDepartment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">الموقع:</span>
                <span className="font-semibold text-slate-700">{emp.hrDetails?.location || "غير محدد"}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200/50">
                <span className="text-slate-400">{isMilitary ? "الرتبة:" : "الدرجة:"}</span>
                <span className={`font-bold flex items-center gap-1 ${isMilitary ? 'text-amber-600' : 'text-indigo-650'}`}>
                  <span>
                    <i className={`fa-solid ml-1 ${isMilitary ? 'fa-shield-halved' : 'fa-ranking-star'}`}></i>
                    {getEmployeeGrade(emp)}
                  </span>
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1 font-semibold">
                <span>مؤشر جاهزية المسار الترقوي</span>
                <span className={`font-bold ${getReadinessClasses(emp).text}`}>{emp.readinessScore}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all ${getReadinessClasses(emp).progressBg}`} 
                  style={{ width: `${emp.readinessScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeGrid;
