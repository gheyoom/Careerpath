export const initialEmployees = [
  {
      id: 1021,
      fullName: "أحمد عبد الله المنصوري",
      specialization: "دعم فني",
      currentPosition: "فني كمبيوتر",
      currentDepartment: "قسم الدعم الفني",
      avatar: "./images/avatars/military_ahmed.png",
      readinessScore: 50,
      targetPosition: "فني دعم تقني",
      employeeType: "military",
      completedCourses: [
        "أساسيات وهندسة شبكات الحاسب (CompTIA Network+)", 
        "شهادة حماية الأنظمة المعتمدة (CompTIA Security+)"
      ],
      currentRequirements: [
        "إدارة الخدمات الرقمية والدعم الفني المعتمد (ITIL 4 Foundation)"
      ],
      nextRequirements: [
        "إدارة وتشغيل أنظمة تذاكر الدعم الفني (Helpdesk Ticketing Systems - Jira/ServiceNow)",
        "دورة مهارات التواصل الاحترافي وإدارة تجربة المستخدم (Technical Customer Service Excellence)"
      ],
      skillsInventory: {
        "دعم فني": 40,
        "أمن سيبراني": 75
      },
      hrDetails: {
        approvedTitle: "فني كمبيوتر",
        jobCategory: "الدعم الفني",
        jobField: "الدعم التقني",
        jobGroup: "الهندسة والدعم الفني",
        jobType: "الاسناد الفني",
        jobGrade: "من درجة أ-ب",
        academicField: "أمن سيبراني",
        qualification: "بكالريوس",
        location: "جبل علي"
      }
  },
  {
      id: 1045,
      fullName: "خالد سعيد السويدي",
      specialization: "ذكاء اصطناعي",
      currentPosition: "مهندس ذكاء اصطناعي",
      currentDepartment: "قسم تقنية المعلومات",
      avatar: "./images/avatars/military_male_1.png",
      readinessScore: 45,
      targetPosition: "مهندس ذكاء اصطناعي",
      employeeType: "military",
      completedCourses: [
        "صيانة الأجهزة المادية والعتاد المتقدم (CompTIA A+ Core 1 & Core 2)",
        "إدارة وصيانة خوادم وأنظمة التشغيل المشتركة (Windows Server & Linux Basics)"
      ],
      currentRequirements: [],
      nextRequirements: [
        "أساسيات البرمجة بلغة بايثون للذكاء الاصطناعي (Python for AI & Data Science)"
      ],
      skillsInventory: {
        "دعم فني": 80,
        "ذكاء اصطناعي": 15
      },
      hrDetails: {
        approvedTitle: "مهندس ذكاء اصطناعي",
        jobCategory: "تطوير البرمجيات",
        jobField: "ذكاء اصطناعي",
        jobGroup: "التطوير والابتكار",
        jobType: "الاسناد الهندسي",
        jobGrade: "من درجة ج-د",
        academicField: "علوم الكمبيوتر",
        qualification: "بكالريوس",
        location: "أبوظبي"
      }
  },
  {
      id: 1102,
      fullName: "سارة محمد المهيري",
      specialization: "برمجة",
      currentPosition: "مبرمج",
      currentDepartment: "قسم تقنية المعلومات",
      avatar: "./images/avatars/female1.png",
      readinessScore: 90,
      targetPosition: "مبرمج",
      employeeType: "civil",
      completedCourses: [
        "لغة جافا سكربت المتقدمة (Advanced JavaScript / TypeScript)",
        "تصميم قواعد البيانات والـ SQL المتقدم (Database Design & Advanced SQL Querying)",
        "معمارية برمجيات الويب وأنماط التصميم (Web Software Architecture & Design Patterns)",
        "هندسة وتكامل واجهات البرمجة (RESTful APIs Integration)",
        "مبادئ وأدوات أتمتة الـ DevOps (CI/CD Pipelines using Git)"
      ],
      currentRequirements: [],
      nextRequirements: [
        "منهجية إدارة المشاريع البرمجية الرشيقة (Certified Scrum Master - CSM)"
      ],
      skillsInventory: {
        "برمجة": 85
      },
      hrDetails: {
        approvedTitle: "مبرمج",
        jobCategory: "تطوير البرمجيات",
        jobField: "تقنية المعلومات",
        jobGroup: "التطوير والابتكار",
        jobType: "الاسناد الهندسي",
        jobGrade: "من درجة أ-ب",
        academicField: "هندسة البرمجيات",
        qualification: "بكالريوس",
        location: "أبوظبي"
      }
  },
  {
      id: 1190,
      fullName: "نورة علي المرزوقي",
      specialization: "علم بيانات",
      currentPosition: "محلل نظم",
      currentDepartment: "الكلية",
      avatar: "./images/avatars/female2.png",
      readinessScore: 35,
      targetPosition: "محلل نظم",
      employeeType: "civil",
      completedCourses: [
        "تحليل وتصميم النظم الهيكلية (Systems Analysis and Design Fundamentals)"
      ],
      currentRequirements: [
        "هندسة واستخلاص المتطلبات (Requirements Engineering - IREB)"
      ],
      nextRequirements: [
        "تصميم قواعد البيانات والـ SQL المتقدم (Database Design & Advanced SQL Querying)",
        "نمذجة وتوثيق عمليات الأعمال (Business Process Model and Notation - BPMN 2.0)"
      ],
      skillsInventory: {
        "ذكاء اصطناعي": 40
      },
      hrDetails: {
        approvedTitle: "محلل نظم",
        jobCategory: "إدارة البيانات",
        jobField: "العمليات الإدارية",
        jobGroup: "الدعم المالي والإداري",
        jobType: "الاسناد الإداري",
        jobGrade: "من درجة ج-د",
        academicField: "إدارة الأعمال",
        qualification: "دبلوم",
        location: "أبوظبي"
      }
  },
  {
      id: 1210,
      fullName: "عبد الرحمن صالح الكتبي",
      specialization: "دعم فني",
      currentPosition: "فني دعم تقني",
      currentDepartment: "قسم الدعم الفني",
      avatar: "./images/avatars/military_male_2.png",
      readinessScore: 25,
      targetPosition: "فني كمبيوتر",
      employeeType: "military",
      completedCourses: [
        "دورة مهارات التواصل الاحترافي وإدارة تجربة المستخدم (Technical Customer Service Excellence)"
      ],
      currentRequirements: [
        "صيانة الأجهزة المادية والعتاد المتقدم (CompTIA A+ Core 1 & Core 2)"
      ],
      nextRequirements: [
        "تشخيص وإصلاح الدوائر الكهربائية واللوحات الأم (Motherboard Diagnostic & Repair)"
      ],
      skillsInventory: {
        "دعم فني": 45
      },
      hrDetails: {
        approvedTitle: "فني دعم تقني",
        jobCategory: "الدعم الفني",
        jobField: "الدعم التقني",
        jobGroup: "الهندسة والدعم الفني",
        jobType: "الاسناد الفني",
        jobGrade: "من درجة أ-ب",
        academicField: "إدارة نظم المعلومات",
        qualification: "بكالريوس",
        location: "غنتوت"
      }
  },
  {
      id: 1304,
      fullName: "يوسف فهد البلوشي",
      specialization: "دعم فني",
      currentPosition: "فني دعم تقني",
      currentDepartment: "قسم الدعم الفني",
      avatar: "./images/avatars/male4.png",
      readinessScore: 90,
      targetPosition: "فني دعم تقني",
      employeeType: "civil",
      completedCourses: [
        "إدارة الخدمات الرقمية والدعم الفني المعتمد (ITIL 4 Foundation)",
        "أساسيات وهندسة شبكات الحاسب (CompTIA Network+)",
        "إدارة وتشغيل أنظمة تذاكر الدعم الفني (Helpdesk Ticketing Systems - Jira/ServiceNow)",
        "أدوات وبرمجيات الدعم الفني والتحكم عن بعد (Remote Desktop Support & Administration)",
        "استكشاف وإصلاح مشكلات البرمجيات وأنظمة التشغيل المتقدمة للمستخدمين"
      ],
      currentRequirements: [],
      nextRequirements: [
        "دورة مهارات التواصل الاحترافي وإدارة تجربة المستخدم (Technical Customer Service Excellence)"
      ],
      skillsInventory: {
        "دعم فني": 85
      },
      hrDetails: {
        approvedTitle: "فني دعم تقني",
        jobCategory: "الدعم الفني",
        jobField: "الدعم التقني",
        jobGroup: "الهندسة والدعم الفني",
        jobType: "الاسناد التقني المتقدم",
        jobGrade: "من درجة أ-ب",
        academicField: "علوم الكمبيوتر",
        qualification: "بكالريوس",
        location: "الفجيرة"
      }
  },
  {
      id: 1405,
      fullName: "عمر فهد الشامسي",
      specialization: "دعم فني",
      currentPosition: "فني كمبيوتر",
      currentDepartment: "قسم الدعم الفني",
      avatar: "./images/avatars/military_male_3.png",
      readinessScore: 0,
      targetPosition: "فني كمبيوتر",
      employeeType: "military",
      completedCourses: [],
      currentRequirements: [
        "صيانة الأجهزة المادية والعتاد المتقدم (CompTIA A+ Core 1 & Core 2)",
        "تشخيص وإصلاح الدوائر الكهربائية واللوحات الأم (Motherboard Diagnostic & Repair)"
      ],
      nextRequirements: [
        "أساسيات ربط أجهزة الإدخال والإخراج والشبكات المحلية"
      ],
      skillsInventory: {
        "دعم فني": 30
      },
      hrDetails: {
        approvedTitle: "فني كمبيوتر",
        jobCategory: "الدعم الفني",
        jobField: "الدعم التقني",
        jobGroup: "الهندسة والدعم الفني",
        jobType: "الاسناد الفني",
        jobGrade: "من درجة ج-د",
        academicField: "علوم الكمبيوتر",
        qualification: "دبلوم",
        location: "الفجيرة"
      }
  },
  {
      id: 2001,
      fullName: "ماجد بن سلطان السويدي",
      specialization: "برمجة",
      currentPosition: "مبرمج",
      currentDepartment: "قسم تقنية المعلومات",
      avatar: "./images/avatars/military_male_4.png",
      readinessScore: 80,
      targetPosition: "مبرمج",
      employeeType: "military",
      completedCourses: [
        "لغة جافا سكربت المتقدمة (Advanced JavaScript / TypeScript)",
        "تصميم قواعد البيانات والـ SQL المتقدم (Database Design & Advanced SQL Querying)",
        "هندسة وتكامل واجهات البرمجة (RESTful APIs Integration)",
        "مبادئ وأدوات أتمتة الـ DevOps (CI/CD Pipelines using Git)"
      ],
      currentRequirements: [],
      nextRequirements: [
        "معمارية برمجيات الويب وأنماط التصميم (Web Software Architecture & Design Patterns)"
      ],
      skillsInventory: {
        "برمجة": 90,
        "ذكاء اصطناعي": 50,
        "دعم فني": 30
      },
      hrDetails: {
        approvedTitle: "مبرمج",
        jobCategory: "تطوير البرمجيات",
        jobField: "تقنية المعلومات",
        jobGroup: "التطوير والابتكار",
        jobType: "الاسناد الهندسي",
        jobGrade: "من درجة أ-ب",
        academicField: "هندسة البرمجيات",
        qualification: "بكالريوس",
        location: "أبوظبي"
      }
  },
  {
      id: 2002,
      fullName: "ميثاء بنت يوسف الكتبي",
      specialization: "أمن سيبراني",
      currentPosition: "مهندس أمن سيبراني",
      currentDepartment: "المعهد",
      avatar: "./images/avatars/female1.png",
      readinessScore: 75,
      targetPosition: "مهندس أمن سيبراني",
      employeeType: "civil",
      completedCourses: [
        "أساسيات وهندسة شبكات الحاسب (CompTIA Network+)",
        "شهادة حماية الأنظمة المعتمدة (CompTIA Security+)",
        "شهادة الهكر الأخلاقي واختبار الاختراق المبدئي (Certified Ethical Hacker - CEH)",
        "إدارة الحوادث السيبرانية والاستجابة الفورية (GIAC Certified Incident Handler - GCIH)"
      ],
      currentRequirements: [],
      nextRequirements: [
        "أمن الحوسبة السحابية والمنافذ الهجينة (Certified Cloud Security Professional - CCSP)"
      ],
      skillsInventory: {
        "أمن سيبراني": 85,
        "برمجة": 65
      },
      hrDetails: {
        approvedTitle: "مهندس أمن سيبراني",
        jobCategory: "الأمن والشبكات",
        jobField: "حماية الأنظمة",
        jobGroup: "الهندسة والدعم الفني",
        jobType: "الاسناد الفني",
        jobGrade: "من درجة ج-د",
        academicField: "أمن سيبراني",
        qualification: "بكالريوس",
        location: "أبوظبي"
      }
  },
  {
      id: 2003,
      fullName: "زايد بن عبد الله الشامسي",
      specialization: "دعم فني",
      currentPosition: "محلل نظم",
      currentDepartment: "الكلية",
      avatar: "./images/avatars/male4.png",
      readinessScore: 50,
      targetPosition: "محلل نظم",
      employeeType: "civil",
      completedCourses: [
        "تصميم قواعد البيانات والـ SQL المتقدم (Database Design & Advanced SQL Querying)",
        "تحليل وتصميم النظم الهيكلية (Systems Analysis and Design Fundamentals)"
      ],
      currentRequirements: [],
      nextRequirements: [
        "إدارة الخدمات الرقمية والدعم الفني المعتمد (ITIL 4 Foundation)"
      ],
      skillsInventory: {
        "دعم فني": 80,
        "ذكاء اصطناعي": 20
      },
      hrDetails: {
        approvedTitle: "محلل نظم",
        jobCategory: "الدعم الفني",
        jobField: "العمليات الإدارية",
        jobGroup: "الدعم المالي والإداري",
        jobType: "الاسناد الإداري",
        jobGrade: "من درجة ج-د",
        academicField: "إدارة المشاريع",
        qualification: "ماجستير",
        location: "أبوظبي"
      }
  }
];

