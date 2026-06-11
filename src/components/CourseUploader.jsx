import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { getAllStandardCoursesList, recalculateEmployeeReadiness } from '../data/coursesData';

const CourseUploader = ({ employees, onUpdateEmployees, pathsConfig, setPathsConfig, courseMetadata, setCourseMetadata, setEmployees }) => {
  const fileInputRef = useRef(null);
  const coursesInputRef = useRef(null);
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
        const allStd = getAllStandardCoursesList(courseMetadata);
        uniqueArr.forEach(c => {
          // Attempt exact match first
          if (allStd.includes(c)) {
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
        return recalculateEmployeeReadiness(updatedEmp, pathsConfig);
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

  const handleExportCourses = () => {
    const exportData = [];
    Object.keys(courseMetadata).forEach(courseName => {
      const meta = courseMetadata[courseName];
      const paths = pathsConfig.filter(p => p.required?.includes(courseName)).map(p => p.title).join("، ");
      exportData.push({
        'اسم الدورة (Course)': courseName,
        'النوع (Type)': meta.type || "دورة",
        'المستوى (Level)': meta.level || "مبتدئ",
        'النقاط (Score)': meta.score || 1,
        'المسارات (Paths)': paths
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "دليل الدورات والشهادات");
    XLSX.writeFile(workbook, "Approved_Courses_Config.xlsx");
  };

  const handleImportCourses = (e) => {
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

        const newMetadata = {};
        const newPathsConfig = JSON.parse(JSON.stringify(pathsConfig)); // deep copy
        
        newPathsConfig.forEach(p => p.required = []);

        data.forEach(row => {
          const cName = row['اسم الدورة (Course)'] || row['Course'] || row['اسم الدورة'];
          if (!cName) return;
          
          const courseName = cName.toString().trim();
          
          newMetadata[courseName] = {
            type: row['النوع (Type)'] || row['Type'] || "دورة",
            level: row['المستوى (Level)'] || row['Level'] || "مبتدئ",
            score: parseInt(row['النقاط (Score)'] || row['Score'], 10) || 1
          };

          const pathsStr = String(row['المسارات (Paths)'] || row['Paths'] || "");
          if (pathsStr) {
            const pathsList = pathsStr.split("،").map(p => p.trim()).filter(Boolean);
            pathsList.forEach(pathTitle => {
              const pathObj = newPathsConfig.find(p => p.title === pathTitle || p.id === pathTitle);
              if (pathObj) {
                if (!pathObj.required.includes(courseName)) {
                  pathObj.required.push(courseName);
                }
              }
            });
          }
        });

        if (Object.keys(newMetadata).length > 0) {
          setCourseMetadata(newMetadata);
          setPathsConfig(newPathsConfig);

          if (setEmployees) {
            setEmployees(prevEmps => prevEmps.map(emp => recalculateEmployeeReadiness(emp, newPathsConfig)));
          }

          alert("تم تحديث دليل الدورات والشهادات والمسارات التقنية، وتمت إعادة احتساب الجاهزية لجميع الموظفين بنجاح!");
        } else {
          alert("ملف غير صالح أو فارغ.");
        }
      } catch (err) {
        console.error("Error importing courses Excel:", err);
        alert("حدث خطأ أثناء قراءة الملف.");
      }
      if (coursesInputRef.current) coursesInputRef.current.value = "";
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="font-title font-bold text-lg text-slate-800 flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-cloud-arrow-up text-lg"></i>
            </div>
            <span>استيراد وتحديث البيانات</span>
          </h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xl">
            يمكنك من هنا رفع كشوفات دورات الموظفين لمطابقتها مع المعايير. كما يمكنك إدارة دليل الدورات والمسارات المعتمدة عبر تصديرها وتحديثها بملفات Excel.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
          <div className="bg-slate-50 p-2 rounded-xl flex gap-2 border border-slate-100">
            <button 
              onClick={handleExportCourses}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <i className="fa-solid fa-file-export"></i>
              تصدير الأدلة
            </button>
            <button 
              onClick={() => coursesInputRef.current?.click()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-emerald-600 border border-slate-200 hover:border-emerald-300 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <i className="fa-solid fa-file-import"></i>
              تحديث الأدلة
            </button>
            <input 
              type="file" 
              ref={coursesInputRef} 
              onChange={handleImportCourses} 
              accept=".xlsx, .xls, .csv" 
              className="hidden" 
            />
          </div>
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
                {uniqueCourses.map((course, idx) => {
                  const allStd = getAllStandardCoursesList(courseMetadata);
                  return (
                    <tr key={idx} className="hover:bg-slate-50 border-b border-slate-100/50">
                      <td className="py-3 px-4 font-bold text-slate-700">{course}</td>
                      <td className="py-3 px-4">
                        <select 
                          value={mappings[course] || ""}
                          onChange={(e) => handleMappingChange(course, e.target.value)}
                          className={`w-full text-xs font-bold p-2 border rounded-lg focus:outline-none transition-all ${mappings[course] === "IGNORE" ? 'bg-slate-100 text-slate-500 border-slate-200' : mappings[course] ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-rose-300 text-rose-600'}`}
                        >
                          <option value="">-- يرجى اختيار الدورة المطابقة أو التجاهل --</option>
                          <option value="IGNORE">🚫 تجاهل هذه الدورة (لا تُحتسب)</option>
                          {allStd.map(std => (
                            <option key={std} value={std}>{std}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
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
