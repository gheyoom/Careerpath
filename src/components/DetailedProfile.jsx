import React, { useState } from 'react';

const Timeline = ({ employee }) => {
  return (
    <div className="mt-8 relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
      <div className="flex justify-between relative z-10">
        
        {/* Present */}
        <div className="flex flex-col items-center group cursor-help w-1/4 relative">
          <div className="w-8 h-8 rounded-full bg-emerald-500 border-4 border-white shadow-md flex items-center justify-center text-white relative z-10">
            <i className="fa-solid fa-briefcase text-[10px]"></i>
            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
          </div>
          <div className="text-center mt-3">
            <p className="text-[10px] font-bold text-slate-800">الحاضر</p>
            <p className="text-[9px] text-slate-500 mt-0.5">{employee.hrDetails?.approvedTitle || employee.currentPosition}</p>
          </div>

          <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white p-3 rounded-lg text-[10px] w-48 z-50 pointer-events-none shadow-xl border border-slate-700 right-1/2 translate-x-1/2">
            <p className="font-bold mb-1 border-b border-slate-600 pb-1 text-rose-300">متطلبات المرحلة الحالية:</p>
            {employee.currentRequirements?.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {employee.currentRequirements.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            ) : (
              <p className="text-slate-400">لا توجد متطلبات حالية (مؤهل)</p>
            )}
          </div>
        </div>

        {/* 2 Years */}
        <div className="flex flex-col items-center group cursor-help w-1/4 relative">
          <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-sm flex items-center justify-center text-white mt-1 z-10">
            <i className="fa-solid fa-arrow-trend-up text-[8px]"></i>
          </div>
          <div className="text-center mt-4">
            <p className="text-[10px] font-bold text-slate-800">بعد سنتين</p>
            <p className="text-[9px] text-slate-500 mt-0.5">{employee.targetPosition}</p>
          </div>

          <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white p-3 rounded-lg text-[10px] w-48 z-50 pointer-events-none shadow-xl border border-slate-700 right-1/2 translate-x-1/2">
            <p className="font-bold mb-1 border-b border-slate-600 pb-1 text-blue-300">متطلبات المرحلة القادمة:</p>
            {employee.nextRequirements?.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {employee.nextRequirements.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            ) : (
              <p className="text-slate-400">لا توجد متطلبات قادمة مسجلة</p>
            )}
          </div>
        </div>

        {/* 5 Years */}
        <div className="flex flex-col items-center group cursor-help w-1/4 relative">
          <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white shadow-sm flex items-center justify-center text-slate-500 mt-1 z-10">
            <i className="fa-solid fa-star text-[8px]"></i>
          </div>
          <div className="text-center mt-4">
            <p className="text-[10px] font-bold text-slate-400">بعد 5 سنوات</p>
            <p className="text-[9px] text-slate-400 mt-0.5">مستشار {employee.specialization}</p>
          </div>
        </div>

        {/* 10 Years */}
        <div className="flex flex-col items-center group cursor-help w-1/4 relative">
          <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-400 z-10">
            <i className="fa-solid fa-crown text-[10px]"></i>
          </div>
          <div className="text-center mt-3">
            <p className="text-[10px] font-bold text-slate-400">بعد 10 سنوات</p>
            <p className="text-[9px] text-slate-400 mt-0.5">قيادة استراتيجية</p>
          </div>
        </div>

      </div>
    </div>
  );
};

