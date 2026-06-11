import React from 'react';

const FilterBar = ({ 
  filterSpecialization, setFilterSpecialization, 
  filterDepartment, setFilterDepartment, 
  filterJobCategory, setFilterJobCategory, 
  filterLocation, setFilterLocation, 
  filteredCount, 
  totalCount, 
  viewMode, 
  setViewMode,
  vitalFilter,
  setVitalFilter,
  globalSearch,
  setGlobalSearch,
  stats
}) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Vital Indicators Tags */}
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setVitalFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${vitalFilter === 'all' ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
        >
          إجمالي الموظفين ({totalCount})
        </button>
        <button 
          onClick={() => setVitalFilter('military')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${vitalFilter === 'military' ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
        >
          <i className="fa-solid fa-shield ml-1.5 opacity-70"></i> العسكريين ({stats.militaryCount})
        </button>
        <button 
          onClick={() => setVitalFilter('civilian')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${vitalFilter === 'civilian' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
        >
          <i className="fa-solid fa-user-tie ml-1.5 opacity-70"></i> المدنيين ({stats.civilianCount})
        </button>
        <button 
          onClick={() => setVitalFilter('outside_ad')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${vitalFilter === 'outside_ad' ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
        >
          <i className="fa-solid fa-map-location-dot ml-1.5 opacity-70"></i> خارج أبوظبي ({stats.outsideAbuDhabiCount})
        </button>
      </div>

      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-row gap-4 items-center justify-between overflow-x-auto">
        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
        <span className="text-xs font-bold text-slate-500 mb-2 md:mb-0">
          <i className="fa-solid fa-sliders ml-1.5 text-blue-500"></i> تصفية وبحث:
        </span>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="بحث شامل..." 
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg py-2.5 px-3 pr-8 outline-none focus:border-blue-500 transition-all font-semibold w-48 shadow-inner"
          />
          <i className="fa-solid fa-search absolute right-2.5 top-3 text-slate-400 text-xs"></i>
        </div>

        <select 
          value={filterSpecialization} 
          onChange={(e) => setFilterSpecialization(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2.5 outline-none focus:border-blue-500 transition-all font-semibold"
        >
          <option value="">جميع التخصصات التقنية</option>
          <option value="برمجة">برمجة</option>
          <option value="ذكاء اصطناعي">ذكاء اصطناعي</option>
          <option value="أمن سيبراني">أمن سيبراني</option>
          <option value="علم بيانات">علم بيانات</option>
          <option value="دعم فني">دعم فني</option>
        </select>

        <select 
          value={filterDepartment} 
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2.5 outline-none focus:border-blue-500 transition-all font-semibold"
        >
          <option value="">جميع الأقسام والقطاعات</option>
          <option value="المعهد">المعهد</option>
          <option value="الكلية">الكلية</option>
          <option value="قسم تقنية المعلومات">قسم تقنية المعلومات</option>
          <option value="قسم الدعم الفني">قسم الدعم الفني</option>
        </select>

        <select 
          value={filterJobCategory} 
          onChange={(e) => setFilterJobCategory(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2.5 outline-none focus:border-blue-500 transition-all font-semibold"
        >
          <option value="">جميع الأصناف الوظيفية</option>
          <option value="الدعم الفني">الدعم الفني</option>
          <option value="تطوير البرمجيات">تطوير البرمجيات</option>
          <option value="الأمن السيبراني">الأمن السيبراني</option>
          <option value="إدارة البيانات">إدارة البيانات</option>
          <option value="تحليل البيانات">تحليل البيانات</option>
        </select>

        <select 
          value={filterLocation} 
          onChange={(e) => setFilterLocation(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2.5 outline-none focus:border-blue-500 transition-all font-semibold"
        >
          <option value="">جميع المواقع الجغرافية</option>
          <option value="أبوظبي">أبوظبي</option>
          <option value="خارج أبوظبي">خارج أبوظبي</option>
          <option value="جبل علي">جبل علي</option>
          <option value="غنتوت">غنتوت</option>
          <option value="الفجيرة">الفجيرة</option>
        </select>

        {(filterSpecialization || filterDepartment || filterJobCategory || filterLocation) && (
          <button 
            onClick={() => { 
              setFilterSpecialization(""); 
              setFilterDepartment(""); 
              setFilterJobCategory(""); 
              setFilterLocation(""); 
            }}
            className="text-xs text-rose-500 font-bold hover:underline"
          >
            إعادة تعيين التصفية
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-xs text-slate-400 font-semibold shrink-0">
          نتائج البحث: {filteredCount}
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            title="عرض الشبكة"
          >
            <i className="fa-solid fa-border-all"></i>
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            title="عرض القائمة"
          >
            <i className="fa-solid fa-list"></i>
          </button>
          <button 
            onClick={() => setViewMode('executive')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'executive' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            title="العرض التنفيذي (جدول)"
          >
            <i className="fa-solid fa-table"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