export const isHiddenItTalent = (emp) => {
  const itAcademicFields = ["أمن سيبراني", "إدارة نظم المعلومات", "علوم الكمبيوتر", "هندسة البرمجيات"];
  const nonItPositions = ["مساعد مالي وفني", "إداري عام"];
  
  const hasItAcademic = emp.hrDetails && itAcademicFields.includes(emp.hrDetails.academicField);
  const hasItCourses = emp.completedCourses && emp.completedCourses.length > 0;
  const isNonItPosition = nonItPositions.includes(emp.currentPosition) || 
                          (emp.hrDetails && nonItPositions.includes(emp.hrDetails.approvedTitle));
  
  if (hasItAcademic && hasItCourses && isNonItPosition) {
    return true;
  }

  const hasHardwareCourses = emp.completedCourses && 
    emp.completedCourses.some(c => [
      "صيانة الأجهزة المادية والعتاد المتقدم (CompTIA A+ Core 1 & Core 2)", 
      "إدارة الخدمات الرقمية والدعم الفني المعتمد (ITIL 4 Foundation)",
      "دورة مهارات التواصل الاحترافي وإدارة تجربة المستخدم (Technical Customer Service Excellence)"
    ].includes(c));
  const inSoftwareOrAiRole = emp.specialization === "برمجة" || emp.specialization === "ذكاء اصطناعي";
  
  if (hasHardwareCourses && inSoftwareOrAiRole) {
    return true;
  }

  const hasSoftwareOrAiCourses = emp.completedCourses && 
    emp.completedCourses.some(c => [
      "أساسيات البرمجة بلغة بايثون للذكاء الاصطناعي (Python for AI & Data Science)", 
      "تصميم قواعد البيانات والـ SQL المتقدم (Database Design & Advanced SQL Querying)", 
      "لغة جافا سكربت المتقدمة (Advanced JavaScript / TypeScript)", 
      "هندسة وتكامل واجهات البرمجة (RESTful APIs Integration)", 
      "هندسة وتطوير النماذج السحابية (Microsoft Certified: Azure AI Engineer Associate)"
    ].includes(c));
  const inSupportRole = emp.specialization === "دعم فني";
  
  if (hasSoftwareOrAiCourses && inSupportRole) {
    return true;
  }

  return false;
};
