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
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col mb-2">
      {/* Top Section: Compact Vital Tabs */}
      <div className="flex flex-row border-b border-slate-100 bg-slate-50/50 rounded-t-2xl overflow-x-auto overflow-y-hidden">
        <button 
          onClick={() => setVitalFilter('all')}
          className={`px-5 py-3 text-xs font-bold transition-all relative flex items-center justify-center gap-1.5 min-w-max ${vitalFilter === 'all' ? 'bg-white text-blue-600 shadow-sm z-10' : 'text-slate-500 hover:bg-slate-100/50'}`}
        >
          {vitalFilter === 'all' && <div className="absolute top-0 inset-x-0 h-0.5 bg-blue-600"></div>}
          <span>إجمالي الموظفين ({totalCount})</span>
        </button>
        
        <button 
          onClick={() => setVitalFilter('military')}
          className={`px-5 py-3 text-xs font-bold transition-all relative flex items-center justify-center gap-1.5 min-w-max ${vitalFilter === 'military' ? 'bg-white text-blue-600 shadow-sm z-10' : 'text-slate-500 hover:bg-slate-100/50'}`}
        >
          {vitalFilter === 'military' && <div className="absolute top-0 inset-x-0 h-0.5 bg-blue-600"></div>}
          <i className="fa-solid fa-shield text-slate-400"></i>
          <span>العسكريين ({stats.militaryCount})</span>
        </button>

        <button 
          onClick={() => setVitalFilter('civilian')}
          className={`px-5 py-3 text-xs font-bold transition-all relative flex items-center justify-center gap-1.5 min-w-max ${vitalFilter === 'civilian' ? 'bg-white text-emerald-600 shadow-sm z-10' : 'text-slate-500 hover:bg-slate-100/50'}`}
        >
          {vitalFilter === 'civilian' && <div className="absolute top-0 inset-x-0 h-0.5 bg-emerald-600"></div>}
          <i className="fa-solid fa-user-tie text-slate-400"></i>
          <span>المدنيين ({stats.civilianCount})</span>
        </button>

        <button 
          onClick={() => setVitalFilter('outside_ad')}
          className={`px-5 py-3 text-xs font-bold transition-all relative flex items-center justify-center gap-1.5 min-w-max ${vitalFilter === 'outside_ad' ? 'bg-white text-amber-600 shadow-sm z-10' : 'text-slate-500 hover:bg-slate-100/50'}`}
        >
          {vitalFilter === 'outside_ad' && <div className="absolute top-0 inset-x-0 h-0.5 bg-amber-600"></div>}
          <i className="fa-solid fa-map-location-dot text-slate-400"></i>
          <span>خارج أبوظبي ({stats.outsideAbuDhabiCount})</span>
        </button>
      </div>

      {/* Bottom Section: Search & Dropdown Filters */}
      <div className="p-3 flex flex-wrap gap-4 items-center justify-between">
        
        {/* Dropdowns & Reset */}
        <div className="flex flex-wrap gap-2 items-center flex-1">
          <select 
            value={filterSpecialization} 
            onChange={(e) => setFilterSpecialization(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2.5 outline-none focus:border-blue-500 transition-all font-semibold hover:bg-slate-100"
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
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2.5 outline-none focus:border-blue-500 transition-all font-semibold hover:bg-slate-100"
          >
            <option value="">جميع الأقسام</option>
            <option value="المعهد">المعهد</option>
            <option value="الكلية">الكلية</option>
            <option value="قسم تقنية المعلومات">قسم تقنية المعلومات</option>
            <option value="قسم الدعم الفني">قسم الدعم الفني</option>
          </select>

          <select 
            value={filterJobCategory} 
            onChange={(e) => setFilterJobCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2.5 outline-none focus:border-blue-500 transition-all font-semibold hover:bg-slate-100"
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
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2.5 outline-none focus:border-blue-500 transition-all font-semibold hover:bg-slate-100"
          >
            <option value="">جميع المواقع</option>
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
              className="text-xs text-rose-500 font-bold hover:bg-rose-50 p-2 rounded-lg transition-colors whitespace-nowrap"
              title="إعادة تعيين التصفية السريعة"
            >
              <i className="fa-solid fa-xmark ml-1"></i> مسح
            </button>
          )}

          {/* Compact Search */}
          <div className="relative mr-2">
            <input 
              type="text" 
              placeholder="بحث..." 
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-48 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg py-2.5 px-3 pr-8 outline-none focus:border-blue-500 focus:bg-white transition-all font-semibold shadow-sm"
            />
            <i className="fa-solid fa-search absolute right-2.5 top-3 text-slate-400 text-xs"></i>
          </div>
        </div>

        {/* View Toggles & Count */}
        <div className="flex items-center gap-4 pl-2 border-r border-slate-100 mr-2">
          <div className="text-xs text-slate-400 font-bold whitespace-nowrap">
            النتائج: <span className="text-slate-700">{filteredCount}</span>
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
            <button 
              onClick={() => setViewMode('vacancies')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'vacancies' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              title="الهيكل التنظيمي والشواغر"
            >
              <i className="fa-solid fa-sitemap"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
