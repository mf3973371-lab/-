export const AR_LETTERS = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي"];
export const EN_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export const diseasesData = {
  ar: {
    "أ": [
      { name: "الأنفلونزا", description: "عدوى فيروسية حادة تهاجم الجهاز التنفسي وتتميز بالحمى، آلام العضلات الشديدة، والسعال." },
      { name: "الربو", description: "مرض تنفسي مزمن يتميز بتضيق وتورم مجاري الهواء، مما يسبب صعوبة في التنفس وضيق الصدر وسعالاً مستمراً." },
      { name: "ألزهايمر", description: "اضطراب عصبي تدريجي يؤدي إلى ضمور خلايا الدماغ وتراجع شديد وتدريجي في الذاكرة والقدرات الإدراكية." }
    ],
    "ب": [
      { name: "البواسير", description: "أوردة متسعة ومنتفخة في المستقيم والشرج تسبب حكة، ألم، وأحياناً نزفاً خفيفاً أثناء عملية الإخراج." },
      { name: "البهاق (البرص)", description: "مرض جلدي مناعي يتسبب في فقدان لون الجلد الطبيعي وظهور بقع بيضاء نتيجة نقص الخلايا الصبغية (الميلانين)." }
    ],
    "ت": [
      { name: "تصلب الشرايين", description: "حالة طبية خطيرة تتميز بتراكم الدهون والكوليسترول على جدران الشرايين، مما يحد من تدفق الدم بمرونة للأعضاء." },
      { name: "التوحد", description: "اضطراب نمو عصبي يؤثر على قدرة الطفل على التواصل الاجتماعي، والتفاعل اللفظي والغير لفظي والتكيف السلوكي." }
    ],
    "ث": [
      { name: "الثعلبة", description: "اضطراب مناعي ذاتي يهاجم بصيلات الشعر ويؤدي إلى تساقطه فجأة على شكل بقع مستديرة ملساء في الرأس أو الجسم." }
    ],
    "ج": [
      { name: "الجرب", description: "عدوى جلدية طفيلية تسبب حكة شديدة تزداد ليلاً نتيجة حفر سوس الجرب لسراديب صغيرة داخل طبقات الجلد السطحية." },
      { name: "الجدري المائي", description: "عدوى فيروسية شديدة تسبب طفحاً جلدياً مثيراً للحكة وبثوراً حمراء صغيرة مملوءة بالسوائل تغطي الجسم بالكامل." }
    ],
    "ح": [
      { name: "الحصبة", description: "عدوى فيروسية شديدة العدوى تنتقل عبر الهواء، وتسبب طفحاً جلدياً مميزاً، حمى مرتفعة، زكام وسعال جاف." },
      { name: "الحمى التيفوئيدية", description: "عدوى بكتيرية خطيرة تسببها السالمونيلا التيفية، تؤدي إلى حمى شديدة ومستمرة، آلام حادة بالبطن وصداع." }
    ],
    "خ": [
      { name: "الخناق (الكتمة)", description: "عدوى تنفسية تسبب تورماً في الحنجرة والقصبة الهوائية، مما يؤدي إلى سعال نباحي حاد وصوت أجش ضيق." }
    ],
    "د": [
      { name: "الدوالي الوريدية", description: "أوردة متسعة ومتعرجة ومحتقنة تظهر غالباً في الساقين نتيجة ضعف الصمامات الوريدية وتراكم الدم بداخلها." }
    ],
    "ر": [
      { name: "الروماتويد (التهاب المفاصل)", description: "مرض مناعي ذاتي مزمن يهاجم المفاصل مسبباً التهاباً مؤلماً، تورماً، وتيبساً قد يؤدي لتشوه المفاصل بمرور الوقت." }
    ],
    "ز": [
      { name: "الزهايمر المبكر", description: "ضمور تدريجي مبكر في خلايا الدماغ يؤدي إلى فقدان القدرة الإدراكية وتدهور الذاكرة بشكل يعيق ممارسة الحياة اليومية." }
    ],
    "س": [
      { name: "السكري", description: "اضطراب تمثيل غذائي مزمن يتميز بارتفاع مستويات السكر في الدم نتيجة نقص إفراز هرمون الأنسولين أو مقاومة خلايا الجسم له." },
      { name: "السل الرئوي (الدرن)", description: "مرض معدٍ خطير تسببه بكتيريا متفطرة تهاجم الرئتين بشكل رئيسي وتنتقل عبر الرذاذ المتطاير في الهواء عند السعال." }
    ],
    "ش": [
      { name: "الشقيقة (الصداع النصفي)", description: "اضطراب عصبي يسبب نوبات متكررة من الصداع الحاد والنباض في جانب واحد من الرأس مصحوباً بغثيان وحساسية مفرطة للضوء." },
      { name: "الشلل الرعاش (باركينسون)", description: "اضطراب تدريجي في الجهاز العصبي يؤثر على الحركة والتوازن، ويسبب الرعاش وتصلب العضلات وبطء الحركة الشديد." }
    ],
    "ص": [
      { name: "الصدفية", description: "مرض جلدي مناعي مزمن يؤدي إلى تسارع انقسام خلايا الجلد، مما يسبب تراكم قشور فضية سميكة وبقع حمراء مثيرة للحكة." }
    ],
    "ض": [
      { name: "ضغط الدم المرتفع", description: "حالة شائعة تكون فيها قوة دفع الدم ضد جدران الشرايين مرتفعة باستمرار، ويسمى طبياً بالقاتل الصامت." }
    ],
    "ط": [
      { name: "طنين الأذن", description: "إدراك صوت صفير، رنين، أو وشيش مستمر في إحدى الأذنين أو كلتيهما دون وجود مصدر خارجي حقيقي لهذا الصوت." }
    ],
    "ع": [
      { name: "العقم وإرهاق الخصوبة", description: "حالة طبية تعني عدم القدرة على حدوث الحمل بعد سنة أو أكثر من المحاولات الزوجية المنتظمة والمستمرة بدون موانع." }
    ],
    "غ": [
      { name: "قصور الغدة الدرقية", description: "اضطراب في إفراز هرمونات الغدة الدرقية يؤدي إلى إبطاء التمثيل الغذائي، زيادة الوزن، الخمول والشعور بالبرودة المستمرة." }
    ],
    "ف": [
      { name: "فقر الدم (الأنيميا)", description: "حالة تفتقر فيها خلايا الدم الحمراء إلى الهيموجلوبين الكافي لنقل الأكسجين بفاعلية لأنسجة وخلايا الجسم المختلفة." },
      { name: "الفشل الكلوي المزمن", description: "تدهور تدريجي ومستمر في وظائف الكلى يمنعها من تنقية الفضلات والسموم والسوائل الزائدة من مجرى الدم بفاعلية." }
    ],
    "ق": [
      { name: "قرحة المعدة الحادة", description: "تآكل أو قروح مؤلمة في الغشاء المخاطي المبطن للمعدة نتيجة لزيادة إفراز الأحماض أو الإصابة بجرثومة المعدة (H. Pylori)." },
      { name: "القولون العصبي", description: "اضطراب شائع يصيب الأمعاء الغليظة ويسبب تقلصات مفاجئة، آلاماً في البطن، انتفاخاً مستمراً، وإمساكاً أو إسهالاً متبادلاً." }
    ],
    "ك": [
      { name: "التهاب الكبد الوبائي", description: "عدوى فيروسية تصيب خلايا الكبد وتؤدي للالتهاب والتلف، وتسببها فيروسات مختلفة أشهرها الفيروسات (A, B, C)." }
    ],
    "ل": [
      { name: "اللوكيميا (سرطان الدم)", description: "سرطان يصيب الأنسجة المسؤولة عن تكوين الدم في الجسم بما فيها نخاع العظم، ويتميز بإنتاج خلايا دم بيضاء غير طبيعية." }
    ],
    "م": [
      { name: "الملاريا", description: "مرض طفيلي خطير ينتقل للبشر عبر لدغات بعوض الأنوفيلس المصاب، ويسبب نوبات متكررة وقوية من الحمى الشديدة والقشعريرة." }
    ],
    "ن": [
      { name: "النقرس (داء الملوك)", description: "شكل مؤلم وشديد من التهابات المفاصل يحدث نتيجة ترسب بلورات حمض اليوريك في المفاصل خاصة إصبع القدم الكبير." }
    ],
    "هـ": [
      { name: "الهربس البسيط", description: "عدوى فيروسية تسبب بثوراً صغيرة ومؤلمة ومثيرة للحكة على الجلد أو الأغشية المخاطية حول الفم أو في مناطق أخرى." }
    ],
    "و": [
      { name: "اليرقان (اليرقان الصفراوي)", description: "اصفرار لون الجلد وبياض العينين نتيجة تراكم مادة البيليروبين الصبغية في الدم بسبب اضطرابات في وظائف الكبد." }
    ],
    "ي": [
      { name: "اليرقان الوراثي", description: "متلازمة وراثية مزمنة تتميز بارتفاع البيليروبين نتيجة خلل خلقي خفيف في إنزيمات الكبد مثل متلازمة جيلبرت الشهيرة." }
    ]
  },
  en: {
    "A": [
      { name: "Asthma", description: "A chronic respiratory disease characterized by narrowing and swelling of the airways, causing breathing difficulties and chest tightness." },
      { name: "Anemia", description: "A medical condition in which the blood lacks enough healthy red blood cells or hemoglobin to transport adequate oxygen to the tissues." },
      { name: "Alzheimer's", description: "A progressive neurologic disorder that causes brain atrophy and brain cells to die, leading to memory decline and mental loss." }
    ],
    "B": [
      { name: "Bronchitis", description: "Inflammation of the lining of your bronchial tubes, which carry air to and from your lungs, causing persistent coughing and phlegm." }
    ],
    "C": [
      { name: "Cholera", description: "An acute diarrheal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae." }
    ],
    "D": [
      { name: "Diabetes Mellitus", description: "A chronic metabolic disease that occurs when the pancreas does not produce enough insulin or when the body cannot use it effectively." }
    ],
    "E": [
      { name: "Epilepsy", description: "A central nervous system (neurological) disorder in which brain activity becomes abnormal, causing seizures or unusual behavior." }
    ],
    "F": [
      { name: "Flu (Influenza)", description: "A highly contagious viral infection of the respiratory passages causing high fever, severe aching, and fatigue." }
    ],
    "G": [
      { name: "Gout", description: "A complex form of arthritis characterized by sudden, severe attacks of intense pain, swelling, and redness in the joints." }
    ],
    "H": [
      { name: "Hypertension", description: "A common condition in which the long-term force of the blood against your artery walls is consistently too high, often called the silent killer." }
    ],
    "I": [
      { name: "Influenza", description: "An acute viral respiratory infection characterized by high fever, body aches, sore throat, and dry cough." }
    ],
    "J": [
      { name: "Jaundice", description: "A medical condition with yellowing of the skin or whites of the eyes, arising from excess of the pigment bilirubin in the bloodstream." }
    ],
    "K": [
      { name: "Kidney Stones", description: "Hard deposits made of minerals and acid salts that form inside your kidneys and can be extremely painful to pass through the urinary tract." }
    ],
    "L": [
      { name: "Leukemia", description: "A cancer of blood-forming tissues, including the bone marrow and lymphatic system, causing abnormal production of white blood cells." }
    ],
    "M": [
      { name: "Migraine", description: "A neurological condition that can cause multiple symptoms, most notably a severe throbbing headache typically on one side of the head." },
      { name: "Malaria", description: "A life-threatening disease caused by parasites that are transmitted to people through the bites of infected female Anopheles mosquitoes." }
    ],
    "N": [
      { name: "Nerve Compression", description: "Occurs when direct pressure or force is put on a nerve, causing numbness, tingling, or muscle weakness in the affected area." }
    ],
    "O": [
      { name: "Osteoarthritis", description: "The most common form of arthritis, affecting millions of people worldwide, caused by gradual wear and tear of joint cartilage." }
    ],
    "P": [
      { name: "Pneumonia", description: "An infection that inflames the air sacs in one or both lungs, which may fill with fluid or pus, causing severe cough, fever, and chills." },
      { name: "Psoriasis", description: "A chronic skin disease that causes red, itchy scaly patches, most commonly on the knees, elbows, trunk, and scalp." }
    ],
    "Q": [
      { name: "Q Fever", description: "A bacterial infection caused by Coxiella burnetii, typically transmitted to humans from cattle, sheep, or goats causing flu-like symptoms." }
    ],
    "R": [
      { name: "Rheumatoid Arthritis", description: "A chronic inflammatory disorder that affects the lining of your joints, causing painful swelling and bone erosion." }
    ],
    "S": [
      { name: "Stroke", description: "A medical emergency that occurs when the blood supply to part of your brain is interrupted or reduced, preventing brain tissue from getting oxygen." }
    ],
    "T": [
      { name: "Tuberculosis", description: "A serious infectious bacterial disease that mainly affects your lungs, spread from person to person through tiny respiratory droplets." }
    ],
    "U": [
      { name: "Ulcer (Gastric)", description: "Painful sores in the stomach lining, occurring when the thick layer of mucus that protects your stomach from digestive juices is reduced." }
    ],
    "V": [
      { name: "Vertigo", description: "A sensation of feeling off-balance, dizzy, or spinning, often caused by inner ear problems or neurological pathways." }
    ],
    "W": [
      { name: "Whooping Cough", description: "A highly contagious respiratory tract infection marked by a severe hacking cough followed by a high-pitched intake of air." }
    ],
    "Y": [
      { name: "Yellow Fever", description: "An acute viral hemorrhagic disease transmitted by infected mosquitoes, causing fever, severe headache, and jaundice." }
    ]
  }
};
