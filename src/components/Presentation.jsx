import React, { useState } from 'react';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "ما هي منصة مَسَار؟",
      subtitle: "تبسيط وتوجيه التطوير المهني للموظفين التقنيين",
      icon: "fa-route text-blue-500 bg-blue-50",
      bullets: [
        {
          label: "فكرة المنصة:",
          text: "أداة ذكية تساعد المديرين ومسؤولي الموارد البشرية على معرفة مدى جاهزية الموظفين للمناصب التقنية المختلفة."
        },
        {
          label: "الهدف الأساسي:",
          text: "اختيار الشخص المناسب في المكان المناسب، وتجنب تكرار الدورات التدريبية التي لا يحتاجها الموظف."
        }
      ],
      note: "تتميز المنصة بتصميم مرن وسهل الاستخدام يدعم اتخاذ القرار بوضوح وسرعة."
    },
    {
      title: "مميزات المنصة الرئيسية",
      subtitle: "كل ما تحتاجه لإدارة وتوجيه المهارات في مكان واحد",
      icon: "fa-cubes text-indigo-500 bg-indigo-50",
      bullets: [
        {
          label: "البحث والتصفية:",
          text: "عرض الموظفين حسب الأقسام والتخصصات والمواقع الجغرافية بسهولة بالغة."
        },
        {
          label: "المقارنة الثلاثية:",
          text: "شاشة تفاعلية تقارن جاهزية الموظف في 3 مسارات تقنية مستهدفة في نفس الوقت."
        },
        {
          label: "التوصيات التلقائية:",
          text: "يقدم النظام نصائح مباشرة وذكية بناءً على مهارات الموظف لتحديد مساره الأفضل."
        },
        {
          label: "توفير التكاليف:",
          text: "حساب دقيق للأيام التدريبية والأموال الموفرة نتيجة استغلال المهارات السابقة."
        }
      ]
    },
    {
      title: "مؤشر التوافق والملاءمة الكلي",
      subtitle: "كيف يقيس المحرك الذكي ملاءمة الموظف للمنصب الجديد؟",
      icon: "fa-calculator text-emerald-500 bg-emerald-50",
      customRender: () => (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center shadow-sm w-full sm:w-auto">
              <span className="block text-[11px] text-slate-400 font-bold mb-0.5">الدورات المنجزة</span>
              <span className="text-sm font-black text-slate-700">نسبة الجاهزية</span>
            </div>
            <div className="text-xl font-bold text-slate-400">+</div>
            <div className="bg-indigo-50 border border-indigo-150 rounded-xl px-4 py-3 text-center shadow-sm w-full sm:w-auto">
              <span className="block text-[11px] text-indigo-400 font-bold mb-0.5">تطابق التخصص الدراسي</span>
              <span className="text-sm font-black text-indigo-600">علاوة تميز +20%</span>
            </div>
            <div className="text-xl font-bold text-slate-400">=</div>
            <div className="bg-emerald-50 border border-emerald-150 rounded-xl px-4 py-3 text-center shadow-sm w-full sm:w-auto">
              <span className="block text-[11px] text-emerald-500 font-bold mb-0.5">النتيجة الكلية</span>
              <span className="text-sm font-black text-emerald-600">مؤشر التوافق والملاءمة</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl flex items-start gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0"></span>
              <p className="text-xs text-emerald-800 leading-relaxed">
                <strong>اللون الأخضر:</strong> يعني أن الموظف جاهز تماماً للترقية الفورية أو شغل المنصب.
              </p>
            </div>
            <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-xl flex items-start gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0"></span>
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>اللون البرتقالي:</strong> يعني وجود فجوة تدريبية تتطلب إنجاز دورات حارسة أولاً.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "التحويل الفوري وتحليل الفجوات",
      subtitle: "تغيير المسار وأتمتة الخطة التدريبية بكفاءة عالية",
      icon: "fa-shuffle text-rose-500 bg-rose-50",
      bullets: [
        {
          label: "التحويل بضغطة زر:",
          text: "بمجرد اتخاذ القرار، يقوم النظام بنقل الموظف للمسار الجديد وتعديل سجل بياناته تلقائياً."
        },
        {
          label: "مخطط الفجوة (Gap Analysis):",
          text: "يظهر النظام الدورات المستوفاة سابقاً كتقاطع مهاري (مظللة بخط مشطوب للدلالة على التوفير المالي)، مع توضيح الدورات المتبقية التي يجب جدولتها للموظف."
        }
      ]
    },
    {
      title: "الفوائد الاستراتيجية للمنصة",
      subtitle: "استثمار أذكى للموارد التدريبية والكوادر الوطنية",
      icon: "fa-chart-pie text-blue-600 bg-blue-50",
      bullets: [
        {
          label: "استغلال الخبرات السابقة:",
          text: "الاستفادة من خلفية الموظف ومهاراته لتقليل المدة الزمنية اللازمة لتأهيله لوظيفة جديدة."
        },
        {
          label: "اكتشاف المواهب المعطلة:",
          text: "إعادة توزيع الموظفين ذوي الخلفيات التقنية والذين يعملون حالياً في مناصب إدارية بسيطة إلى الفرق الفنية مباشرة."
        },
        {
          label: "قرارات قائمة على البيانات:",
          text: "توفير رؤية واضحة للخطط التدريبية السنوية والاحتياجات الفعلية لكل قسم دون تخمين."
        }
      ]
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-[460px] text-right">
      
      {/* Slide Header */}
      <div>
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <span className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${slide.icon}`}>
              <i className={`fa-solid ${slide.title === "ما هي منصة مَسَار؟" ? 'fa-route' : 
                                      slide.title === "مميزات المنصة الرئيسية" ? 'fa-cubes' : 
                                      slide.title === "مؤشر التوافق والملاءمة الكلي" ? 'fa-calculator' : 
                                      slide.title === "التحويل الفوري وتحليل الفجوات" ? 'fa-shuffle' : 'fa-chart-pie'}`}></i>
            </span>
            <div>
              <h2 className="font-bold text-slate-800 text-lg leading-snug">{slide.title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{slide.subtitle}</p>
            </div>
          </div>
          
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
            الشريحة {currentSlide + 1} من {slides.length}
          </span>
        </div>

        {/* Slide Content Viewport */}
        <div className="py-4 min-h-[220px] transition-all duration-300">
          {slide.bullets && (
            <div className="space-y-4">
              {slide.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
                  <i className="fa-solid fa-circle-check text-blue-500 mt-1 shrink-0 text-sm"></i>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    <strong className="text-slate-900 font-bold ml-1.5">{bullet.label}</strong>
                    {bullet.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {slide.customRender && slide.customRender()}

          {slide.note && (
            <div className="bg-blue-50 border border-blue-100 text-blue-800 rounded-xl p-4 text-xs leading-relaxed mt-6 flex items-start gap-2.5">
              <i className="fa-solid fa-circle-info text-blue-500 mt-0.5"></i>
              <p>{slide.note}</p>
            </div>
          )}
        </div>
      </div>

      {/* Slide Navigation Footer */}
      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
        
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            currentSlide === 0 
              ? 'bg-slate-50 text-slate-350 border-slate-200 cursor-not-allowed' 
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
          }`}
        >
          <i className="fa-solid fa-chevron-right text-[10px]"></i>
          <span>السابق</span>
        </button>

        {/* Slide Dots Indicator */}
        <div className="flex gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentSlide === idx ? 'bg-blue-600 w-6' : 'bg-slate-200 hover:bg-slate-300'
              }`}
            ></button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            currentSlide === slides.length - 1 
              ? 'bg-slate-50 text-slate-350 border-slate-200 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-700 shadow-sm shadow-blue-500/10'
          }`}
        >
          <span>التالي</span>
          <i className="fa-solid fa-chevron-left text-[10px]"></i>
        </button>

      </div>
    </div>
  );
};

export default Presentation;
