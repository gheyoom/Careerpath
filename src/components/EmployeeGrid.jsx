import React, { useState } from 'react';

const EmployeeGrid = ({ filteredEmployees, selectedEmployee, setSelectedEmployee, viewMode = 'list' }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

  if (viewMode === 'executive') {
    let sortedEmployees = [...filteredEmployees];
    if (sortConfig.key) {
      sortedEmployees.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        // special cases
        if (sortConfig.key === 'name') {
          aVal = a.fullName;
          bVal = b.fullName;
        } else if (sortConfig.key === 'position') {
          aVal = a.currentPosition;
          bVal = b.currentPosition;
        } else if (sortConfig.key === 'department') {
          aVal = a.currentDepartment;
          bVal = b.currentDepartment;
        } else if (sortConfig.key === 'targetPath') {
          aVal = a.targetPosition;
          bVal = b.targetPosition;
        } else if (sortConfig.key === 'courses') {
          aVal = a.currentRequirements ? a.currentRequirements.length : 0;
          bVal = b.currentRequirements ? b.currentRequirements.length : 0;
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const handleSort = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
      if (sortConfig.key !== key) return <i className="fa-solid fa-sort ml-2 opacity-30"></i>;
      return sortConfig.direction === 'asc' ? <i className="fa-solid fa-sort-up ml-2 text-blue-500"></i> : <i className="fa-solid fa-sort-down ml-2 text-blue-500"></i>;
    };

    return (
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="py-3 px-4 w-20 cursor-pointer hover:bg-slate-100 transition-colors select-none" onClick={() => handleSort('id')}>
                  الرقم {getSortIcon('id')}
                </th>
                <th className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors select-none" onClick={() => handleSort('name')}>
                  الاسم / الرتبة {getSortIcon('name')}
                </th>
                <th className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors select-none" onClick={() => handleSort('position')}>
                  المنصب {getSortIcon('position')}
                </th>
                <th className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors select-none" onClick={() => handleSort('department')}>
                  القسم {getSortIcon('department')}
                </th>
                <th className="py-3 px-4 text-center cursor-pointer hover:bg-slate-100 transition-colors select-none" onClick={() => handleSort('targetPath')}>
                  المسار المستهدف {getSortIcon('targetPath')}
                </th>
                <th className="py-3 px-4 text-center cursor-pointer hover:bg-slate-100 transition-colors select-none" onClick={() => handleSort('readinessScore')}>
                  الجاهزية {getSortIcon('readinessScore')}
                </th>
                <th className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors select-none" onClick={() => handleSort('courses')}>
                  الدورات المطلوبة {getSortIcon('courses')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map(emp => {
                const isSelected = selectedEmployee && selectedEmployee.id === emp.id;
                const rc = getReadinessClasses(emp);
                return (
                  <tr 
                    key={emp.id} 
                    onClick={() => setSelectedEmployee(emp)}
                    className={`border-b border-slate-100 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-slate-50'}`}
                  >
                    <td className="py-3 px-4 text-slate-500 font-semibold text-xs">{emp.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-800 text-xs flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${rc.dot}`}></span>
                      {emp.hrDetails?.jobGrade && emp.hrDetails.jobGrade !== 'غير محدد' ? `${formatGrade(emp.hrDetails.jobGrade)} / ${emp.fullName}` : emp.fullName}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs">{emp.currentPosition}</td>
                    <td className="py-3 px-4 text-slate-600 text-xs">{emp.currentDepartment}</td>
                    <td className="py-3 px-4 text-slate-600 text-center font-bold text-xs">{emp.targetPosition}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded bg-slate-100 font-bold text-[10px] ${rc.text}`}>{emp.readinessScore}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 flex-wrap">
                        {emp.currentRequirements && emp.currentRequirements.length > 0 ? (
                          <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                            مطلوب {emp.currentRequirements.length} دورات
                          </span>
                        ) : (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                            مكتمل
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

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
