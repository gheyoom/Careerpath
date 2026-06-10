export const pathsConfig = [
  {
    id: "ai",
    title: "مسار هندسة الذكاء الاصطناعي",
    specialty: "ذكاء اصطناعي",
    targetPosition: "مهندس ذكاء اصطناعي",
    required: [
      "أساسيات البرمجة بلغة بايثون للذكاء الاصطناعي (Python for AI & Data Science)",
      "تحليل البيانات الإحصائية والرياضيات التطبيقية (Statistical Data Analysis & Mathematics)",
      "هندسة وتطوير النماذج السحابية (Microsoft Certified: Azure AI Engineer Associate)",
      "إدارة بيئات ونماذج الذكاء الاصطناعي في الإنتاج (MLOps & Big Data Pipelines)",
      "بناء وتوجيه النماذج اللغوية الكبيرة (LLMs, Prompt Engineering & RAG Systems)",
      "ضبط وتعديل النماذج الذكية المتخصصة (Fine-tuning Pre-trained Models)"
    ]
  },
  {
    id: "cyber",
    title: "مسار الأمن السيبراني",
    specialty: "أمن سيبراني",
    targetPosition: "مهندس أمن سيبراني",
    required: [
      "أساسيات وهندسة شبكات الحاسب (CompTIA Network+)",
      "شهادة حماية الأنظمة المعتمدة (CompTIA Security+)",
      "شهادة الهكر الأخلاقي واختبار الاختراق المبدئي (Certified Ethical Hacker - CEH)",
      "إدارة الحوادث السيبرانية والاستجابة الفورية (GIAC Certified Incident Handler - GCIH)",
      "أمن الحوسبة السحابية والمنافذ الهجينة (Certified Cloud Security Professional - CCSP)",
      "إدارة وتقييم الثغرات الأمنية للأنظمة (Vulnerabilities Assessment & Penetration Testing - VAPT)"
    ]
  },
  {
    id: "software",
    title: "مسار البرمجة",
    specialty: "برمجة",
    targetPosition: "مبرمج",
    required: [
      "لغة جافا سكربت المتقدمة (Advanced JavaScript / TypeScript)",
      "تصميم قواعد البيانات والـ SQL المتقدم (Database Design & Advanced SQL Querying)",
      "معمارية برمجيات الويب وأنماط التصميم (Web Software Architecture & Design Patterns)",
      "هندسة وتكامل واجهات البرمجة (RESTful APIs Integration)",
      "مبادئ وأدوات أتمتة الـ DevOps (CI/CD Pipelines using Git)",
      "منهجية إدارة المشاريع البرمجية الرشيقة (Certified Scrum Master - CSM)"
    ]
  },
  {
    id: "analyst",
    title: "مسار البيانات",
    specialty: "علم بيانات",
    targetPosition: "محلل نظم",
    required: [
      "تحليل وتصميم النظم الهيكلية (Systems Analysis and Design Fundamentals)",
      "هندسة واستخلاص المتطلبات (Requirements Engineering - IREB)",
      "تصميم قواعد البيانات والـ SQL المتقدم (Database Design & Advanced SQL Querying)",
      "نمذجة وتوثيق عمليات الأعمال (Business Process Model and Notation - BPMN 2.0)",
      "لغة النمذجة الموحدة لتصميم النظم (Unified Modeling Language - UML)",
      "إدارة المشاريع المرنة وإطار العمل الرشيق (Agile & Scrum Product Ownership)"
    ]
  },
  {
    id: "computer_tech",
    title: "مسار فني كمبيوتر",
    specialty: "دعم فني",
    targetPosition: "فني كمبيوتر",
    required: [
      "صيانة الأجهزة المادية والعتاد المتقدم (CompTIA A+ Core 1 & Core 2)",
      "تشخيص وإصلاح الدوائر الكهربائية واللوحات الأم (Motherboard Diagnostic & Repair)",
      "أساسيات ربط أجهزة الإدخال والإخراج والشبكات المحلية",
      "إدارة وصيانة خوادم وأنظمة التشغيل المشتركة (Windows Server & Linux Basics)",
      "صيانة الطابعات والملحقات الشبكية المشتركة في بيئة العمل",
      "بروتوكولات الأمان الفيزيائي وحماية الأصول التقنية للمؤسسة"
    ]
  },
  {
    id: "support_tech",
    title: "مسار فني دعم تقني",
    specialty: "دعم فني",
    targetPosition: "فني دعم تقني",
    required: [
      "إدارة الخدمات الرقمية والدعم الفني المعتمد (ITIL 4 Foundation)",
      "أساسيات وهندسة شبكات الحاسب (CompTIA Network+)",
      "إدارة وتشغيل أنظمة تذاكر الدعم الفني (Helpdesk Ticketing Systems - Jira/ServiceNow)",
      "أدوات وبرمجيات الدعم الفني والتحكم عن بعد (Remote Desktop Support & Administration)",
      "استكشاف وإصلاح مشكلات البرمجيات وأنظمة التشغيل المتقدمة للمستخدمين",
      "دورة مهارات التواصل الاحترافي وإدارة تجربة المستخدم (Technical Customer Service Excellence)"
    ]
  }
];

