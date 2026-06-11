import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

const VacanciesView = ({ employees, orgStructure, setOrgStructure }) => {
  const [expandedRole, setExpandedRole] = useState(null);
  const fileInputRef = useRef(null);

  // Group orgStructure by department
  const departments = {};
  orgStructure.forEach(org => {
    if (!departments[org.department]) {
      departments[org.department] = [];
    }
    departments[org.department].push(org);
  });

  // Helper to find actual employees for a role
  const getEmployeesForRole = (department, role) => {
    return employees.filter(emp => 
      emp.currentDepartment === department && 
      (emp.currentPosition === role || emp.hrDetails?.approvedTitle === role)
    );
  };

  const calculateDepartmentStats = (deptRoles, deptName) => {
    let target = 0;
    let actual = 0;
    deptRoles.forEach(r => {
      target += (Number(r.target) || 0);
      actual += getEmployeesForRole(deptName, r.role).length;
    });
    return { target, actual, vacant: target - actual };
  };

  const handleExport = () => {
    // 1. Prepare data
    const exportData = orgStructure.map(item => ({
      'القسم (Department)': item.department,
      'المسمى الوظيفي (Role)': item.role,
      'العدد المعتمد (Target)': item.target
    }));

    // 2. Create worksheet & workbook
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "الهيكل التنظيمي");

    // 3. Export
    XLSX.writeFile(workbook, "Organizational_Structure.xlsx");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        // Map parsed data back to standard format
        const newStructure = data.map(row => ({
          department: row['القسم (Department)'] || row['department'] || "بدون قسم",
          role: row['المسمى الوظيفي (Role)'] || row['role'] || "غير محدد",
          target: parseInt(row['العدد المعتمد (Target)'] || row['target'], 10) || 0
        })).filter(item => item.role !== "غير محدد");

        if (newStructure.length > 0 && setOrgStructure) {
          setOrgStructure(newStructure);
          alert("تم تحديث الهيكل التنظيمي بنجاح!");
        } else {
          alert("ملف غير صالح أو لا يحتوي على بيانات صحيحة.");
        }
      } catch (error) {
        console.error("Error importing Excel:", error);
        alert("حدث خطأ أثناء قراءة الملف.");
      }
      // reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      
      {/* Action Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800">إدارة الهيكل التنظيمي والشواغر</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">تحديث الاعتمادات وتنزيل التقارير عبر ملفات Excel</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <i className="fa-solid fa-file-excel text-emerald-600"></i>
            تصدير الهيكل
          </button>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shadow-blue-200 flex items-center gap-2"
          >
            <i className="fa-solid fa-upload"></i>
            استيراد وتحديث
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImport} 
            accept=".xlsx, .xls, .csv" 
            className="hidden" 
          />
        </div>
      </div>
      {Object.keys(departments).map(deptName => {
        const roles = departments[deptName];
        const stats = calculateDepartmentStats(roles, deptName);
        
        return (
          <div key={deptName} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Department Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                  <i className="fa-solid fa-building"></i>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">{deptName}</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">الهيكل المعتمد: {stats.target} منصب</p>
                </div>
              </div>
              <div className="flex gap-4 text-sm font-bold">
                <div className="flex flex-col items-center">
                  <span className="text-slate-400 text-[10px]">الموجودين</span>
                  <span className="text-emerald-600 text-lg leading-none">{stats.actual}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-slate-400 text-[10px]">الشواغر</span>
                  <span className="text-rose-500 text-lg leading-none">{stats.vacant}</span>
                </div>
              </div>
            </div>

            {/* Roles Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-slate-50/50 text-slate-500 text-xs border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4 font-bold w-1/3">المنصب (المسمى الوظيفي)</th>
                    <th className="py-3 px-4 font-bold text-center">المعتمد</th>
                    <th className="py-3 px-4 font-bold text-center">الفعلي</th>
                    <th className="py-3 px-4 font-bold text-center">الشواغر</th>
                    <th className="py-3 px-4 font-bold text-center">حالة الإشغال</th>
                    <th className="py-3 px-4 font-bold text-center">التفاصيل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {roles.map((roleObj, idx) => {
                    const actualEmps = getEmployeesForRole(deptName, roleObj.role);
                    const actualCount = actualEmps.length;
                    const vacantCount = roleObj.target - actualCount;
                    const occupancy = Math.round((actualCount / roleObj.target) * 100);
                    const isExpanded = expandedRole === `${deptName}-${roleObj.role}`;

                    return (
                      <React.Fragment key={idx}>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-bold text-slate-700">
                            {roleObj.role}
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-slate-600 bg-slate-50/30">
                            {roleObj.target}
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-emerald-600 bg-emerald-50/30">
                            {actualCount}
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-rose-500 bg-rose-50/30">
                            {vacantCount > 0 ? vacantCount : 0}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-1.5 rounded-full ${occupancy >= 100 ? 'bg-emerald-500' : occupancy >= 50 ? 'bg-blue-500' : 'bg-rose-500'}`} 
                                style={{ width: `${Math.min(occupancy, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold mt-1 inline-block">{occupancy}%</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button 
                              onClick={() => setExpandedRole(isExpanded ? null : `${deptName}-${roleObj.role}`)}
                              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${actualCount > 0 ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-slate-50 text-slate-400 cursor-not-allowed'}`}
                              disabled={actualCount === 0}
                            >
                              {isExpanded ? 'إخفاء' : 'عرض الموظفين'}
                            </button>
                          </td>
                        </tr>
                        
                        {/* Expanded Employees List */}
                        {isExpanded && actualCount > 0 && (
                          <tr>
                            <td colSpan="6" className="p-0 border-b-2 border-blue-100">
                              <div className="bg-blue-50/30 p-4 animate-fade-in">
                                <h4 className="text-xs font-bold text-blue-800 mb-3"><i className="fa-solid fa-users ml-1.5"></i> الموظفون الحاليون في منصب ({roleObj.role}):</h4>
                                <div className="overflow-hidden rounded-lg border border-blue-100">
                                  <table className="w-full text-right text-sm bg-white">
                                    <thead className="bg-blue-50 text-blue-800 text-xs border-b border-blue-100">
                                      <tr>
                                        <th className="py-2 px-4">ت</th>
                                        <th className="py-2 px-4">الرقم</th>
                                        <th className="py-2 px-4">الرتبة</th>
                                        <th className="py-2 px-4">الاسم</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                      {actualEmps.map((emp, index) => (
                                        <tr key={emp.id} className="hover:bg-slate-50 transition-colors text-xs font-bold text-slate-700">
                                          <td className="py-2 px-4 text-slate-500">{index + 1}</td>
                                          <td className="py-2 px-4">{emp.id}</td>
                                          <td className="py-2 px-4">{emp.hrDetails?.jobGrade || '-'}</td>
                                          <td className="py-2 px-4">{emp.fullName}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VacanciesView;
