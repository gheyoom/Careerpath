import React, { useState, useEffect, useRef } from 'react';
import FilterBar from './FilterBar';
import EmployeeGrid from './EmployeeGrid';
import DetailedProfile from './DetailedProfile';
import VacanciesView from './VacanciesView';
import { isHiddenItTalent } from '../data/mockData';

const DiscoveryDashboard = ({ employees, selectedEmployee, setSelectedEmployee, quickFilter, structure, setStructure }) => {
  const [filterSpecialization, setFilterSpecialization] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterJobCategory, setFilterJobCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [showExecutiveModal, setShowExecutiveModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [vitalFilter, setVitalFilter] = useState("all");
  const [globalSearch, setGlobalSearch] = useState("");

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowExecutiveModal(false);
      setIsClosing(false);
    }, 300); // 300ms matches animation duration
  };

  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!showExecutiveModal) return;
      if (panelRef.current && panelRef.current.contains(event.target)) {
        return; // clicked inside the panel
      }
      if (event.target.closest('tbody tr')) {
        return; // clicked a table row, let the row handle selecting the new employee
      }
      handleCloseModal();
    };

    if (showExecutiveModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExecutiveModal]);

  const isCivilian = (emp) => emp.hrDetails?.jobGrade?.includes("مدني");

  const civilianCount = employees.filter(isCivilian).length;
  const militaryCount = employees.length - civilianCount;
  const outsideAbuDhabiCount = employees.filter(emp => emp.hrDetails && emp.hrDetails.location && emp.hrDetails.location !== "أبوظبي").length;

  const filteredEmployees = employees.filter(emp => {
    const matchSpec = filterSpecialization === "" || emp.specialization === filterSpecialization;
    const matchDept = filterDepartment === "" || emp.currentDepartment === filterDepartment;
    const matchCat = filterJobCategory === "" || (emp.hrDetails && emp.hrDetails.jobCategory === filterJobCategory);
    const matchLoc = filterLocation === "" || 
                     (filterLocation === "خارج أبوظبي" 
                       ? (emp.hrDetails && emp.hrDetails.location !== "أبوظبي") 
                       : (emp.hrDetails && emp.hrDetails.location === filterLocation));
    const matchQuick = quickFilter === "all" || 
                       (quickFilter === "needs_courses" && emp.currentRequirements && emp.currentRequirements.length > 0) || 
                       (quickFilter === "ready_for_promotion" && emp.readinessScore >= 85) ||
                       (quickFilter === "hidden_talents" && isHiddenItTalent(emp));
                       
    const matchVital = vitalFilter === "all" ||
      (vitalFilter === "military" && !isCivilian(emp)) ||
      (vitalFilter === "civilian" && isCivilian(emp)) ||
      (vitalFilter === "outside_ad" && emp.hrDetails?.location && emp.hrDetails.location !== "أبوظبي");
      
    const searchString = globalSearch.toLowerCase();
    const matchSearch = globalSearch === "" || 
      emp.id.toString().includes(searchString) ||
      emp.fullName.toLowerCase().includes(searchString) ||
      (emp.hrDetails?.jobGrade && emp.hrDetails.jobGrade.toLowerCase().includes(searchString)) ||
      (emp.currentPosition && emp.currentPosition.toLowerCase().includes(searchString)) ||
      (emp.currentDepartment && emp.currentDepartment.toLowerCase().includes(searchString)) ||
      (emp.targetPosition && emp.targetPosition.toLowerCase().includes(searchString));

    return matchSpec && matchDept && matchCat && matchLoc && matchQuick && matchVital && matchSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      <FilterBar 
        filterSpecialization={filterSpecialization}
        setFilterSpecialization={setFilterSpecialization}
        filterDepartment={filterDepartment}
        setFilterDepartment={setFilterDepartment}
        filterJobCategory={filterJobCategory}
        setFilterJobCategory={setFilterJobCategory}
        filterLocation={filterLocation}
        setFilterLocation={setFilterLocation}
        filteredCount={filteredEmployees.length}
        totalCount={employees.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
        vitalFilter={vitalFilter}
        setVitalFilter={setVitalFilter}
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
        stats={{ militaryCount, civilianCount, outsideAbuDhabiCount }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className={(viewMode === 'executive' || viewMode === 'vacancies') ? "xl:col-span-12" : "xl:col-span-7"}>
          {viewMode === 'vacancies' ? (
            <VacanciesView employees={filteredEmployees} orgStructure={structure} setOrgStructure={setStructure} />
          ) : viewMode === 'grid' || viewMode === 'list' || viewMode === 'executive' ? (
            <EmployeeGrid 
              filteredEmployees={filteredEmployees}
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={(emp) => {
                setSelectedEmployee(emp);
                if (viewMode === 'executive') setShowExecutiveModal(true);
              }}
              viewMode={viewMode}
            />
          ) : null}
        </div>

        {viewMode !== 'executive' && viewMode !== 'vacancies' && (
          <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-24">
            <DetailedProfile employee={selectedEmployee} />
          </div>
        )}
      </div>

      {/* Left side modal for Executive View */}
      {viewMode === 'executive' && (showExecutiveModal || isClosing) && selectedEmployee && (
        <div className={`fixed inset-0 z-40 flex justify-end pointer-events-none transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}>
          {/* Faint Backdrop */}
          <div className="absolute inset-0 bg-slate-800/10 backdrop-blur-[1px]"></div>
          
          <div 
            ref={panelRef}
            className={`bg-slate-50 w-full max-w-2xl h-full shadow-2xl overflow-y-auto relative border-l border-slate-200 pointer-events-auto ${isClosing ? 'animate-slide-out-left' : 'animate-slide-in-left'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-200 text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition-colors z-10"
              title="إغلاق"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
            <div className="p-8 pb-12 mt-12">
              <h2 className="text-xl font-bold text-slate-800 mb-6 font-title flex items-center gap-2">
                <i className="fa-solid fa-route text-blue-500"></i>
                مسار خطة التطوير والمحطات العمرية
              </h2>
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <DetailedProfile employee={selectedEmployee} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoveryDashboard;
