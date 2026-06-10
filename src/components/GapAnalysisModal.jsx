import React from 'react';

const pathDetails = {
  "مسار هندسة الذكاء الاصطناعي": {
    gatekeeper: [
      "أساسيات البرمجة بلغة بايثون للذكاء الاصطناعي (Python for AI & Data Science)",
      "تحليل البيانات الإحصائية والرياضيات التطبيقية (Statistical Data Analysis & Mathematics)",
      "هندسة وتطوير النماذج السحابية (Microsoft Certified: Azure AI Engineer Associate)"
    ],
    enablement: [
      "إدارة بيئات ونماذج الذكاء الاصطناعي في الإنتاج (MLOps & Big Data Pipelines)",
      "بناء وتوجيه النماذج اللغوية الكبيرة (LLMs, Prompt Engineering & RAG Systems)",
      "ضبط وتعديل النماذج الذكية المتخصصة (Fine-tuning Pre-trained Models)"
    ]
  },
  "مسار الأمن السيبراني": {
    gatekeeper: [
      "أساسيات وهندسة شبكات الحاسب (CompTIA Network+)",
      "شهادة حماية الأنظمة المعتمدة (CompTIA Security+)",
      "شهادة الهكر الأخلاقي واختبار الاختراق المبدئي (Certified Ethical Hacker - CEH)"
    ],
    enablement: [
      "إدارة الحوادث السيبرانية والاستجابة الفورية (GIAC Certified Incident Handler - GCIH)",
      "أمن الحوسبة السحابية والمنافذ الهجينة (Certified Cloud Security Professional - CCSP)",
      "إدارة وتقييم الثغرات الأمنية للأنظمة (Vulnerabilities Assessment & Penetration Testing - VAPT)"
    ]
  },
  "مسار البرمجة": {
    gatekeeper: [
      "لغة جافا سكربت المتقدمة (Advanced JavaScript / TypeScript)",
      "تصميم قواعد البيانات والـ SQL المتقدم (Database Design & Advanced SQL Querying)",
      "معمارية برمجيات الويب وأنماط التصميم (Web Software Architecture & Design Patterns)"
    ],
    enablement: [
      "هندسة وتكامل واجهات البرمجة (RESTful APIs Integration)",
      "مبادئ وأدوات أتمتة الـ DevOps (CI/CD Pipelines using Git)",
      "منهجية إدارة المشاريع البرمجية الرشيقة (Certified Scrum Master - CSM)"
    ]
  },
  "مسار البيانات": {
    gatekeeper: [
      "تحليل وتصميم النظم الهيكلية (Systems Analysis and Design Fundamentals)",
      "هندسة واستخلاص المتطلبات (Requirements Engineering - IREB)",
      "تصميم قواعد البيانات والـ SQL المتقدم (Database Design & Advanced SQL Querying)"
    ],
    enablement: [
      "نمذجة وتوثيق عمليات الأعمال (Business Process Model and Notation - BPMN 2.0)",
      "لغة النمذجة الموحدة لتصميم النظم (Unified Modeling Language - UML)",
      "إدارة المشاريع المرنة وإطار العمل الرشيق (Agile & Scrum Product Ownership)"
    ]
  },
  "مسار فني كمبيوتر": {
    gatekeeper: [
      "صيانة الأجهزة المادية والعتاد المتقدم (CompTIA A+ Core 1 & Core 2)",
      "تشخيص وإصلاح الدوائر الكهربائية واللوحات الأم (Motherboard Diagnostic & Repair)",
      "أساسيات ربط أجهزة الإدخال والإخراج والشبكات المحلية"
    ],
    enablement: [
      "إدارة وصيانة خوادم وأنظمة التشغيل المشتركة (Windows Server & Linux Basics)",
      "صيانة الطابعات والملحقات الشبكية المشتركة في بيئة العمل",
      "بروتوكولات الأمان الفيزيائي وحماية الأصول التقنية للمؤسسة"
    ]
  },
  "مسار فني دعم تقني": {
    gatekeeper: [
      "إدارة الخدمات الرقمية والدعم الفني المعتمد (ITIL 4 Foundation)",
      "أساسيات وهندسة شبكات الحاسب (CompTIA Network+)",
      "إدارة وتشغيل أنظمة تذاكر الدعم الفني (Helpdesk Ticketing Systems - Jira/ServiceNow)"
    ],
    enablement: [
      "أدوات وبرمجيات الدعم الفني والتحكم عن بعد (Remote Desktop Support & Administration)",
      "استكشاف وإصلاح مشكلات البرمجيات وأنظمة التشغيل المتقدمة للمستخدمين",
      "دورة مهارات التواصل الاحترافي وإدارة تجربة المستخدم (Technical Customer Service Excellence)"
    ]
  }
};

