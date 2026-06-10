import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const EmployeeManagement = ({ employees, onUpdate, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const filteredEmployees = employees.filter(emp => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (emp.fullName && emp.fullName.toLowerCase().includes(term)) || 
           (emp.id && emp.id.toString().includes(term));
  });

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من رغبتك في حذف هذا الموظف؟ لا يمكن التراجع عن هذه العملية.")) {
      onDelete(id);
    }
  };

  const handleEditClick = (emp) => {
    setEditingEmployee(emp);
  };

  const handleExportBackup = () => {
    const exportData = employees.map(emp => ({
      "الرقم": emp.id,
      "الاسم": emp.fullName,
      "المنصب": emp.currentPosition,
      "الرتبة": emp.hrDetails?.jobGrade || "",
      "القسم": emp.currentDepartment,
      "التخصص": emp.specialization || "",
      "الصنف": emp.hrDetails?.jobCategory || "",
      "الوحدة": emp.hrDetails?.location || "",
      "الشعبة": emp.hrDetails?.jobField || "",
      "المؤهل العلمي": emp.hrDetails?.qualification || "",
      "المجموعة الوظيفية": emp.hrDetails?.jobGroup || "",
      "النوع الوظيفي": emp.hrDetails?.jobType || "",
      "المجال العلمي": emp.hrDetails?.academicField || "",
      "الملاحظات": emp.hrDetails?.notes || "",
      "المسار المستهدف": emp.targetPosition || "",
      "نسبة الجاهزية": emp.readinessScore || 0,
      "الدورات المنجزة": emp.completedCourses?.join(" ، ") || "",
      "الدورات المطلوبة": emp.currentRequirements?.join(" ، ") || ""
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "سجلات الموظفين");
    XLSX.writeFile(wb, "Masar_System_Backup.xlsx");
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-title font-bold text-lg text-slate-800 flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-users-gear text-lg"></i>
            </div>
            <span>إدارة سجلات الموظفين</span>
          </h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xl">
            إضافة، تعديل، أو حذف بيانات الكوادر التقنية المُدخلة. التعديلات التي تقوم بها هنا تُحفظ مباشرة في النظام ويمكن تصديرها لاحقاً إن لزم الأمر.
          </p>
        </div>
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-3">
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="ابحث بالاسم أو الرقم الوظيفي..." 
              className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-10 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-semibold text-slate-700 shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fa-solid fa-search absolute right-4 top-3.5 text-slate-400"></i>
          </div>
          
          <button 
            onClick={handleExportBackup}
            className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-600 hover:text-white px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-sm"
          >
            <i className="fa-solid fa-download"></i>
            تصدير نسخة احتياطية (Excel)
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="py-4 px-6 w-24">الرقم</th>
                <th className="py-4 px-6">الاسم</th>
                <th className="py-4 px-6">المنصب</th>
                <th className="py-4 px-6">الرتبة</th>
                <th className="py-4 px-6">القسم</th>
                <th className="py-4 px-6 w-32 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-6 text-slate-500 font-semibold">{emp.id}</td>
                  <td className="py-3 px-6 font-bold text-slate-800">{emp.fullName}</td>
                  <td className="py-3 px-6 text-slate-600 font-semibold">{emp.currentPosition}</td>
                  <td className="py-3 px-6 text-slate-600">
                    <span className="px-2 py-1 bg-white border border-slate-200 shadow-sm rounded text-xs font-bold">
                      {(() => {
                        const grade = emp.hrDetails?.jobGrade || "غير محدد";
                        if (grade.includes("أ-ب")) return "مدني\\4";
                        if (grade.includes("ج-د")) return "مدني\\5";
                        if (grade.includes("هـ-و") || grade.includes("ه-و")) return "مدني\\6";
                        if (grade.includes("ز-ح")) return "مدني\\7";
                        if (grade.includes("ط-ي")) return "مدني\\8";
                        if (grade.includes("ك-ل")) return "مدني\\9";
                        return grade;
                      })()}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-slate-500">{emp.currentDepartment}</td>
                  <td className="py-3 px-6 flex justify-center gap-2">
                    <button onClick={() => handleEditClick(emp)} className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white flex justify-center items-center transition-all shadow-sm" title="تعديل">
                      <i className="fa-solid fa-pen text-xs"></i>
                    </button>
                    <button onClick={() => handleDelete(emp.id)} className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white flex justify-center items-center transition-all shadow-sm" title="حذف">
                      <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400 font-semibold">
                    <i className="fa-solid fa-folder-open text-3xl mb-3 opacity-50 block"></i>
                    لا يوجد موظفين مسجلين أو متطابقين مع البحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingEmployee && (
        <EditModal 
          employee={editingEmployee} 
          onClose={() => setEditingEmployee(null)} 
          onSave={(updatedData) => {
            onUpdate(editingEmployee.id, updatedData);
            setEditingEmployee(null);
          }} 
        />
      )}
    </div>
  );
};

