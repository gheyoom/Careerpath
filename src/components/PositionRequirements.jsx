import React, { useState } from 'react';

const positionsData = [
  {
    title: "مبرمج",
    englishTitle: "Developer",
    icon: "fa-code",
    color: "blue",
    description: "يركز هذا المسار على بناء الحلول البرمجية المتكاملة، ومعمارية النظم، وجودة الأكواد.",
    gatekeeper: [
      { name: "لغة جافا سكربت المتقدمة (Advanced JavaScript / TypeScript)", level: "متوسط", type: "دورة" },
      { name: "تصميم قواعد البيانات والـ SQL المتقدم (Database Design & Advanced SQL Querying)", level: "مبتدئ", type: "دورة" },
      { name: "معمارية برمجيات الويب وأنماط التصميم (Web Software Architecture & Design Patterns)", level: "متقدم", type: "شهادة" }
    ],
    enablement: [
      { name: "هندسة وتكامل واجهات البرمجة (RESTful APIs Integration)", level: "متوسط", type: "دورة" },
      { name: "مبادئ وأدوات أتمتة الـ DevOps (CI/CD Pipelines using Git)", level: "متوسط", type: "دورة" },
      { name: "منهجية إدارة المشاريع البرمجية الرشيقة (Certified Scrum Master - CSM)", level: "متوسط", type: "شهادة" }
    ]
  },
  {
    title: "محلل نظم",
    englishTitle: "Systems Analyst",
    icon: "fa-magnifying-glass-chart",
    color: "amber",
    description: "يمثل الجسر الواصل بين المتطلبات الإدارية للمؤسسة والحلول البرمجية التقنية.",
    gatekeeper: [
      { name: "تحليل وتصميم النظم الهيكلية (Systems Analysis and Design Fundamentals)", level: "مبتدئ", type: "دورة" },
      { name: "هندسة واستخلاص المتطلبات (Requirements Engineering - IREB)", level: "متوسط", type: "دورة" },
      { name: "تصميم قواعد البيانات والـ SQL المتقدم (Database Design & Advanced SQL Querying)", level: "مبتدئ", type: "دورة" }
    ],
    enablement: [
      { name: "نمذجة وتوثيق عمليات الأعمال (Business Process Model and Notation - BPMN 2.0)", level: "متوسط", type: "دورة" },
      { name: "لغة النمذجة الموحدة لتصميم النظم (Unified Modeling Language - UML)", level: "متوسط", type: "دورة" },
      { name: "إدارة المشاريع المرنة وإطار العمل الرشيق (Agile & Scrum Product Ownership)", level: "متقدم", type: "شهادة" }
    ]
  },
  {
    title: "مهندس ذكاء اصطناعي",
    englishTitle: "AI Engineer",
    icon: "fa-brain",
    color: "purple",
    description: "المسار المستقبلي المسؤول عن بناء، تدريب، وتطوير النماذج الذكية وضبط مخرجاتها.",
    gatekeeper: [
      { name: "أساسيات البرمجة بلغة بايثون للذكاء الاصطناعي (Python for AI & Data Science)", level: "مبتدئ", type: "دورة" },
      { name: "تحليل البيانات الإحصائية والرياضيات التطبيقية (Statistical Data Analysis & Mathematics)", level: "متوسط", type: "دورة" },
      { name: "هندسة وتطوير النماذج السحابية (Microsoft Certified: Azure AI Engineer Associate)", level: "متقدم", type: "شهادة" }
    ],
    enablement: [
      { name: "إدارة بيئات ونماذج الذكاء الاصطناعي في الإنتاج (MLOps & Big Data Pipelines)", level: "متقدم", type: "شهادة" },
      { name: "بناء وتوجيه النماذج اللغوية الكبيرة (LLMs, Prompt Engineering & RAG Systems)", level: "متقدم", type: "شهادة" },
      { name: "ضبط وتعديل النماذج الذكية المتخصصة (Fine-tuning Pre-trained Models)", level: "متقدم", type: "شهادة" }
    ]
  },
  {
    title: "مهندس أمن سيبراني",
    englishTitle: "Cybersecurity Engineer",
    icon: "fa-shield-halved",
    color: "rose",
    description: "المسار المعني بحماية البنية التحتية للمؤسسة، الاستجابة للحوادث، وإدارة الدفاعات الرقمية.",
    gatekeeper: [
      { name: "أساسيات وهندسة شبكات الحاسب (CompTIA Network+)", level: "متوسط", type: "شهادة" },
      { name: "شهادة حماية الأنظمة المعتمدة (CompTIA Security+)", level: "متوسط", type: "شهادة" },
      { name: "شهادة الهكر الأخلاقي واختبار الاختراق المبدئي (Certified Ethical Hacker - CEH)", level: "متقدم", type: "شهادة" }
    ],
    enablement: [
      { name: "إدارة الحوادث السيبرانية والاستجابة الفورية (GIAC Certified Incident Handler - GCIH)", level: "متقدم", type: "شهادة" },
      { name: "أمن الحوسبة السحابية والمنافذ الهجينة (Certified Cloud Security Professional - CCSP)", level: "متقدم", type: "شهادة" },
      { name: "إدارة وتقييم الثغرات الأمنية للأنظمة (Vulnerabilities Assessment & Penetration Testing - VAPT)", level: "متوسط", type: "دورة" }
    ]
  },
  {
    title: "فني كمبيوتر",
    englishTitle: "Computer Technician",
    icon: "fa-laptop-code",
    color: "emerald",
    description: "يركز على صيانة البنية التحتية المادية (الأجهزة والعتاد) لضمان استمرارية التشغيل المادي للمؤسسة.",
    gatekeeper: [
      { name: "صيانة الأجهزة المادية والعتاد المتقدم (CompTIA A+ Core 1 & Core 2)", level: "متوسط", type: "شهادة" },
      { name: "تشخيص وإصلاح الدوائر الكهربائية واللوحات الأم (Motherboard Diagnostic & Repair)", level: "متوسط", type: "دورة" },
      { name: "أساسيات ربط أجهزة الإدخال والإخراج والشبكات المحلية", level: "مبتدئ", type: "دورة" }
    ],
    enablement: [
      { name: "إدارة وصيانة خوادم وأنظمة التشغيل المشتركة (Windows Server & Linux Basics)", level: "متوسط", type: "دورة" },
      { name: "صيانة الطابعات والملحقات الشبكية المشتركة في بيئة العمل", level: "مبتدئ", type: "دورة" },
      { name: "بروتوكولات الأمان الفيزيائي وحماية الأصول التقنية للمؤسسة", level: "مبتدئ", type: "دورة" }
    ]
  },
  {
    title: "فني دعم تقني",
    englishTitle: "Technical Support Technician",
    icon: "fa-headset",
    color: "indigo",
    description: "يمثل الواجهة المباشرة لحل مشكلات المستخدمين وتوفير الدعم البرمجي والشبكي الفوري.",
    gatekeeper: [
      { name: "إدارة الخدمات الرقمية والدعم الفني المعتمد (ITIL 4 Foundation)", level: "متوسط", type: "شهادة" },
      { name: "أساسيات وهندسة شبكات الحاسب (CompTIA Network+)", level: "متوسط", type: "شهادة" },
      { name: "إدارة وتشغيل أنظمة تذاكر الدعم الفني (Helpdesk Ticketing Systems - Jira/ServiceNow)", level: "مبتدئ", type: "دورة" }
    ],
    enablement: [
      { name: "أدوات وبرمجيات الدعم الفني والتحكم عن بعد (Remote Desktop Support & Administration)", level: "مبتدئ", type: "دورة" },
      { name: "استكشاف وإصلاح مشكلات البرمجيات وأنظمة التشغيل المتقدمة للمستخدمين", level: "متوسط", type: "دورة" },
      { name: "دورة مهارات التواصل الاحترافي وإدارة تجربة المستخدم (Technical Customer Service Excellence)", level: "مبتدئ", type: "دورة" }
    ]
  }
];

