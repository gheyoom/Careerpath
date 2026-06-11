import React, { useState, useEffect } from 'react';
import { pathsConfig as defaultPathsConfig, courseMetadata as defaultCourseMetadata } from './data/coursesData';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DiscoveryDashboard from './components/DiscoveryDashboard';
import PathPivotCanvas from './components/PathPivotCanvas';
import SmartComparison from './components/SmartComparison';
import PositionRequirements from './components/PositionRequirements';
import Presentation from './components/Presentation';
import ExcelImporter from './components/ExcelImporter';
import EmployeeManagement from './components/EmployeeManagement';
import CourseUploader from './components/CourseUploader';
import { initialEmployees, isHiddenItTalent, orgStructure as defaultOrgStructure } from './data/mockData';

function App() {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('careerpath_employees');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved employees", e);
      }
    }
    return initialEmployees;
  });

  useEffect(() => {
    localStorage.setItem('careerpath_employees', JSON.stringify(employees));
  }, [employees]);

  const [structure, setStructure] = useState(() => {
    const saved = localStorage.getItem('careerpath_org_structure');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved structure", e);
      }
    }
    return defaultOrgStructure;
  });

  useEffect(() => {
    localStorage.setItem('careerpath_org_structure', JSON.stringify(structure));
  }, [structure]);

  const [pathsConfigState, setPathsConfigState] = useState(() => {
    const saved = localStorage.getItem('careerpath_paths_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultPathsConfig;
  });

  const [courseMetadataState, setCourseMetadataState] = useState(() => {
    const saved = localStorage.getItem('careerpath_course_metadata');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultCourseMetadata;
  });

  useEffect(() => {
    localStorage.setItem('careerpath_paths_config', JSON.stringify(pathsConfigState));
  }, [pathsConfigState]);

  useEffect(() => {
    localStorage.setItem('careerpath_course_metadata', JSON.stringify(courseMetadataState));
  }, [courseMetadataState]);

  const handleImportEmployees = (newEmployees) => {
    setEmployees(prev => {
      // Merge, updating existing IDs or appending new ones
      const newMap = new Map(prev.map(e => [e.id, e]));
      newEmployees.forEach(emp => {
        newMap.set(emp.id, emp);
      });
      return Array.from(newMap.values());
    });
  };

  const handleUpdateEmployee = (id, updatedData) => {
    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp));
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const [activeScreen, setActiveScreen] = useState("discovery"); // discovery, pivot, management
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0] || initialEmployees[0]);
  const [quickFilter, setQuickFilter] = useState("all");
  const [showPresentationModal, setShowPresentationModal] = useState(false);

  // Statistics
  const totalTechGraduates = employees.length;
  const targetPositions = structure.reduce((sum, item) => sum + (Number(item.target) || 0), 0);
  const occupancyRate = targetPositions > 0 ? Math.round((totalTechGraduates / targetPositions) * 100) : 100;
  const needsCoursesCount = employees.filter(emp => emp.currentRequirements && emp.currentRequirements.length > 0).length;
  const promotionReadyCount = employees.filter(emp => emp.readinessScore >= 85).length;
  const hiddenTalentsCount = employees.filter(isHiddenItTalent).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header promotionReadyCount={promotionReadyCount} employees={employees} />

      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar 
          activeScreen={activeScreen} 
          setActiveScreen={setActiveScreen} 
          onOpenPresentation={() => setShowPresentationModal(true)} 
          onImport={handleImportEmployees}
        />

        <main className="flex-1 p-6 flex flex-col gap-6 overflow-x-hidden">
          {/* Dashboard Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Employees Card */}
            <div 
              onClick={() => setQuickFilter('all')}
              className={`group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border ${
                quickFilter === 'all' 
                  ? 'border-blue-500 ring-4 ring-blue-50/80 scale-[1.02] z-10' 
                  : 'border-slate-100 hover:border-blue-200'
              }`}
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full -ml-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="flex-1 w-full pl-3">
                  <p className="text-xs font-bold text-slate-500 mb-2">القوة العاملة (الفعلي مقابل المعتمد)</p>
                  <div className="flex items-end gap-2 mb-3">
                    <h3 className="text-3xl font-black text-slate-800 leading-none">{totalTechGraduates}</h3>
                    <span className="text-sm font-bold text-slate-400 mb-0.5">/ {targetPositions} منصب</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden shadow-inner">
                    <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${occupancyRate}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-blue-600">التغطية: {occupancyRate}%</span>
                    <span className="text-rose-500">{targetPositions - totalTechGraduates} شواغر</span>
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm transition-colors duration-300 ${quickFilter === 'all' ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                  <i className="fa-solid fa-users-rays"></i>
                </div>
              </div>
            </div>

            {/* Needs Courses Card */}
            <div 
              onClick={() => setQuickFilter('needs_courses')}
              className={`group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border ${
                quickFilter === 'needs_courses' 
                  ? 'border-amber-500 ring-4 ring-amber-50/80 scale-[1.02] z-10' 
                  : 'border-slate-100 hover:border-amber-200'
              }`}
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full -ml-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-500 mb-2">بحاجة لدورات (المنصب الحالي)</p>
                  <h3 className="text-3xl font-black text-amber-600 mb-1">
                    {needsCoursesCount} <span className="text-sm font-semibold opacity-70">موظفين</span>
                  </h3>
                  <p className="text-[10px] text-amber-600/80 font-bold leading-relaxed mt-2 pr-1">
                    <i className="fa-solid fa-triangle-exclamation ml-1 opacity-70"></i>لديهم متطلبات تدريبية غير مكتملة
                  </p>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm transition-colors duration-300 ${quickFilter === 'needs_courses' ? 'bg-amber-500 text-white shadow-amber-200' : 'bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white'}`}>
                  <i className="fa-solid fa-book-open-reader"></i>
                </div>
              </div>
            </div>

            {/* Ready for Promotion Card */}
            <div 
              onClick={() => setQuickFilter('ready_for_promotion')}
              className={`group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border ${
                quickFilter === 'ready_for_promotion' 
                  ? 'border-emerald-500 ring-4 ring-emerald-50/80 scale-[1.02] z-10' 
                  : 'border-slate-100 hover:border-emerald-200'
              }`}
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full -ml-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-500 mb-2">المؤهلون للترقية الفورية</p>
                  <h3 className="text-3xl font-black text-emerald-600 mb-1">
                    {promotionReadyCount} <span className="text-sm font-semibold opacity-70">كفاءات</span>
                  </h3>
                  <p className="text-[10px] text-emerald-600/80 font-bold leading-relaxed mt-2 pr-1">
                    <i className="fa-solid fa-arrow-trend-up ml-1 opacity-70"></i>تخطوا مؤشر الجاهزية (Score ≥ 85%)
                  </p>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm transition-colors duration-300 ${quickFilter === 'ready_for_promotion' ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white'}`}>
                  <i className="fa-solid fa-medal"></i>
                </div>
              </div>
            </div>

            {/* Hidden Talents Card */}
            <div 
              onClick={() => setQuickFilter('hidden_talents')}
              className={`group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border ${
                quickFilter === 'hidden_talents' 
                  ? 'border-indigo-500 ring-4 ring-indigo-50/80 scale-[1.02] z-10' 
                  : 'border-slate-100 hover:border-indigo-200'
              }`}
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full -ml-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-500 mb-2">توصيات التوجيه الذكي</p>
                  <h3 className="text-3xl font-black text-indigo-600 mb-1">
                    {hiddenTalentsCount} <span className="text-sm font-semibold opacity-70">كفاءات</span>
                  </h3>
                  <p className="text-[10px] text-indigo-600/80 font-bold leading-relaxed mt-2 pr-1">
                    <i className="fa-solid fa-lightbulb ml-1 opacity-70"></i>إعادة التوجيه (وظائف غير تقنية/مهارات متباينة)
                  </p>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm transition-colors duration-300 ${quickFilter === 'hidden_talents' ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'}`}>
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>
              </div>
            </div>
          </section>

          {activeScreen === "discovery" && (
            <DiscoveryDashboard 
              employees={employees} 
              selectedEmployee={selectedEmployee} 
              setSelectedEmployee={setSelectedEmployee} 
              quickFilter={quickFilter}
              structure={structure}
              setStructure={setStructure}
            />
          )}

          {activeScreen === "pivot" && (
            <PathPivotCanvas 
              employees={employees}
              setEmployees={setEmployees}
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              pathsConfig={pathsConfigState}
            />
          )}

          {activeScreen === "comparison" && (
            <SmartComparison 
              employees={employees}
              setEmployees={setEmployees}
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              pathsConfig={pathsConfigState}
              courseMetadata={courseMetadataState}
            />
          )}

          {activeScreen === "requirements" && (
            <PositionRequirements 
              pathsConfig={pathsConfigState} 
              courseMetadata={courseMetadataState} 
            />
          )}

          {activeScreen === "management" && (
            <EmployeeManagement 
              employees={employees} 
              onUpdate={handleUpdateEmployee} 
              onDelete={handleDeleteEmployee} 
              onImport={handleImportEmployees}
            />
          )}

          {activeScreen === "course_upload" && (
            <CourseUploader 
              employees={employees} 
              onUpdateEmployees={handleImportEmployees} 
              pathsConfig={pathsConfigState}
              setPathsConfig={setPathsConfigState}
              courseMetadata={courseMetadataState}
              setCourseMetadata={setCourseMetadataState}
              setEmployees={setEmployees}
            />
          )}

        </main>
      </div>

      {showPresentationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
            {/* Modal Header / Close button */}
            <div className="absolute top-4 left-4 z-50">
              <button 
                onClick={() => setShowPresentationModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                title="إغلاق"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            
            <Presentation />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
