export const AR_LETTERS = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي"];
export const EN_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export const diseasesData = {
  ar: {
    "أ": [
      { name: "الأنفلونزا", description: "عدوى فيروسية تصيب الجهاز التنفسي." },
      { name: "ألزهايمر", description: "اضطراب عصبي يسبب تدهور الذاكرة." },
      { name: "أنيميا", description: "نقص في كريات الدم الحمراء أو الهيموجلوبين." },
      { name: "التهاب الأذن الوسطى", description: "عدوى في الأذن الوسطى." },
      { name: "التهاب الأذن الخارجية", description: "عدوى في قناة الأذن." },
      { name: "التهاب الكبد A", description: "عدوى فيروسية حادة في الكبد." },
      { name: "التهاب الكبد B", description: "عدوى فيروسية مزمنة في الكبد." },
      { name: "التهاب الكبد C", description: "عدوى فيروسية قد تسبب تلف الكبد." },
      { name: "التهاب الكبد المناعي", description: "هجوم مناعي على خلايا الكبد." },
      { name: "أمراض القلب التاجية", description: "تضيق الشرايين المغذية للقلب." },
      { name: "أمراض صمامات القلب", description: "خلل في صمامات القلب." },
      { name: "اضطراب نظم القلب", description: "عدم انتظام ضربات القلب." },
      { name: "ارتفاع ضغط الدم", description: "زيادة مستمرة في ضغط الدم." },
      { name: "انخفاض ضغط الدم", description: "انخفاض غير طبيعي في الضغط." },
      { name: "أمراض المناعة الذاتية", description: "هجوم الجهاز المناعي على الجسم." },
      { name: "التصلب اللويحي", description: "مرض يصيب الجهاز العصبي المركزي." },
      { name: "الربو", description: "تضيق مزمن في الشعب الهوائية." },
      { name: "الالتهاب الرئوي", description: "عدوى تصيب الرئتين." },
      { name: "الانسداد الرئوي المزمن", description: "ضعف مزمن في تدفق الهواء للرئتين." },
      { name: "الإمساك المزمن", description: "صعوبة مستمرة في الإخراج." },
      { name: "الإسهال المزمن", description: "حالات متكررة من الإسهال." },
      { name: "الارتجاع المريئي", description: "عودة حمض المعدة للمريء." },
      { name: "أمراض المعدة", description: "اضطرابات عامة في المعدة." },
      { name: "قرحة المعدة", description: "تآكل في جدار المعدة." },
      { name: "التهاب المعدة", description: "التهاب بطانة المعدة." },
      { name: "أمراض الكلى المزمنة", description: "تدهور تدريجي في وظائف الكلى." },
      { name: "أكياس الكلى", description: "تكون أكياس داخل الكلى." },
      { name: "الفشل الكلوي", description: "توقف وظائف الكلى." },
      { name: "أورام الكلى", description: "نمو غير طبيعي في الكلى." },
      { name: "أورام الكبد", description: "نمو غير طبيعي في الكبد." },
      { name: "أورام الدماغ", description: "كتل في الجهاز العصبي المركزي." },
      { name: "أمراض الغدة الدرقية", description: "خلل في إفراز هرمونات الغدة." },
      { name: "أمراض الغدة الكظرية", description: "اضطراب هرمونات الغدة الكظرية." },
      { name: "ألم الأعصاب", description: "ألم ناتج عن تلف الأعصاب." },
      { name: "اضطرابات الأعصاب", description: "مشاكل في الجهاز العصبي." },
      { name: "أمراض الدم الوراثية", description: "اضطرابات وراثية في الدم." },
      { name: "اضطرابات الدم", description: "خلل في مكونات الدم." },
      { name: "أمراض العظام", description: "اضطرابات في الهيكل العظمي." },
      { name: "هشاشة العظام", description: "ضعف كثافة العظام." },
      { name: "التهاب المفاصل", description: "التهاب يسبب ألم المفاصل." },
      { name: "أمراض الجلد", description: "اضطرابات جلدية مختلفة." },
      { name: "الأكزيما", description: "التهاب جلدي مزمن." },
      { name: "الصدفية", description: "مرض جلدي مناعي." },
      { name: "أمراض العيون", description: "اضطرابات في العين." },
      { name: "التهاب الملتحمة", description: "عدوى في العين." },
      { name: "أمراض الجهاز العصبي", description: "اضطرابات المخ والأعصاب." }
    ],
    "ب": [
      { name: "البواسير", description: "تضخم أوردة المستقيم." },
      { name: "البهاق", description: "فقدان صبغة الجلد." },
      { name: "التهاب الشعب الهوائية", description: "التهاب الممرات الهوائية." },
      { name: "التهاب البروستاتا", description: "التهاب غدة البروستاتا." },
      { name: "انسداد الأمعاء", description: "توقف حركة الأمعاء." },
      { name: "بكتيريا المعدة", description: "جرثومة المعدة." },
      { name: "برد مزمن", description: "نزلات برد متكررة." },
      { name: "بحة الصوت", description: "ضعف أو تغير الصوت." },

      { name: "التهاب بطانة الرحم", description: "نمو أنسجة الرحم خارج مكانها." },
      { name: "التهاب البنكرياس", description: "التهاب غدة البنكرياس." },
      { name: "بطء ضربات القلب", description: "انخفاض معدل نبض القلب." },
      { name: "ارتفاع ضغط الدم الحملي", description: "ضغط أثناء الحمل." },
      { name: "بقع جلدية فطرية", description: "عدوى فطرية بالجلد." },
      { name: "بروز الغضروف", description: "انزلاق غضروفي." },
      { name: "بتر الأطراف", description: "فقدان جزء من الجسم." },
      { name: "اضطرابات بلع", description: "صعوبة في البلع." },
      { name: "تسمم بكتيري", description: "عدوى بكتيرية شديدة." },
      { name: "التهاب بصيلات الشعر", description: "عدوى في جذور الشعر." },
      { name: "بقع دماغية", description: "تلف في أنسجة المخ." }
    ],

    "ت": [
      { name: "التوحد", description: "اضطراب نمائي عصبي." },
      { name: "تصلب الشرايين", description: "تراكم الدهون." },
      { name: "تليف الكبد", description: "تلف مزمن في الكبد." },
      { name: "تسمم غذائي", description: "تناول طعام ملوث." },
      { name: "التهاب اللوز", description: "عدوى الحلق." },
      { name: "التهاب الأعصاب", description: "التهاب الجهاز العصبي." },
      { name: "التهاب القولون", description: "التهاب الأمعاء." },
      { name: "التهاب المفاصل", description: "ألم المفاصل." },
      { name: "التهاب الرئة", description: "عدوى الرئة." },
      { name: "تضخم القلب", description: "زيادة حجم القلب." },
      { name: "تسمم دموي", description: "عدوى في الدم." }
    ],

    "ث": [
      { name: "الثلاسيميا", description: "مرض دم وراثي." },
      { name: "الثعلبة", description: "تساقط الشعر المناعي." },
      { name: "ثقب القلب", description: "عيب خلقي في القلب." },
      { name: "ثآليل الجلد", description: "زوائد جلدية فيروسية." },
      { name: "ثقل التنفس", description: "صعوبة في التنفس." }
    ],

    "ج": [
      { name: "الجرب", description: "عدوى جلدية تسبب حكة شديدة." },
      { name: "الجدري المائي", description: "طفح جلدي فيروسي." },
      { name: "جلطة دماغية", description: "انسداد في شرايين الدماغ." },
      { name: "جرثومة المعدة", description: "بكتيريا في المعدة." },
      { name: "التهاب القولون", description: "التهاب الأمعاء الغليظة." },
      { name: "جفاف الجلد", description: "نقص ترطيب الجلد." },
      { name: "جفاف العين", description: "قلة إفراز الدموع." },
      { name: "جلطة قلبية", description: "انسداد شريان القلب." },
      { name: "جذام", description: "مرض بكتيري مزمن." }
    ],

    "ح": [
      { name: "الحصبة", description: "عدوى فيروسية شديدة العدوى." },
      { name: "الحمى التيفودية", description: "عدوى بكتيرية تسبب حمى." },
      { name: "حصى الكلى", description: "ترسبات صلبة في الكلى." },
      { name: "حساسية الصدر", description: "تضيق الشعب الهوائية." },
      { name: "حساسية الأنف", description: "التهاب تحسسي في الأنف." },
      { name: "حموضة المعدة", description: "زيادة حمض المعدة." },
      { name: "حروق الجلد", description: "تلف الجلد نتيجة الحرارة." },
      { name: "حصار القلب", description: "اضطراب في كهرباء القلب." },
      { name: "التهاب الكبد الحاد", description: "عدوى مفاجئة في الكبد." },
      { name: "حالة إغماء", description: "فقدان مؤقت للوعي." }
    ],

    "خ": [
      { name: "الخناق", description: "عدوى تسبب صعوبة التنفس." },
      { name: "خشونة المفاصل", description: "تآكل الغضاريف." },
      { name: "خراج الأسنان", description: "تجمع صديد في الأسنان." },
      { name: "خفقان القلب", description: "زيادة أو اضطراب ضربات القلب." },
      { name: "خدر الأطراف", description: "فقدان الإحساس." },
      { name: "خلل الغدة الدرقية", description: "اضطراب هرموني." },
      { name: "خراج جلدي", description: "تجمع صديد تحت الجلد." },
      { name: "خمول الغدة الدرقية", description: "بطء نشاط الغدة." },
      { name: "التهاب الجيوب الأنفية", description: "التهاب تجاويف الأنف." },
      { name: "خلل عصبي", description: "اضطراب في الأعصاب." }
    ],

    "د": [
      { name: "الدوالي", description: "توسع الأوردة." },
      { name: "السكري", description: "ارتفاع السكر في الدم." },
      { name: "دوار", description: "دوخة وعدم اتزان." },
      { name: "التهاب الجلد", description: "تهيج الجلد." },
      { name: "ضمور العضلات", description: "ضعف تدريجي في العضلات." },
      { name: "داء الكبد الدهني", description: "تراكم الدهون في الكبد." },
      { name: "ضغط الدم المنخفض", description: "انخفاض ضغط الدم." },
      { name: "دوار الحركة", description: "دوخة أثناء السفر." },
      { name: "داء المفاصل", description: "التهاب المفاصل." },
      { name: "تليف الرئة", description: "تندب أنسجة الرئة." }
    ],

    "ذ": [
      { name: "الذئبة الحمراء", description: "مرض مناعي مزمن." },
      { name: "ذبحة صدرية", description: "ألم في الصدر." },
      { name: "ذهان", description: "اضطراب نفسي شديد." },
      { name: "ذبول عام", description: "ضعف شديد في الجسم." },
      { name: "ذمة رئوية", description: "تجمع سوائل في الرئة." },
      { name: "ذعر مرضي", description: "نوبات خوف شديدة." },
      { name: "ذيفان بكتيري", description: "سموم بكتيرية." },
      { name: "ذبحات قلبية", description: "نقص تدفق الدم للقلب." },
      { name: "ذوبان العظام", description: "هشاشة شديدة." }
    ],

    "ر": [
      { name: "الروماتويد", description: "التهاب مفاصل مناعي." },
      { name: "الربو", description: "ضيق مزمن في الشعب الهوائية." },
      { name: "رعاف", description: "نزيف من الأنف." },
      { name: "رمد العين", description: "التهاب العين." },
      { name: "ارتجاع المريء", description: "عودة حمض المعدة." },
      { name: "رعشة", description: "اهتزاز غير إرادي." },
      { name: "رهاب اجتماعي", description: "خوف من التفاعل الاجتماعي." },
      { name: "روماتيزم القلب", description: "تأثر القلب بالتهاب." },
      { name: "رشح مزمن", description: "التهاب أنفي مستمر." },
      { name: "التهاب الشعب الهوائية", description: "عدوى في الشعب الهوائية." }
    ],

    "ز": [
      { name: "الزهايمر", description: "اضطراب عصبي يسبب فقدان الذاكرة." },
      { name: "الزكام", description: "عدوى فيروسية خفيفة." },
      { name: "زغللة العين", description: "تشوش مؤقت في الرؤية." },
      { name: "زلال البول", description: "وجود بروتين في البول." },
      { name: "زيادة الكوليسترول", description: "ارتفاع الدهون في الدم." },
      { name: "زائدة دودية", description: "التهاب الزائدة." },
      { name: "زرقة الجلد", description: "نقص الأكسجين في الدم." },
      { name: "التهاب الأوعية الدموية", description: "التهاب في الأوعية." },
      { name: "ارتفاع ضغط العين", description: "قد يؤدي للجلوكوما." }
    ],
    "س": [
      { name: "السكري", description: "ارتفاع السكر في الدم." },
      { name: "السكتة الدماغية", description: "انقطاع الدم عن المخ." },
      { name: "سرطان الدم", description: "لوكيميا." },
      { name: "سرطان الثدي", description: "ورم خبيث في الثدي." },
      { name: "سرطان الرئة", description: "ورم خبيث في الرئة." },
      { name: "سرطان المعدة", description: "ورم في المعدة." },
      { name: "السعال الديكي", description: "عدوى تنفسية شديدة." },
      { name: "سلس البول", description: "فقدان التحكم في البول." },
      { name: "سمنة مفرطة", description: "زيادة الوزن الشديدة." },
      { name: "سل رئوي", description: "عدوى بكتيرية في الرئة." },
      { name: "التهاب الجيوب الأنفية", description: "التهاب تجاويف الأنف." },
      { name: "سوء تغذية", description: "نقص العناصر الغذائية." },
      { name: "التهاب الأعصاب", description: "التهاب الجهاز العصبي." },
      { name: "سوء امتصاص", description: "ضعف امتصاص الغذاء." }
    ],

    "ش": [
      { name: "الشقيقة", description: "صداع نصفي شديد." },
      { name: "شلل رعاش", description: "اضطراب حركي عصبي." },
      { name: "شلل نصفي", description: "فقدان حركة نصف الجسم." },
      { name: "شلل الأطفال", description: "فيروس يسبب الشلل." },
      { name: "شخير", description: "اضطراب التنفس أثناء النوم." },
      { name: "شرخ شرجي", description: "تمزق في منطقة الشرج." },
      { name: "شوكة عظمية", description: "نمو عظمي زائد." },
      { name: "شحوب الدم", description: "نقص الحديد." },
      { name: "شدة القلق", description: "اضطراب نفسي." },
      { name: "التهاب الجلد التحسسي", description: "حساسية جلدية." }
    ],

    "ص": [
      { name: "الصدفية", description: "مرض جلدي مناعي." },
      { name: "الصداع", description: "ألم في الرأس." },
      { name: "صداع نصفي", description: "ألم شديد في الرأس." },
      { name: "صعوبة التنفس", description: "نقص دخول الهواء." },
      { name: "صفار العين", description: "ارتفاع البيليروبين." },
      { name: "صمم", description: "فقدان السمع." },
      { name: "صلابة العضلات", description: "تيبس العضلات." },
      { name: "صعوبة البلع", description: "مشاكل في البلع." },
      { name: "صديد اللوز", description: "التهاب اللوز." },
      { name: "صفير الصدر", description: "علامة ربو." }
    ],

    "ض": [
      { name: "ضغط الدم المرتفع", description: "ارتفاع ضغط الدم." },
      { name: "ضغط منخفض", description: "انخفاض ضغط الدم." },
      { name: "ضعف المناعة", description: "قلة مقاومة الأمراض." },
      { name: "ضيق التنفس", description: "صعوبة في التنفس." },
      { name: "ضمور العضلات", description: "ضعف العضلات." },
      { name: "ضرر الأعصاب", description: "تلف الأعصاب." },
      { name: "ضعف البصر", description: "انخفاض الرؤية." },
      { name: "ضمور المخ", description: "تلف أنسجة الدماغ." },
      { name: "ضغط نفسي", description: "توتر شديد." },
      { name: "ضرر الكبد", description: "تلف الكبد." }
    ],

    "ط": [
      { name: "طنين الأذن", description: "صوت داخل الأذن." },
      { name: "طفح جلدي", description: "بقع جلدية." },
      { name: "طفيليات الأمعاء", description: "عدوى طفيلية." },
      { name: "طول النظر", description: "ضعف رؤية القريب." },
      { name: "طراوة العظام", description: "ضعف العظام." },
      { name: "طاعون", description: "عدوى بكتيرية خطيرة." },
      { name: "طفيليات الدم", description: "كائنات في الدم." },
      { name: "طول غير طبيعي", description: "اضطراب هرموني." },
      { name: "طيف التوحد", description: "اضطراب نمائي." },
      { name: "التهاب الأذن الداخلية", description: "التهاب جهاز التوازن." }
    ],

    "ظ": [
      { name: "ظفر نامٍ", description: "نمو الظفر داخل الجلد." },
      { name: "ظلام العين", description: "ضعف شديد في الرؤية." },
      { name: "ضغط العين", description: "ارتفاع ضغط العين." },
      { name: "ظاهرة رينود", description: "ضعف تدفق الدم للأطراف." },
      { name: "ظفر مصاب", description: "عدوى في الظفر." },
      { name: "ظلال الرئة", description: "تغيرات في الأشعة." },
      { name: "ظاهرة دوخة", description: "إحساس بالدوار." }
    ],

    "ع": [
      { name: "العقم", description: "عدم القدرة على الإنجاب." },
      { name: "عسر الهضم", description: "صعوبة الهضم." },
      { name: "عرق النسا", description: "ألم العصب الوركي." },
      { name: "عمى الألوان", description: "عدم تمييز الألوان." },
      { name: "التهاب العين", description: "عدوى العين." },
      { name: "عجز الكبد", description: "فشل الكبد." },
      { name: "عطش مفرط", description: "زيادة العطش." },
      { name: "عسر التنفس", description: "صعوبة التنفس." },
      { name: "عصبية زائدة", description: "توتر عصبي." },
      { name: "عرج", description: "صعوبة المشي." }
    ],

    "غ": [
      { name: "قصور الغدة الدرقية", description: "بطء نشاط الغدة." },
      { name: "فرط نشاط الغدة", description: "زيادة الهرمونات." },
      { name: "غيبوبة", description: "فقدان وعي كامل." },
      { name: "غثيان", description: "إحساس بالقئ." },
      { name: "غدة ليمفاوية", description: "تورم الغدد." },
      { name: "غشاوة العين", description: "تشوش الرؤية." },
      { name: "غليان الدم", description: "ارتفاع حرارة الجسم." },
      { name: "غيبوبة سكر", description: "فقدان وعي بسبب السكر." },
      { name: "غضروف متهتك", description: "تلف الغضاريف." },
      { name: "غزو بكتيري", description: "عدوى شديدة." }
    ],

    "ف": [
      { name: "فقر الدم", description: "نقص الهيموجلوبين." },
      { name: "فشل كلوي", description: "توقف الكلى." },
      { name: "فشل كبدي", description: "تلف الكبد." },
      { name: "فطريات الجلد", description: "عدوى فطرية." },
      { name: "فقدان السمع", description: "ضعف السمع." },
      { name: "فقدان الشهية", description: "نقص الأكل." },
      { name: "فشل تنفسي", description: "توقف التنفس." },
      { name: "فيروس الكبد", description: "عدوى فيروسية." },
      { name: "فقر دم حاد", description: "نقص شديد في الدم." },
      { name: "فزع ليلي", description: "خوف أثناء النوم." }
    ],

    "ق": [
      { name: "قرحة المعدة", description: "تآكل جدار المعدة." },
      { name: "قولون عصبي", description: "اضطراب القولون." },
      { name: "قصر النظر", description: "ضعف الرؤية البعيدة." },
      { name: "قلب ضعيف", description: "ضعف عضلة القلب." },
      { name: "قشعريرة", description: "ارتعاش الجسم." },
      { name: "قلب غير منتظم", description: "اضطراب ضربات القلب." },
      { name: "قلق مزمن", description: "اضطراب نفسي." },
      { name: "قئ مستمر", description: "ترجيع متكرر." },
      { name: "قروح جلدية", description: "تآكل الجلد." },
      { name: "قصر القامة", description: "نمو غير طبيعي." }
    ],
    "ك": [
      { name: "التهاب الكبد", description: "عدوى تصيب الكبد." },
      { name: "كورونا", description: "فيروس تنفسي." },
      { name: "كسر العظام", description: "انكسار العظام." },
      { name: "كبد دهني", description: "تراكم الدهون في الكبد." },
      { name: "كوليرا", description: "عدوى معوية خطيرة." },
      { name: "كلى مزمنة", description: "تدهور وظائف الكلى." },
      { name: "التهاب الكلى", description: "عدوى الكلى." },
      { name: "حصى الكلى", description: "ترسبات داخل الكلى." },
      { name: "سرطان الكبد", description: "ورم خبيث في الكبد." },
      { name: "سرطان الكلى", description: "ورم في الكلى." },
      { name: "كسل الغدة الدرقية", description: "بطء إفراز الهرمون." },
      { name: "كدمات", description: "نزيف تحت الجلد." }
    ],

    "ل": [
      { name: "اللوكيميا", description: "سرطان الدم." },
      { name: "التهاب الرئة", description: "عدوى الرئة." },
      { name: "لوز ملتهبة", description: "التهاب اللوز." },
      { name: "ليونة العظام", description: "ضعف العظام." },
      { name: "التهاب لمفاوي", description: "تورم الغدد." },
      { name: "لثة ملتهبة", description: "التهاب اللثة." },
      { name: "لزوجة الدم", description: "زيادة كثافة الدم." },
      { name: "لسعة حشرات", description: "تفاعل جلدي." },
      { name: "لفحة شمس", description: "حروق الشمس." },
      { name: "لخبطة هرمونات", description: "اضطراب هرموني." }
    ],

    "م": [
      { name: "الملاريا", description: "مرض طفيلي ينتقل عبر البعوض." },
      { name: "مرض السكري", description: "ارتفاع مزمن في السكر." },
      { name: "مرض القلب التاجي", description: "تضيق شرايين القلب." },
      { name: "التصلب المتعدد", description: "مرض عصبي مناعي." },
      { name: "التهاب السحايا", description: "التهاب أغشية الدماغ." },
      { name: "متلازمة القولون العصبي", description: "اضطراب في الجهاز الهضمي." },
      { name: "متلازمة داون", description: "اضطراب جيني." },
      { name: "مرض باركنسون", description: "اضطراب عصبي حركي." },
      { name: "مرض الزهايمر", description: "فقدان الذاكرة التدريجي." },
      { name: "مرض كرون", description: "التهاب مزمن بالأمعاء." },
      { name: "التهاب المعدة", description: "التهاب بطانة المعدة." },
      { name: "قرحة المعدة", description: "تآكل جدار المعدة." },
      { name: "انسداد معوي", description: "توقف حركة الأمعاء." },
      { name: "التهاب المثانة", description: "عدوى في المثانة." },
      { name: "حصى المرارة", description: "تكوّن حصوات في المرارة." },
      { name: "متلازمة تكيس المبايض", description: "اضطراب هرموني." },
      { name: "التهاب عضلة القلب", description: "التهاب القلب." },
      { name: "ضمور العضلات", description: "ضعف العضلات." },
      { name: "التهاب المفاصل الروماتويدي", description: "مرض مناعي بالمفاصل." },
      { name: "التهاب الرئة", description: "عدوى في الرئة." },
      { name: "ميكروب المعدة", description: "جرثومة المعدة." }
    ],

    "ن": [
      { name: "النقرس", description: "ترسب حمض اليوريك." },
      { name: "نزيف", description: "فقدان دم." },
      { name: "نوبات صرع", description: "تشنجات عصبية." },
      { name: "نقص فيتامين", description: "نقص عناصر غذائية." },
      { name: "نحافة مفرطة", description: "نقص وزن." },
      { name: "نخر الأسنان", description: "تسوس شديد." },
      { name: "نوبات قلق", description: "اضطراب نفسي." },
      { name: "نزلة برد", description: "عدوى خفيفة." },
      { name: "نقص مناعة", description: "ضعف الجهاز المناعي." },
      { name: "إغماء متكرر", description: "فقدان وعي." }
    ],

    "هـ": [
      { name: "الهربس", description: "عدوى فيروسية." },
      { name: "هشاشة العظام", description: "ضعف العظام." },
      { name: "هبوط ضغط", description: "انخفاض الضغط." },
      { name: "هلع", description: "نوبات خوف." },
      { name: "هيموفيليا", description: "اضطراب تجلط الدم." },
      { name: "هوس", description: "اضطراب نفسي." },
      { name: "هبوط سكر", description: "انخفاض السكر." },
      { name: "هالات سوداء", description: "اسمرار العين." },
      { name: "هرمونات مضطربة", description: "خلل هرموني." }
    ],

    "و": [
      { name: "اليرقان", description: "اصفرار الجلد." },
      { name: "وسواس قهري", description: "أفكار متكررة." },
      { name: "ورم", description: "نمو غير طبيعي." },
      { name: "وهن عضلي", description: "ضعف العضلات." },
      { name: "وذمة", description: "تجمع سوائل." },
      { name: "ورم خبيث", description: "سرطان." },
      { name: "ورم حميد", description: "غير سرطاني." },
      { name: "وسواس صحي", description: "قلق مرضي." },
      { name: "وهن عام", description: "ضعف الجسم." }
    ],

    "ي": [
      { name: "يرقان وراثي", description: "اضطراب الكبد." },
      { name: "يرقان حديثي الولادة", description: "اصفرار الرضع." },
      { name: "يبوست", description: "إمساك شديد." },
      { name: "يبوسة المفاصل", description: "تيبس المفاصل." },
      { name: "يأس مرضي", description: "اكتئاب شديد." },
      { name: "ضعف مناعي", description: "نقص المناعة." },
      { name: "التهاب مزمن", description: "التهاب طويل الأمد." },
      { name: "إرهاق مزمن", description: "تعب مستمر." },
      { name: "ألم مزمن", description: "ألم طويل الأمد." },
      { name: "اضطراب بصري", description: "ضعف الرؤية." }
    ]
  },
  en: {

    "A": [
      { name: "Asthma", description: "Chronic airway inflammation causing breathing difficulty." },
      { name: "Anemia", description: "Low red blood cells or hemoglobin." },
      { name: "Alzheimer's disease", description: "Progressive memory loss disorder." },
      { name: "Arthritis", description: "Inflammation of joints causing pain and stiffness." },
      { name: "Appendicitis", description: "Inflammation of the appendix." },
      { name: "Arrhythmia", description: "Irregular heartbeat." },
      { name: "Acne", description: "Skin condition causing pimples." },
      { name: "Allergic rhinitis", description: "Allergy causing sneezing and nasal inflammation." },
      { name: "Atherosclerosis", description: "Hardening of arteries due to plaque buildup." },
      { name: "Anxiety disorder", description: "Excessive fear and worry affecting daily life." },
      { name: "Acid reflux (GERD)", description: "Stomach acid flowing back into esophagus." },
      { name: "Autoimmune disease", description: "Immune system attacks the body’s own tissues." },
      { name: "Alopecia", description: "Hair loss condition." },
      { name: "Astigmatism", description: "Vision problem due to irregular cornea shape." },
      { name: "Aortic aneurysm", description: "Abnormal bulging of the aorta wall." },
      { name: "Abscess", description: "Pus-filled infection in body tissue." },
      { name: "Addison's disease", description: "Adrenal gland insufficiency." },
      { name: "Amyloidosis", description: "Abnormal protein buildup in organs." },
      { name: "Anorexia nervosa", description: "Eating disorder causing extreme weight loss." },
      { name: "Acromegaly", description: "Excess growth hormone causing enlarged bones." }
    ],

    " B ": [
      { name: "Bronchitis", description: "Inflammation of bronchial tubes causing cough and mucus." },
      { name: "Brain tumor", description: "Abnormal growth of cells in the brain." },
      { name: "Breast cancer", description: "Cancer that forms in breast tissue." },
      { name: "Bipolar disorder", description: "Mental disorder causing extreme mood swings." },
      { name: "Back pain", description: "Pain in the lower or upper back region." },
      { name: "Bladder infection", description: "Bacterial infection in the urinary bladder." },
      { name: "Bone fracture", description: "Break or crack in a bone." },
      { name: "Bell's palsy", description: "Temporary facial muscle paralysis." },
      { name: "Blood infection (Sepsis)", description: "Life-threatening infection spreading through the blood." },
      { name: "Bronchial asthma", description: "Chronic condition causing airway narrowing." },
      { name: "Bronchiectasis", description: "Permanent widening of parts of the airways." },
      { name: "Bacterial pneumonia", description: "Lung infection caused by bacteria." },
      { name: "Benign tumor", description: "Non-cancerous growth in the body." },
      { name: "Barrett's esophagus", description: "Damage to esophagus lining due to acid reflux." },
      { name: "Bradycardia", description: "Abnormally slow heart rate." },
      { name: "Bursitis", description: "Inflammation of fluid-filled sacs in joints." },
      { name: "Bleeding disorder (Hemophilia)", description: "Blood fails to clot properly." },
      { name: "Burns", description: "Tissue damage caused by heat or chemicals." },
      { name: "Bowel obstruction", description: "Blockage in the intestines." },
      { name: "Botulism", description: "Rare but serious bacterial toxin poisoning." }
    ],

    "C": [
      { name: "Cancer", description: "Uncontrolled growth of abnormal cells in the body." },
      { name: "COVID-19", description: "Respiratory viral infection caused by coronavirus." },
      { name: "Cholera", description: "Severe bacterial infection causing diarrhea and dehydration." },
      { name: "Cirrhosis", description: "Severe scarring of the liver." },
      { name: "Cataract", description: "Clouding of the eye lens causing vision loss." },
      { name: "Crohn's disease", description: "Chronic inflammatory bowel disease." },
      { name: "Colitis", description: "Inflammation of the colon." },
      { name: "Cystic fibrosis", description: "Genetic disorder affecting lungs and digestion." },
      { name: "Celiac disease", description: "Immune reaction to gluten damaging intestine." },
      { name: "Cellulitis", description: "Bacterial skin infection." }
    ],

    "D": [
      { name: "Diabetes mellitus", description: "High blood sugar due to insulin problems." },
      { name: "Depression", description: "Mood disorder causing persistent sadness." },
      { name: "Dengue fever", description: "Mosquito-borne viral disease." },
      { name: "Dementia", description: "Memory and cognitive decline." },
      { name: "Dermatitis", description: "Inflammation of the skin." },
      { name: "Dehydration", description: "Loss of body fluids." },
      { name: "Deep vein thrombosis", description: "Blood clot in deep veins." },
      { name: "Down syndrome", description: "Genetic chromosomal disorder." },
      { name: "Dysentery", description: "Intestinal infection causing severe diarrhea." },
      { name: "Dyslexia", description: "Learning disorder affecting reading." }
    ],

    "E": [
      { name: "Epilepsy", description: "Neurological disorder causing seizures." },
      { name: "Emphysema", description: "Chronic lung disease damaging air sacs." },
      { name: "Endometriosis", description: "Uterine tissue growing outside uterus." },
      { name: "Encephalitis", description: "Brain inflammation." },
      { name: "Eczema", description: "Skin condition causing itching and rash." },
      { name: "Endocarditis", description: "Infection of heart lining." },
      { name: "Esophagitis", description: "Inflammation of esophagus." },
      { name: "Erectile dysfunction", description: "Difficulty achieving erection." }
    ],

    "F": [
      { name: "Fibromyalgia", description: "Chronic widespread pain disorder." },
      { name: "Fatty liver disease", description: "Fat buildup in liver." },
      { name: "Fracture", description: "Broken bone." },
      { name: "Food poisoning", description: "Illness from contaminated food." },
      { name: "Fungal infection", description: "Infection caused by fungi." },
      { name: "Frostbite", description: "Tissue damage from extreme cold." }
    ],

    "G": [
      { name: "Gastritis", description: "Inflammation of stomach lining." },
      { name: "Gallstones", description: "Solid deposits in gallbladder." },
      { name: "Glaucoma", description: "Damage to optic nerve affecting vision." },
      { name: "Gout", description: "Arthritis caused by uric acid crystals." },
      { name: "Gangrene", description: "Death of body tissue due to lack of blood flow." },
      { name: "Gingivitis", description: "Inflammation of gums." },
      { name: "Gastroenteritis", description: "Stomach and intestinal infection." },
      { name: "Genital herpes", description: "Sexually transmitted viral infection." }
    ],

    "H": [
      { name: "Hypertension", description: "High blood pressure." },
      { name: "Hepatitis", description: "Liver inflammation." },
      { name: "Heart attack", description: "Blocked blood flow to heart." },
      { name: "Heart failure", description: "Weak heart pumping." },
      { name: "HIV/AIDS", description: "Immune system viral disease." },
      { name: "Hemophilia", description: "Blood clotting disorder." },
      { name: "Hernia", description: "Organ pushing through muscle wall." },
      { name: "Hyperthyroidism", description: "Overactive thyroid gland." },
      { name: "Hypothyroidism", description: "Underactive thyroid gland." }
    ],

    "I": [
      { name: "Influenza", description: "Flu viral infection." },
      { name: "Insomnia", description: "Sleep disorder." },
      { name: "Irritable bowel syndrome", description: "Digestive disorder." },
      { name: "Iron deficiency anemia", description: "Low iron in blood." },
      { name: "Ischemic heart disease", description: "Reduced blood flow to heart." },
      { name: "Impetigo", description: "Contagious skin infection." }
    ],

    "J": [
      { name: "Jaundice", description: "Yellowing of skin and eyes." },
      { name: "Juvenile arthritis", description: "Arthritis in children." },
      { name: "Jaw dislocation", description: "Jaw joint out of place." }
    ],

    "K": [
      { name: "Kidney stones", description: "Hard deposits in kidneys." },
      { name: "Kidney failure", description: "Loss of kidney function." },
      { name: "Kawasaki disease", description: "Blood vessel inflammation in children." },
      { name: "Knee osteoarthritis", description: "Degeneration of knee joint." }
    ],

    "L": [
      { name: "Leukemia", description: "Blood cancer." },
      { name: "Lung cancer", description: "Cancer of lungs." },
      { name: "Liver cirrhosis", description: "Severe liver scarring." },
      { name: "Lupus", description: "Autoimmune disease." },
      { name: "Lyme disease", description: "Tick-borne bacterial infection." },
      { name: "Lymphoma", description: "Cancer of lymph system." }
    ],

    "M": [
      { name: "Malaria", description: "Mosquito-borne parasitic disease." },
      { name: "Migraine", description: "Severe recurring headache." },
      { name: "Measles", description: "Highly contagious viral infection." },
      { name: "Meningitis", description: "Brain and spinal cord inflammation." },
      { name: "Multiple sclerosis", description: "Autoimmune nervous system disease." },
      { name: "Muscular dystrophy", description: "Progressive muscle weakness disorder." }
    ],

    "N": [
      { name: "Neuropathy", description: "Nerve damage causing pain and numbness." },
      { name: "Nephritis", description: "Kidney inflammation." },
      { name: "Nasal polyps", description: "Growths in nasal passage." },
      { name: "Night blindness", description: "Poor vision in low light." }
    ],

    "O": [
      { name: "Obesity", description: "Excess body fat accumulation." },
      { name: "Osteoporosis", description: "Weak and brittle bones." },
      { name: "Otitis media", description: "Middle ear infection." }
    ],

    "P": [
      { name: "Pneumonia", description: "Lung infection causing inflammation." },
      { name: "Psoriasis", description: "Autoimmune skin disease." },
      { name: "Parkinson's disease", description: "Nervous system movement disorder." },
      { name: "Pancreatitis", description: "Inflammation of pancreas." }
    ],

    "Q": [
      { name: "Q fever", description: "Bacterial infection from animals." }
    ],

    "R": [
      { name: "Rheumatoid arthritis", description: "Autoimmune joint inflammation." },
      { name: "Rabies", description: "Fatal viral brain infection." },
      { name: "Retinal disease", description: "Damage to retina affecting vision." }
    ],

    "S": [
      { name: "Stroke", description: "Brain blood supply blockage." },
      { name: "Sinusitis", description: "Sinus inflammation." },
      { name: "Scoliosis", description: "Spine curvature disorder." },
      { name: "Sepsis", description: "Life-threatening blood infection." }
    ],

    "T": [
      { name: "Tuberculosis", description: "Bacterial lung infection." },
      { name: "Tonsillitis", description: "Tonsil inflammation." },
      { name: "Thyroid disorder", description: "Hormone imbalance disease." }
    ],

    "U": [
      { name: "Ulcer", description: "Stomach lining wound." },
      { name: "Urinary tract infection", description: "Bacterial UTI infection." }
    ],

    "V": [
      { name: "Vertigo", description: "Dizziness and balance disorder." },
      { name: "Varicose veins", description: "Swollen twisted veins." },
      { name: "Viral infection", description: "Disease caused by virus." }
    ],

    "W": [
      { name: "Whooping cough", description: "Severe bacterial cough infection." },
      { name: "Worm infection", description: "Parasitic intestinal infection." }
    ],

    "X": [
      {
        name: "Xerophthalmia", description: "Eye dryness caused by vitamin A deficiency."
      }
    ],

    "Y": [
      { name: "Yellow fever", description: "Mosquito-borne viral disease." }
    ],

    "Z": [
      { name: "Zika virus", description: "Mosquito-borne viral infection." },
      { name: "Zollinger-Ellison syndrome", description: "Excess stomach acid disorder." }
    ]
  }
};