const PositionRequirements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getFilteredPositions = () => {
    if (!searchQuery.trim()) return positionsData;
    const query = searchQuery.toLowerCase();

    return positionsData.filter(pos => {
      const matchTitle = pos.title.toLowerCase().includes(query) || pos.englishTitle.toLowerCase().includes(query);
      const matchDesc = pos.description.toLowerCase().includes(query);
      const matchGatekeeper = pos.gatekeeper.some(c => c.name.toLowerCase().includes(query));
      const matchEnablement = pos.enablement.some(c => c.name.toLowerCase().includes(query));

      return matchTitle || matchDesc || matchGatekeeper || matchEnablement;
    });
  };

  const getColorClasses = (color) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-50/50",
          border: "border-blue-200",
          iconBg: "bg-blue-100 text-blue-600",
          accentLine: "border-r-4 border-r-blue-500",
          badge: "bg-blue-100 text-blue-800 border-blue-200"
        };
      case "amber":
        return {
          bg: "bg-amber-50/50",
          border: "border-amber-200",
          iconBg: "bg-amber-100 text-amber-600",
          accentLine: "border-r-4 border-r-amber-500",
          badge: "bg-amber-100 text-amber-800 border-amber-200"
        };
      case "purple":
        return {
          bg: "bg-purple-50/50",
          border: "border-purple-200",
          iconBg: "bg-purple-100 text-purple-600",
          accentLine: "border-r-4 border-r-purple-500",
          badge: "bg-purple-100 text-purple-800 border-purple-200"
        };
      case "rose":
        return {
          bg: "bg-rose-50/50",
          border: "border-rose-200",
          iconBg: "bg-rose-100 text-rose-600",
          accentLine: "border-r-4 border-r-rose-500",
          badge: "bg-rose-100 text-rose-800 border-rose-200"
        };
      case "emerald":
        return {
          bg: "bg-emerald-50/50",
          border: "border-emerald-200",
          iconBg: "bg-emerald-100 text-emerald-600",
          accentLine: "border-r-4 border-r-emerald-500",
          badge: "bg-emerald-100 text-emerald-800 border-emerald-200"
        };
      case "indigo":
      default:
        return {
          bg: "bg-indigo-50/50",
          border: "border-indigo-200",
          iconBg: "bg-indigo-100 text-indigo-600",
          accentLine: "border-r-4 border-r-indigo-500",
          badge: "bg-indigo-100 text-indigo-800 border-indigo-200"
        };
    }
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case "متقدم":
        return "bg-purple-50 text-purple-600 border border-purple-200";
      case "متوسط":
        return "bg-blue-50 text-blue-600 border border-blue-200";
      case "مبتدئ":
      default:
        return "bg-slate-50 text-slate-600 border border-slate-200";
    }
  };

  const filteredPositions = getFilteredPositions();

  return (
    <div className="flex flex-col gap-6 text-right">
      
      {/* Header and Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-title font-bold text-lg text-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-book-open-reader text-blue-600"></i>
            <span>معايير ودليل الحقائب التدريبية للمناصب القياسية</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            استعرض متطلبات المنصب من الدورات الحارسة (قبل التعيين) والدورات التمكينية (أثناء العمل) للمناصب الستة المعتمدة.
          </p>
        </div>
        
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="ابحث عن منصب، دورة، أو شهادة..." 
            className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-10 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-right font-semibold text-slate-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-search absolute right-3.5 top-3.5 text-slate-400 text-sm"></i>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute left-3.5 top-3 text-slate-400 hover:text-slate-600"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Positions */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPositions.map((pos, idx) => {
          const colors = getColorClasses(pos.color);
          const isExpanded = expandedIndex === idx;

          return (
            <div 
              key={idx}
              className={`bg-white border rounded-2xl shadow-sm transition-all duration-300 overflow-hidden ${colors.accentLine} ${
                isExpanded ? 'ring-2 ring-blue-100 border-slate-300 shadow-md' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Header Section */}
              <div 
                onClick={() => toggleExpand(idx)}
                className="p-5 cursor-pointer hover:bg-slate-50/50 flex justify-between items-center transition-colors select-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg shadow-sm shrink-0 ${colors.iconBg}`}>
                    <i className={`fa-solid ${pos.icon}`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 leading-tight flex items-center gap-2">
                      <span>{pos.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({pos.englishTitle})</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-[280px] sm:max-w-md truncate">
                      {pos.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full font-bold">
                    {pos.gatekeeper.length + pos.enablement.length} دورات
                  </span>
                  <i className={`fa-solid fa-chevron-down text-slate-400 text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
                </div>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/30 p-5 space-y-6">
                  
                  {/* Gatekeeper Section */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2 justify-start">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0"></span>
                      <span className="text-rose-600 font-extrabold">دورات حارسة (Gatekeeper - تسبق المنصب):</span>
                    </h4>
                    <div className="space-y-2">
                      {pos.gatekeeper.map((course, cIdx) => (
                        <div 
                          key={cIdx} 
                          className="bg-white border border-rose-100 rounded-xl p-3 shadow-inner hover:shadow-sm transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-r-4 border-r-rose-400"
                        >
                          <div className="flex items-center gap-2.5">
                            <i className="fa-solid fa-circle-exclamation text-rose-500 text-sm shrink-0"></i>
                            <span className="text-xs font-bold text-slate-700">{course.name}</span>
                          </div>
                          
                          <div className="flex gap-1.5 self-end sm:self-auto">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${getLevelBadge(course.level)}`}>
                              {course.level}
                            </span>
                            <span className="text-[9px] font-bold bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded-full">
                              {course.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enablement Section */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2 justify-start">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                      <span className="text-blue-600 font-extrabold">دورات تمكينية (On-The-Job - تلي التعيين):</span>
                    </h4>
                    <div className="space-y-2">
                      {pos.enablement.map((course, cIdx) => (
                        <div 
                          key={cIdx} 
                          className="bg-white border border-blue-100 rounded-xl p-3 shadow-inner hover:shadow-sm transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-r-4 border-r-blue-400"
                        >
                          <div className="flex items-center gap-2.5">
                            <i className="fa-solid fa-clock-rotate-left text-blue-500 text-sm shrink-0"></i>
                            <span className="text-xs font-semibold text-slate-700">{course.name}</span>
                          </div>
                          
                          <div className="flex gap-1.5 self-end sm:self-auto">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${getLevelBadge(course.level)}`}>
                              {course.level}
                            </span>
                            <span className="text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">
                              {course.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PositionRequirements;