const GapAnalysisModal = ({ employee, targetPath, matchedCourses = [], onClose, onSubmit }) => {
  const savedDays = matchedCourses.length * 15;
  const pathConfig = pathDetails[targetPath] || { gatekeeper: [], enablement: [] };
  
  const pendingGatekeeper = pathConfig.gatekeeper.filter(c => !employee.completedCourses.includes(c));
  const pendingEnablement = pathConfig.enablement.filter(c => !employee.completedCourses.includes(c));

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up border border-slate-200">
        
        <div className="bg-slate-50 border-b border-slate-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="font-title font-bold text-lg text-slate-800">
              تقرير تحليل الفجوة التدريبية:
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              تحويل مسار <span className="font-bold text-blue-600">{employee.fullName}</span> إلى <span className="font-bold text-emerald-600">{targetPath}</span>
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          <section>
            <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-leaf text-emerald-500"></i>
              <span>مكتسبات سابقة (تقليص الهدر التدريبي)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedCourses.length > 0 ? (
                matchedCourses.map((c, i) => (
                  <div key={i} className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex gap-3 items-center">
                    <i className="fa-solid fa-circle-check text-emerald-500"></i>
                    <span className="text-xs font-semibold text-emerald-800">{c}</span>
                  </div>
                ))
              ) : (
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex gap-3 items-center col-span-2">
                  <i className="fa-solid fa-circle-info text-slate-400"></i>
                  <span className="text-xs font-semibold text-slate-500">لا توجد مكتسبات سابقة متطابقة للمسار الجديد</span>
                </div>
              )}
            </div>
            {matchedCourses.length > 0 && (
              <p className="text-[10px] text-slate-400 mt-2">وفرنا {savedDays} يوم تدريبي بسبب التقاطعات المهارية بين المسارين.</p>
            )}
          </section>

          <section>
            <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-shield-cat text-rose-500"></i>
              <span>الدورات الحارسة المطلوبة (عاجلة قبل النقل)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pendingGatekeeper.length > 0 ? (
                pendingGatekeeper.map((c, i) => (
                  <div key={i} className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex gap-3 items-center shadow-[0_0_10px_rgba(244,63,94,0.05)]">
                    <i className="fa-solid fa-triangle-exclamation text-rose-500 shrink-0"></i>
                    <span className="text-xs font-bold text-rose-800">{c}</span>
                  </div>
                ))
              ) : (
                <div className="bg-emerald-55 border border-emerald-100 p-3 rounded-xl flex gap-3 items-center col-span-2">
                  <i className="fa-solid fa-circle-check text-emerald-500"></i>
                  <span className="text-xs font-semibold text-emerald-800">تم استيفاء جميع المتطلبات الحارسة للمسار!</span>
                </div>
              )}
            </div>
          </section>

          <section>
            <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-laptop-file text-blue-500"></i>
              <span>خطة التمكين أثناء العمل المطلوبة (On-The-Job - بعد التعيين)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pendingEnablement.length > 0 ? (
                pendingEnablement.map((c, i) => (
                  <div key={i} className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex gap-3 items-center">
                    <i className="fa-solid fa-clock text-blue-400 shrink-0"></i>
                    <span className="text-xs font-semibold text-blue-800">{c}</span>
                  </div>
                ))
              ) : (
                <div className="bg-emerald-55 border border-emerald-100 p-3 rounded-xl flex gap-3 items-center col-span-2">
                  <i className="fa-solid fa-circle-check text-emerald-500"></i>
                  <span className="text-xs font-semibold text-emerald-800">تم استيفاء جميع الدورات التمكينية!</span>
                </div>
              )}
            </div>
          </section>

        </div>

        <div className="bg-slate-50 border-t border-slate-200 p-6 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-600 bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            إلغاء الأمر
          </button>
          <button 
            onClick={onSubmit}
            className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
          >
            اعتماد وتغيير المسار
          </button>
        </div>

      </div>
    </div>
  );
};

export default GapAnalysisModal;
