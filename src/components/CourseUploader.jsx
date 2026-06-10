import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { allStandardCoursesList, recalculateEmployeeReadiness } from '../data/coursesData';

const CourseUploader = ({ employees, onUpdateEmployees }) => {
  const fileInputRef = useRef(null);
  const [step, setStep] = useState(1); // 1: Upload, 2: Mapping, 3: Success
  const [parsedData, setParsedData] = useState([]); // [{ empId, courseName }]
  const [uniqueCourses, setUniqueCourses] = useState([]); // ["Actual Course 1", "Actual Course 2"]
  const [mappings, setMappings] = useState({}); // { "Actual Course 1": "Standard Course X", ... }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { defval: "" });

        const extracted = [];
        const uniqueSet = new Set();

        data.forEach(row => {
          // Identify Employee ID column
          const empId = row["Employee ID"] || row["الرقم"] || row["رقم وظيفي"] || row["رقم الموظف"] || row["ID"];
          // Identify Course Name column
          const courseName = row["اسم الدورة"] || row["الدورة"] || row["اسم البرنامج"] || row["Course"];

          if (empId && courseName) {
            const courseStr = String(courseName).trim();
            if (courseStr) {
              extracted.push({ empId: String(empId).trim(), courseName: courseStr });
              uniqueSet.add(courseStr);
            }
          }
        });

        if (extracted.length === 0) {
          alert("لم يتم العثور على بيانات صحيحة. يرجى التأكد من وجود أعمدة: 'الرقم' و 'اسم الدورة'.");
          return;
        }

        setParsedData(extracted);
        const uniqueArr = Array.from(uniqueSet);
        setUniqueCourses(uniqueArr);
        
        // Initialize mappings to empty
        const initialMappings = {};
        uniqueArr.forEach(c => {
          // Attempt exact match first
          if (allStandardCoursesList.includes(c)) {
            initialMappings[c] = c;
          } else {
            initialMappings[c] = "";
          }
        });
        setMappings(initialMappings);
        
        setStep(2);
      } catch (err) {
        console.error(err);
        alert("حدث خطأ أثناء قراءة الملف.");
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsBinaryString(file);
  };

  const handleMappingChange = (actualCourse, standardCourse) => {
    setMappings(prev => ({ ...prev, [actualCourse]: standardCourse }));
  };

  const applyMappings = () => {
    // 1. Group parsed data by Employee ID
    const coursesByEmp = {};
    parsedData.forEach(({ empId, courseName }) => {
      const standardMapped = mappings[courseName];
      if (standardMapped && standardMapped !== "IGNORE") {
        if (!coursesByEmp[empId]) coursesByEmp[empId] = [];
        coursesByEmp[empId].push(standardMapped);
      }
    });

    // 2. Update employees
    const updatedEmployees = employees.map(emp => {
      const newCourses = coursesByEmp[emp.id] || coursesByEmp[String(emp.id)];
      if (newCourses && newCourses.length > 0) {
        const currentCourses = emp.completedCourses || [];
        // merge unique
        const merged = Array.from(new Set([...currentCourses, ...newCourses]));
        
        const updatedEmp = { ...emp, completedCourses: merged };
        // Recalculate readiness
        return recalculateEmployeeReadiness(updatedEmp);
      }
      return emp;
    });

    onUpdateEmployees(updatedEmployees);
    setStep(3);
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ['Employee ID', 'الرقم', 'الدورة', 'رقم الدورة', 'تاريخ البداية', 'اسم المركز', 'النتيجة', 'تاريخ النهاية', 'مكان الدورة']
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Courses");
    XLSX.writeFile(wb, "Courses_Template.xlsx");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
          <i className="fa-solid fa-cloud-arrow-up"></i>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">استيراد ومطابقة الدورات التدريبية</h2>
          <p className="text-sm text-slate-500">قم برفع سجلات الدورات للموظفين ومطابقتها مع الدورات القياسية للمسارات</p>
        </div>
      </div>

      {step === 1 && (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 relative">
          <button 
            onClick={downloadTemplate}
            className="absolute top-4 left-4 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm transition-all"
          >
            <i className="fa-solid fa-download"></i>
            تحميل القالب القياسي
          </button>
          
          <i className="fa-solid fa-file-excel text-4xl text-emerald-500 mb-4"></i>
          <p className="text-slate-600 font-bold mb-2">قم برفع ملف Excel أو CSV</p>
          <p className="text-xs text-slate-400 mb-6 max-w-md text-center leading-relaxed">
            يجب أن يحتوي الملف على عمودين على الأقل: "الرقم" (أو رقم وظيفي) و "الدورة" (أو اسم الدورة). سيتم قراءة البيانات لاستخراج الدورات.
          </p>
          <input 
            type="file" 
            accept=".xlsx, .xls, .csv" 
            onChange={handleFileUpload} 
            ref={fileInputRef}
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-sm"
          >
            اختيار الملف للرفع
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 text-sm flex gap-3">
            <i className="fa-solid fa-circle-info mt-0.5"></i>
            <div>
              <p className="font-bold mb-1">خطوة المطابقة الذكية</p>
              <p>تم استخراج {uniqueCourses.length} دورة فريدة من الملف. يرجى مطابقتها مع الدورات القياسية المعتمدة في النظام لتحديث نسبة جاهزية الموظفين.</p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-right text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-3 font-bold text-slate-600 w-1/2">اسم الدورة الفعلي (من الملف)</th>
                  <th className="p-3 font-bold text-slate-600 w-1/2">الدورة القياسية المقابلة (في النظام)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {uniqueCourses.map((course, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 text-slate-800 font-semibold">{course}</td>
                    <td className="p-3">
                      <select 
                        value={mappings[course] || ""}
                        onChange={(e) => handleMappingChange(course, e.target.value)}
                        className={`w-full p-2 rounded-lg border text-xs focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all ${
                          mappings[course] && mappings[course] !== "IGNORE" ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 
                          mappings[course] === "IGNORE" ? 'border-slate-300 bg-slate-100 text-slate-500' : 'border-slate-300 bg-white'
                        }`}
                      >
                        <option value="">-- اختر الدورة المطابقة --</option>
                        <option value="IGNORE">❌ تجاهل (ليست دورة قياسية)</option>
                        <optgroup label="الدورات القياسية للنظام">
                          {allStandardCoursesList.map((std, sidx) => (
                            <option key={sidx} value={std}>{std}</option>
                          ))}
                        </optgroup>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center">
            <button 
              onClick={() => setStep(1)}
              className="text-slate-500 hover:text-slate-700 px-4 py-2 font-semibold"
            >
              إلغاء والعودة
            </button>
            <button 
              onClick={applyMappings}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-check-double"></i> اعتماد وتحديث السجلات
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            <i className="fa-solid fa-check"></i>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">تم تحديث السجلات بنجاح!</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            تمت مطابقة الدورات وإضافتها لملفات الموظفين بنجاح، وتم إعادة حساب نسب الجاهزية والمسارات الترقوية بناءً على البيانات الجديدة.
          </p>
          <button 
            onClick={() => setStep(1)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 rounded-lg font-bold transition-colors"
          >
            رفع ملف آخر
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseUploader;