const EditModal = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: employee.id,
    fullName: employee.fullName || "",
    currentPosition: employee.currentPosition || "",
    currentDepartment: employee.currentDepartment || "",
    hrDetails: { ...employee.hrDetails }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("hr_")) {
      const field = name.replace("hr_", "");
      setFormData(prev => ({
        ...prev,
        hrDetails: { ...prev.hrDetails, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col font-sans" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 sticky top-0 z-10 rounded-t-2xl">
          <div>
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                <i className="fa-solid fa-user-pen text-sm"></i>
              </div>
              تعديل بيانات الموظف
            </h3>
            <p className="text-xs text-slate-500 mt-1 mr-10">تحديث المعلومات الأساسية وتفاصيل السجلات</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الاسم <span className="text-rose-500">*</span></label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-slate-50 focus:bg-white shadow-inner font-semibold" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الرقم الوظيفي <span className="text-rose-500">*</span></label>
              <input type="text" name="id" value={formData.id} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-slate-50 focus:bg-white shadow-inner" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الرتبة (مدني/عسكري)</label>
              <input type="text" name="hr_jobGrade" value={formData.hrDetails.jobGrade} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-slate-50 focus:bg-white shadow-inner" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المنصب</label>
              <input type="text" name="currentPosition" value={formData.currentPosition} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-slate-50 focus:bg-white shadow-inner" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">القسم</label>
              <input type="text" name="currentDepartment" value={formData.currentDepartment} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-slate-50 focus:bg-white shadow-inner" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الصنف</label>
              <input type="text" name="hr_jobCategory" value={formData.hrDetails.jobCategory} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-slate-50 focus:bg-white shadow-inner" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الوحدة</label>
              <input type="text" name="hr_location" value={formData.hrDetails.location} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-slate-50 focus:bg-white shadow-inner" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الشعبة</label>
              <input type="text" name="hr_jobField" value={formData.hrDetails.jobField} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-slate-50 focus:bg-white shadow-inner" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المؤهل العلمي</label>
              <input type="text" name="hr_qualification" value={formData.hrDetails.qualification} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-slate-50 focus:bg-white shadow-inner" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الملاحظات</label>
              <input type="text" name="hr_notes" value={formData.hrDetails.notes} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:border-blue-500 focus:outline-none bg-slate-50 focus:bg-white shadow-inner" />
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mt-2">
            <h4 className="text-sm font-bold text-blue-800 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-layer-group text-blue-500"></i>
              السجلات التنظيمية المتقدمة
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">المجموعة الوظيفية</label>
                <input type="text" name="hr_jobGroup" value={formData.hrDetails.jobGroup} onChange={handleChange} className="w-full border border-blue-200 rounded-lg p-2 text-xs bg-white shadow-sm focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">النوع الوظيفي</label>
                <input type="text" name="hr_jobType" value={formData.hrDetails.jobType} onChange={handleChange} className="w-full border border-blue-200 rounded-lg p-2 text-xs bg-white shadow-sm focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">المجال العلمي</label>
                <input type="text" name="hr_academicField" value={formData.hrDetails.academicField} onChange={handleChange} className="w-full border border-blue-200 rounded-lg p-2 text-xs bg-white shadow-sm focus:border-blue-500 focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">إلغاء</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 flex items-center gap-2">
              <i className="fa-solid fa-floppy-disk"></i>
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeManagement;