const DetailedProfile = ({ employee }) => {
  const [isHrExpanded, setIsHrExpanded] = useState(false);
  const [isStandardExpanded, setIsStandardExpanded] = useState(false);

  if (!employee) return null;

  const formatGrade = (grade) => {
    if (!grade) return "";
    if (grade.includes("أ-ب")) return "مدني\\4";
    if (grade.includes("ج-د")) return "مدني\\5";
    if (grade.includes("هـ-و") || grade.includes("ه-و")) return "مدني\\6";
    if (grade.includes("ز-ح")) return "مدني\\7";
    if (grade.includes("ط-ي")) return "مدني\\8";
    if (grade.includes("ك-ل")) return "مدني\\9";
    return grade;
  };

  return (
    <>
      <div className="text-right border-b border-slate-100 pb-4 mb-4">
        <h3 className="font-title font-bold text-base text-slate-800">
          <i className="fa-solid fa-chart-line text-blue-500 ml-2"></i>مسار خطة التطوير والمحطات العشرية
        </h3>
        <p className="text-[11px] text-slate-400">تحليل الوضع الحالي للموظف وهندسة التدرج الترقوي المستهدف</p>
      </div>

      <div className="flex items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200/60 rounded-xl mb-6">
        <div className="flex items-center gap-3 w-full">
          <div className="text-right w-full">
            <h4 className="font-bold text-slate-800">
              {employee.id} - {employee.hrDetails?.jobGrade && employee.hrDetails.jobGrade !== 'لا يوجد' ? `${formatGrade(employee.hrDetails.jobGrade)} / ` : ''}{employee.fullName}
            </h4>
            <p className="text-xs text-slate-500 mt-1">{employee.hrDetails?.approvedTitle || employee.currentPosition}</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-white border border-slate-200 text-slate-600 text-[9px] px-2 py-0.5 rounded-md font-semibold">
                {employee.specialization}
              </span>
              <span className="bg-white border border-slate-200 text-slate-600 text-[9px] px-2 py-0.5 rounded-md font-semibold">
                {employee.currentDepartment}
              </span>
            </div>
          </div>
        </div>

        <div className={`radial-progress ${
          employee.readinessScore === 0 ? 'text-slate-400' : 
          employee.readinessScore >= 85 ? 'text-emerald-500' : 
          (!employee.currentRequirements || employee.currentRequirements.length === 0) ? 'text-blue-500' : 
          'text-amber-550'
        } font-bold text-sm bg-slate-100 shadow-inner w-16 h-16 flex items-center justify-center rounded-full`} style={{"--value": employee.readinessScore}}>
          {employee.readinessScore}%
        </div>
      </div>

      {employee.hrDetails && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 shadow-sm transition-all duration-300">
          <div 
            className="flex justify-between items-center cursor-pointer pb-2 border-b border-slate-100"
            onClick={() => setIsHrExpanded(!isHrExpanded)}
          >
            <p className="text-xs font-bold text-slate-700">
              <i className="fa-solid fa-address-card ml-1.5 text-blue-500"></i>التصنيف الوظيفي والأكاديمي (HR Records)
            </p>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${isHrExpanded ? 'rotate-180' : ''}`}></i>
            </button>
          </div>

          <div className={`grid grid-cols-2 gap-3 text-[10px] overflow-hidden transition-all duration-300 ${isHrExpanded ? 'mt-4 opacity-100 max-h-[500px]' : 'max-h-0 opacity-0'}`}>
            {/* البيانات الفعلية من الكشف */}
            <div>
              <span className="text-slate-400 block mb-0.5">المنصب</span>
              <span className="font-bold text-slate-700">{employee.currentPosition}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">القسم</span>
              <span className="font-bold text-slate-700">{employee.currentDepartment}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">الشعبة</span>
              <span className="font-bold text-slate-700">{employee.specialization}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">الوحدة</span>
              <span className="font-bold text-slate-700">
                <i className="fa-solid fa-location-dot ml-1 text-rose-500"></i>
                {employee.hrDetails.location || "غير محدد"}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 block mb-0.5">المؤهل العلمي</span>
              <span className="font-bold text-slate-700">{employee.hrDetails.qualification}</span>
            </div>

            {/* فاصل قابل للطي */}
            <div className="col-span-2 mt-2 pt-3 border-t border-slate-100">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsStandardExpanded(!isStandardExpanded); }}
                className="w-full flex justify-between items-center text-blue-500 font-bold hover:text-blue-600 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <i className="fa-solid fa-layer-group text-[10px]"></i> 
                  <span>السجلات التنظيمية</span>
                </div>
                <i className={`fa-solid fa-chevron-down transition-transform duration-300 text-[10px] ${isStandardExpanded ? 'rotate-180' : ''}`}></i>
              </button>
            </div>

            {/* السجلات التنظيمية القياسية */}
            <div className={`col-span-2 grid grid-cols-2 gap-3 overflow-hidden transition-all duration-300 ${isStandardExpanded ? 'mt-2 opacity-100 max-h-[500px]' : 'max-h-0 opacity-0 m-0'}`}>
              <div>
                <span className="text-slate-400 block mb-0.5">الصنف الوظيفي</span>
                <span className="font-bold text-slate-700">{employee.hrDetails.jobCategory}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">التدرج الوظيفي</span>
                <span className="font-bold text-slate-700">
                  {formatGrade(employee.hrDetails.jobGrade)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">المجال الوظيفي</span>
                <span className="font-bold text-slate-700">{employee.hrDetails.jobField}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">المجموعة الوظيفية</span>
                <span className="font-bold text-slate-700">{employee.hrDetails.jobGroup}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">النوع الوظيفي</span>
                <span className="font-bold text-slate-700">{employee.hrDetails.jobType}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">المجال العلمي</span>
                <span className="font-bold text-slate-700">{employee.hrDetails.academicField}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Timeline employee={employee} />

      <div className="mt-8 border-t border-slate-100 pt-4">
        <p className="text-xs font-bold text-slate-700 mb-3"><i className="fa-solid fa-graduation-cap ml-1.5 text-slate-400"></i>سجل التدريب والجاهزية:</p>
        <div className="space-y-2">
          {employee.completedCourses?.map((c, idx) => (
            <div key={idx} className="flex justify-between items-center text-[11px] bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-100">
              <span>{c}</span>
              <i className="fa-solid fa-check-circle text-emerald-500"></i>
            </div>
          ))}
          {employee.currentRequirements?.map((c, idx) => (
            <div key={idx} className="flex justify-between items-center text-[11px] bg-rose-50 text-rose-800 p-2 rounded-lg border border-rose-100">
              <span>{c} <span className="font-bold text-[9px] text-rose-500 mr-1">(متطلب حالي)</span></span>
              <i className="fa-solid fa-triangle-exclamation text-rose-500"></i>
            </div>
          ))}
          {employee.nextRequirements?.map((c, idx) => (
            <div key={idx} className="flex justify-between items-center text-[11px] bg-amber-50 text-amber-800 p-2 rounded-lg border border-amber-100">
              <span>{c} <span className="font-bold text-[9px] text-amber-500 mr-1">(متطلب قادم)</span></span>
              <i className="fa-solid fa-hourglass-half text-amber-500"></i>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailedProfile;
