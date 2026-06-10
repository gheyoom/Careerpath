import React, { useState, useEffect } from 'react';
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
import { initialEmployees, isHiddenItTalent } from './data/mockData';

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
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => setQuickFilter('all')}
              className={`bg-white border p-5 rounded-xl shadow-sm flex justify-between items-center cursor-pointer transition-all ${
                quickFilter === 'all' 
                  ? 'border-blue-500 ring-2 ring-blue-100' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">اجمالي الموظفين التقنيين</p>
                <h3 className="text-2xl font-bold text-slate-800">
                  {totalTechGraduates} موظفين
                </h3>
                <p className="text-[10px] text-slate-500 mt-1">العدد الإجمالي للموظفين ذوي المؤهلات والتخصصات التقنية في كافة أقسام المؤسسة</p>
              </div>
              <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
            </div>

            <div 
              onClick={() => setQuickFilter('needs_courses')}
              className={`bg-white border p-5 rounded-xl shadow-sm flex justify-between items-center cursor-pointer transition-all ${quickFilter === 'needs_courses' ? 'border-amber-500 ring-2 ring-amber-100' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">بحاجة لدورات في المنصب الحالي</p>
                <h3 className="text-2xl font-bold text-amber-600">{needsCoursesCount} موظفين</h3>
                <p className="text-[10px] text-amber-500 font-semibold mt-1">
                  <i className="fa-solid fa-book-open ml-1"></i> لديهم متطلبات تدريبية غير مكتملة
                </p>
              </div>
              <div className="bg-amber-50 text-amber-600 w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-book-open"></i>
              </div>
            </div>

            <div 
              onClick={() => setQuickFilter('ready_for_promotion')}
              className={`bg-white border p-5 rounded-xl shadow-sm flex justify-between items-center cursor-pointer transition-all ${quickFilter === 'ready_for_promotion' ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">المؤهلون للترقية الفورية</p>
                <h3 className="text-2xl font-bold text-emerald-600">{promotionReadyCount} كفاءات</h3>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">تخطوا مؤشر الجاهزية Score ≥ 85%</p>
              </div>
              <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-award"></i>
              </div>
            </div>

            <div 
              onClick={() => setQuickFilter('hidden_talents')}
              className={`bg-white border p-5 rounded-xl shadow-sm flex justify-between items-center cursor-pointer transition-all ${quickFilter === 'hidden_talents' ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">المواهب وتوصيات التوجيه الذكي</p>
                <h3 className="text-2xl font-bold text-indigo-650">{hiddenTalentsCount} كفاءات</h3>
                <p className="text-[10px] text-indigo-500 font-semibold mt-1">توصيات إعادة التوجيه للمهارات المتباينة ووظائف غير تقنية</p>
              </div>
              <div className="bg-indigo-50 text-indigo-650 w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-user-secret"></i>
              </div>
            </div>
          </section>

          {activeScreen === "discovery" && (
            <DiscoveryDashboard 
              employees={employees} 
              selectedEmployee={selectedEmployee} 
              setSelectedEmployee={setSelectedEmployee} 
              quickFilter={quickFilter}
            />
          )}

          {activeScreen === "pivot" && (
            <PathPivotCanvas 
              employees={employees}
              setEmployees={setEmployees}
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
            />
          )}

          {activeScreen === "comparison" && (
            <SmartComparison 
              employees={employees}
              setEmployees={setEmployees}
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
            />
          )}

          {activeScreen === "requirements" && (
            <PositionRequirements />
          )}

          {activeScreen === "management" && (
            <EmployeeManagement 
              employees={employees} 
              onUpdate={handleUpdateEmployee} 
              onDelete={handleDeleteEmployee} 
            />
          )}

          {activeScreen === "course_upload" && (
            <CourseUploader 
              employees={employees} 
              onUpdateEmployees={setEmployees}
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
