import React, { useState } from 'react';
import FilterBar from './FilterBar';
import EmployeeGrid from './EmployeeGrid';
import DetailedProfile from './DetailedProfile';
import { isHiddenItTalent } from '../data/mockData';

const DiscoveryDashboard = ({ employees, selectedEmployee, setSelectedEmployee, quickFilter }) => {
  const [filterSpecialization, setFilterSpecialization] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterJobCategory, setFilterJobCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [viewMode, setViewMode] = useState("list");

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
    return matchSpec && matchDept && matchCat && matchLoc && matchQuick;
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
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7">
          <EmployeeGrid 
            filteredEmployees={filteredEmployees}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            viewMode={viewMode}
          />
        </div>

        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-24">
          <DetailedProfile employee={selectedEmployee} />
        </div>
      </div>
    </div>
  );
};

export default DiscoveryDashboard;
