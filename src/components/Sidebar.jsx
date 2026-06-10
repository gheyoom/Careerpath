import React from 'react';
import ExcelImporter from './ExcelImporter';

const Sidebar = ({ activeScreen, setActiveScreen, onOpenPresentation, onImport }) => {
  return (
    <aside className="w-full lg:w-64 bg-white border-l border-slate-200 p-4 flex flex-col gap-2">
      <p className="text-[10px] text-slate-400 font-bold tracking-wider mb-2 px-3">القائمة التشغيلية</p>
      
      <button 
        onClick={() => setActiveScreen("discovery")}
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeScreen === "discovery" ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <i className="fa-solid fa-users text-lg"></i>
        <span>سجل الكوادر التقنية</span>
      </button>

      <button 
        onClick={() => setActiveScreen("comparison")}
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeScreen === "comparison" ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <i className="fa-solid fa-chart-line text-lg"></i>
        <span>لوحة المقارنة والتوصيات</span>
      </button>

      <button 
        onClick={() => setActiveScreen("requirements")}
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeScreen === "requirements" ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <i className="fa-solid fa-book-open-reader text-lg"></i>
        <span>دليل الدورات والشهادات</span>
      </button>

      <button 
        onClick={() => setActiveScreen("management")}
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeScreen === "management" ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <i className="fa-solid fa-users-gear text-lg"></i>
        <span>إدارة سجلات الموظفين</span>
      </button>

      <button 
        onClick={() => setActiveScreen("course_upload")}
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeScreen === "course_upload" ? 'bg-emerald-50 text-emerald-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <i className="fa-solid fa-cloud-arrow-up text-lg"></i>
        <span>استيراد ومطابقة الدورات</span>
      </button>

      <button 
        onClick={onOpenPresentation}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all text-slate-600 hover:bg-slate-50"
      >
        <i className="fa-solid fa-person-chalkboard text-lg"></i>
        <span>العرض التقديمي للمنصة</span>
      </button>

      <div className="mt-auto flex flex-col">
        <div className="border-t border-slate-100 pt-4 p-3 bg-slate-50 rounded-lg text-right">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold mb-1">
            <i className="fa-solid fa-circle-info"></i>
            <span>نصيحة القيادة الفنية:</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            الموظفون العاملون خارج قسم تقنية المعلومات يمثلون تشتتاً للموهبة. اضغط على أي بطاقة موظف لاستعراض تفاصيل خطته العشرية.
          </p>
        </div>
        
        {/* Excel Importer Feature */}
        <ExcelImporter onImport={onImport} />
      </div>
    </aside>
  );
};

export default Sidebar;
