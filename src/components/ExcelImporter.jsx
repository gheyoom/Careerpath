import React, { useRef } from 'react';
import * as XLSX from 'xlsx';

function ExcelImporter({ onImport }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        
        // --- 1. Find and parse the Standard Positions (Second Sheet) ---
        let defaultsMap = {};
        let defaultsSheetName = null;
        for (const sheetName of wb.SheetNames) {
           const sheetData = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
           const headers = sheetData.length > 0 ? sheetData[0] : [];
           if (headers.includes("مسمى المهنة الفنية") || headers.includes("المجموعة الوظيفية")) {
             defaultsSheetName = sheetName;
             break;
           }
        }
        
        // If not found by headers, assume it's the second sheet if it exists
        if (!defaultsSheetName && wb.SheetNames.length > 1) {
          defaultsSheetName = wb.SheetNames[1];
        }

        if (defaultsSheetName) {
           const defaultsData = XLSX.utils.sheet_to_json(wb.Sheets[defaultsSheetName], { defval: "" });
           defaultsData.forEach(row => {
              const positionName = row["مسمى المهنة الفنية"];
              if (positionName) {
                 defaultsMap[positionName.toString().trim()] = {
                    jobCategory: row["الصنف الوظيفي"] || "",
                    jobField: row["المجال الوظيفي"] || "",
                    jobGroup: row["المجموعة الوظيفية"] || "",
                    jobType: row["النوع الوظيفي"] || "",
                    academicField: row["المجال العلمي"] || "",
                    qualification: row["المؤهل العلمي"] || ""
                 };
              }
           });
        }

        // --- 2. Find and parse the Employees (First Sheet) ---
        let employeeSheetName = wb.SheetNames[0];
        for (const sheetName of wb.SheetNames) {
           const sheetData = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
           const headers = sheetData.length > 0 ? sheetData[0] : [];
           if (headers.includes("الاسم") || headers.includes("الرقم") || headers.includes("رقم وظيفي")) {
             employeeSheetName = sheetName;
             break;
           }
        }

        const ws = wb.Sheets[employeeSheetName];
        const data = XLSX.utils.sheet_to_json(ws, { defval: "" });

        const isBackup = data.length > 0 && data[0].hasOwnProperty("نسبة الجاهزية");

        const mappedEmployees = data.map((row, index) => {
          if (isBackup) {
            return {
              id: row["الرقم"] || (10000 + index),
              fullName: row["الاسم"] || "غير محدد",
              specialization: row["التخصص"] || "غير محدد",
              currentPosition: row["المنصب"] || "موظف",
              currentDepartment: row["القسم"] || "غير محدد",
              avatar: "./images/avatars/male4.png", 
              readinessScore: Number(row["نسبة الجاهزية"]) || 0,
              targetPosition: row["المسار المستهدف"] || row["المنصب"] || "موظف",
              employeeType: (String(row["الرتبة"] || "").includes("مدني") || String(row["الرتبة"] || "").includes("درجة")) ? "civil" : "military",
              completedCourses: row["الدورات المنجزة"] ? row["الدورات المنجزة"].split(" ، ").filter(Boolean) : [],
              currentRequirements: row["الدورات المطلوبة"] ? row["الدورات المطلوبة"].split(" ، ").filter(Boolean) : [],
              nextRequirements: [],
              skillsInventory: {},
              hrDetails: {
                approvedTitle: row["المنصب"] || "موظف",
                jobCategory: row["الصنف"] || "غير محدد",
                jobField: row["الشعبة"] || "غير محدد",
                jobGroup: row["المجموعة الوظيفية"] || "التطوير والابتكار", 
                jobType: row["النوع الوظيفي"] || "الاسناد", 
                jobGrade: row["الرتبة"] || "غير محدد",
                standardPositionGrade: "",
                academicField: row["المجال العلمي"] || "غير محدد",
                qualification: row["المؤهل العلمي"] || "غير محدد", 
                standardQualification: "", 
                location: row["الوحدة"] || "أبوظبي",
                notes: row["الملاحظات"] || ""
              }
            };
          }

          const employeeId = row["الرقم"] || row["رقم وظيفي"] || (10000 + index);
          
          // Column B is now "الرتبة للمهنة" (Standard Position Rank)
          // Column K is now "الرتبة" (Employee's Actual Rank)
          let actualRankStr = String(row["الرتبة"] || "");
          if (actualRankStr.includes("أ-ب")) actualRankStr = "مدني\\4";
          else if (actualRankStr.includes("ج-د")) actualRankStr = "مدني\\5";
          else if (actualRankStr.includes("هـ-و") || actualRankStr.includes("ه-و")) actualRankStr = "مدني\\6";
          else if (actualRankStr.includes("ز-ح")) actualRankStr = "مدني\\7";
          else if (actualRankStr.includes("ط-ي")) actualRankStr = "مدني\\8";
          else if (actualRankStr.includes("ك-ل")) actualRankStr = "مدني\\9";

          const isCivilian = actualRankStr.includes("مدني") || actualRankStr.includes("درجة");
          
          const rawPosition = String(row["المنصب"] || row["مسمى المهنة الفنية"] || "موظف").trim();
          
          // Find defaults if military
          let hrDefaults = {};
          if (!isCivilian && defaultsMap[rawPosition]) {
             hrDefaults = defaultsMap[rawPosition];
          }

          return {
            id: employeeId,
            fullName: row["الاسم"] || "غير محدد",
            specialization: row["الشعبة"] || row["القسم"] || "غير محدد",
            currentPosition: rawPosition,
            currentDepartment: row["القسم"] || row["القسم\\1"] || row["القسم1"] || "غير محدد",
            avatar: "./images/avatars/male4.png", 
            readinessScore: 0,
            targetPosition: rawPosition,
            employeeType: isCivilian ? "civil" : "military",
            completedCourses: [],
            currentRequirements: [],
            nextRequirements: [],
            skillsInventory: {},
            hrDetails: {
              approvedTitle: rawPosition,
              jobCategory: hrDefaults.jobCategory || row["الصنف"] || "غير محدد",
              jobField: hrDefaults.jobField || row["الشعبة"] || "غير محدد",
              jobGroup: hrDefaults.jobGroup || "التطوير والابتكار", 
              jobType: hrDefaults.jobType || "الاسناد", 
              jobGrade: actualRankStr || "غير محدد",
              standardPositionGrade: String(row["الرتبة للمهنة"] || ""), // Saving Column B
              academicField: hrDefaults.academicField || "غير محدد",
              qualification: row["المؤهل العلمي"] || "غير محدد", // Prioritize actual qualification
              standardQualification: hrDefaults.qualification || "", // Save position standard separately
              location: row["الوحدة"] || "أبوظبي",
              notes: row["الملاحظات"] || ""
            }
          };
        });

        // Filter out empty rows
        const validEmployees = mappedEmployees.filter(emp => emp.fullName !== "غير محدد" && emp.fullName !== "");

        onImport(validEmployees);
        if (isBackup) {
          alert(`تم استعادة النسخة الاحتياطية بنجاح لـ ${validEmployees.length} موظف.`);
        } else {
          alert(`تم بنجاح استيراد ${validEmployees.length} موظف وتم تطبيق السجلات الآلية للمهن الفنية للعسكريين.`);
        }
      } catch (err) {
        console.error(err);
        alert("حدث خطأ أثناء قراءة الملف. يرجى التأكد من أن الملف بصيغة Excel أو CSV.");
      }
      
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="mt-8 pt-6 border-t border-slate-200">
      <input 
        type="file" 
        accept=".xlsx, .xls, .csv" 
        onChange={handleFileUpload} 
        ref={fileInputRef}
        className="hidden" 
      />
      <button 
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-semibold border border-slate-200"
      >
        <i className="fa-solid fa-file-excel text-emerald-600 text-lg"></i>
        <span>استيراد من Excel</span>
      </button>
      <p className="text-[10px] text-slate-400 text-center mt-2 px-2">
        سيتم حفظ البيانات المدخلة تلقائياً للاستخدام دون إنترنت
      </p>
    </div>
  );
}

export default ExcelImporter;