export const pathRequirements = pathsConfig.reduce((acc, path) => {
  acc[path.title] = path.required;
  return acc;
}, {});

export const courseMetadata = {
  // الذكاء الاصطناعي
  "أساسيات البرمجة بلغة بايثون للذكاء الاصطناعي (Python for AI & Data Science)": { type: "دورة", level: "مبتدئ", score: 1 },
  "تحليل البيانات الإحصائية والرياضيات التطبيقية (Statistical Data Analysis & Mathematics)": { type: "دورة", level: "متوسط", score: 2 },
  "هندسة وتطوير النماذج السحابية (Microsoft Certified: Azure AI Engineer Associate)": { type: "شهادة", level: "متقدم", score: 3 },
  "إدارة بيئات ونماذج الذكاء الاصطناعي في الإنتاج (MLOps & Big Data Pipelines)": { type: "شهادة", level: "متقدم", score: 3 },
  "بناء وتوجيه النماذج اللغوية الكبيرة (LLMs, Prompt Engineering & RAG Systems)": { type: "شهادة", level: "متقدم", score: 3 },
  "ضبط وتعديل النماذج الذكية المتخصصة (Fine-tuning Pre-trained Models)": { type: "شهادة", level: "متقدم", score: 3 },

  // الأمن السيبراني
  "شهادة حماية الأنظمة المعتمدة (CompTIA Security+)": { type: "شهادة", level: "متوسط", score: 2 },
  "شهادة الهكر الأخلاقي واختبار الاختراق المبدئي (Certified Ethical Hacker - CEH)": { type: "شهادة", level: "متقدم", score: 3 },
  "إدارة الحوادث السيبرانية والاستجابة الفورية (GIAC Certified Incident Handler - GCIH)": { type: "شهادة", level: "متقدم", score: 3 },
  "أمن الحوسبة السحابية والمنافذ الهجينة (Certified Cloud Security Professional - CCSP)": { type: "شهادة", level: "متقدم", score: 3 },
  "إدارة وتقييم الثغرات الأمنية للأنظمة (Vulnerabilities Assessment & Penetration Testing - VAPT)": { type: "دورة", level: "متوسط", score: 2 },

  // البرمجة
  "لغة جافا سكربت المتقدمة (Advanced JavaScript / TypeScript)": { type: "دورة", level: "متوسط", score: 2 },
  "تصميم قواعد البيانات والـ SQL المتقدم (Database Design & Advanced SQL Querying)": { type: "دورة", level: "مبتدئ", score: 1 },
  "معمارية برمجيات الويب وأنماط التصميم (Web Software Architecture & Design Patterns)": { type: "شهادة", level: "متقدم", score: 3 },
  "هندسة وتكامل واجهات البرمجة (RESTful APIs Integration)": { type: "دورة", level: "متوسط", score: 2 },
  "مبادئ وأدوات أتمتة الـ DevOps (CI/CD Pipelines using Git)": { type: "دورة", level: "متوسط", score: 2 },
  "منهجية إدارة المشاريع البرمجية الرشيقة (Certified Scrum Master - CSM)": { type: "شهادة", level: "متوسط", score: 2 },

  // تحليل النظم
  "تحليل وتصميم النظم الهيكلية (Systems Analysis and Design Fundamentals)": { type: "دورة", level: "مبتدئ", score: 1 },
  "هندسة واستخلاص المتطلبات (Requirements Engineering - IREB)": { type: "دورة", level: "متوسط", score: 2 },
  "نمذجة وتوثيق عمليات الأعمال (Business Process Model and Notation - BPMN 2.0)": { type: "دورة", level: "متوسط", score: 2 },
  "لغة النمذجة الموحدة لتصميم النظم (Unified Modeling Language - UML)": { type: "دورة", level: "متوسط", score: 2 },
  "إدارة المشاريع المرنة وإطار العمل الرشيق (Agile & Scrum Product Ownership)": { type: "شهادة", level: "متقدم", score: 3 },

  // فني كمبيوتر
  "صيانة الأجهزة المادية والعتاد المتقدم (CompTIA A+ Core 1 & Core 2)": { type: "شهادة", level: "متوسط", score: 2 },
  "تشخيص وإصلاح الدوائر الكهربائية واللوحات الأم (Motherboard Diagnostic & Repair)": { type: "دورة", level: "متوسط", score: 2 },
  "أساسيات ربط أجهزة الإدخال والإخراج والشبكات المحلية": { type: "دورة", level: "مبتدئ", score: 1 },
  "إدارة وصيانة خوادم وأنظمة التشغيل المشتركة (Windows Server & Linux Basics)": { type: "دورة", level: "متوسط", score: 2 },
  "صيانة الطابعات والملحقات الشبكية المشتركة في بيئة العمل": { type: "دورة", level: "مبتدئ", score: 1 },
  "بروتوكولات الأمان الفيزيائي وحماية الأصول التقنية للمؤسسة": { type: "دورة", level: "مبتدئ", score: 1 },

  // فني دعم تقني
  "إدارة الخدمات الرقمية والدعم الفني المعتمد (ITIL 4 Foundation)": { type: "شهادة", level: "متوسط", score: 2 },
  "أساسيات وهندسة شبكات الحاسب (CompTIA Network+)": { type: "شهادة", level: "متوسط", score: 2 },
  "إدارة وتشغيل أنظمة تذاكر الدعم الفني (Helpdesk Ticketing Systems - Jira/ServiceNow)": { type: "دورة", level: "مبتدئ", score: 1 },
  "أدوات وبرمجيات الدعم الفني والتحكم عن بعد (Remote Desktop Support & Administration)": { type: "دورة", level: "مبتدئ", score: 1 },
  "استكشاف وإصلاح مشكلات البرمجيات وأنظمة التشغيل المتقدمة للمستخدمين": { type: "دورة", level: "متوسط", score: 2 },
  "دورة مهارات التواصل الاحترافي وإدارة تجربة المستخدم (Technical Customer Service Excellence)": { type: "دورة", level: "مبتدئ", score: 1 }
};

export const domains = {
  "الذكاء الاصطناعي": pathsConfig.find(p => p.id === "ai").required,
  "الأمن السيبراني": pathsConfig.find(p => p.id === "cyber").required,
  "البرمجة": pathsConfig.find(p => p.id === "software").required,
  "تحليل النظم": pathsConfig.find(p => p.id === "analyst").required,
  "الدعم الفني": [
    ...pathsConfig.find(p => p.id === "computer_tech").required,
    ...pathsConfig.find(p => p.id === "support_tech").required
  ]
};

export const allStandardCoursesList = Object.keys(courseMetadata);

export const recalculateEmployeeReadiness = (emp) => {
  if (!emp.targetPosition) return emp;
  
  // Find the assigned path
  const path = pathsConfig.find(p => p.title === emp.targetPosition || p.targetPosition === emp.targetPosition);
  
  if (!path) return emp;

  const completed = emp.completedCourses || [];
  const reqs = path.required;
  
  const satisfied = reqs.filter(r => completed.includes(r));
  const remaining = reqs.filter(r => !completed.includes(r));
  
  const score = Math.round((satisfied.length / reqs.length) * 100);

  return {
    ...emp,
    readinessScore: score,
    currentRequirements: remaining
  };
};
