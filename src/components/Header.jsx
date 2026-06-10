import React, { useState } from 'react';

const Header = ({ promotionReadyCount, employees }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isGold, setIsGold] = useState(false);

  const toggleTheme = () => {
    setIsGold(!isGold);
    if (!isGold) {
      document.body.classList.add('theme-gold');
    } else {
      document.body.classList.remove('theme-gold');
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-md shadow-blue-100">
          <i className="fa-solid fa-compass-drafting text-lg"></i>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 font-title">منصة مَسَار</h1>
          <p className="text-xs text-slate-500">المنظومة الذكية لتمكين الكفاءات التقنية، وتوجيه المسارات المهنية والتدريبية لتأهيل الكوادر</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative w-72 hidden md:block">
          <input 
            type="text" 
            placeholder="ابحث بالاسم أو الرقم الوظيفي..." 
            className="w-full bg-slate-100 border border-slate-200 rounded-lg py-2 px-10 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-right"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-search absolute right-3.5 top-3 text-slate-400 text-sm"></i>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all"
          title="تغيير المظهر"
        >
          <i className={`fa-solid ${isGold ? 'fa-gem text-amber-500' : 'fa-droplet text-blue-500'}`}></i>
        </button>

        {/* Notification Bell */}
        <div className="relative group cursor-pointer">
          <div className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all">
            <i className="fa-solid fa-bell"></i>
            <span className="absolute top-0 right-0 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
              {promotionReadyCount}
            </span>
          </div>
          {/* Dropdown */}
          <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-4 hidden group-hover:block z-50">
            <h4 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-2 mb-2">
              <i className="fa-solid fa-wand-magic-sparkles text-amber-500 ml-1.5"></i> كفاءات جاهزة للترقية الآن
            </h4>
            <div className="space-y-2">
              {employees.filter(emp => emp.readinessScore >= 85).map(emp => (
                <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-all" key={emp.id}>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-800">{emp.fullName}</p>
                    <p className="text-[10px] text-emerald-600">الجاهزية: {emp.readinessScore}% • متاح للترقية</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800">م. ناصر الشامسي</p>
            <p className="text-[10px] text-slate-400">رئيس قسم تقنية المعلومات</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
