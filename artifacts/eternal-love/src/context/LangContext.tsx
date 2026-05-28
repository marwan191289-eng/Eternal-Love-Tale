import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "ar" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const LangContext = createContext<LangContextType>({
  lang: "ar",
  setLang: () => {},
  t: (k) => k,
  dir: "rtl",
});

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  function t(key: string): string {
    const parts = key.split(".");
    let obj: Record<string, unknown> = translations[lang] as Record<string, unknown>;
    for (const p of parts) {
      if (typeof obj === "object" && obj !== null && p in obj) {
        obj = obj[p] as Record<string, unknown>;
      } else return key;
    }
    return typeof obj === "string" ? obj : key;
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </LangContext.Provider>
  );
}

const translations: Record<Lang, Record<string, unknown>> = {
  ar: {
    nav: {
      title: "أميرة & علاء",
      admin: "الإدارة",
      lang: "EN",
    },
    splash: {
      names: "أميرة & علاء",
      date: "✦ ١٤ مايو ٢٠٢٦ ✦",
      celebration: "Celebration — احتفال",
      enter: "✨ ادخل إلى الاحتفال ✨",
      hint: "أو اضغط في أي مكان للدخول",
      quran: "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ﴾",
      quranRef: "سورة الروم — الآية ٢١",
    },
    hero: {
      names: "أميرة & علاء",
      date: "✦ ١٤ مايو ٢٠٢٦ ✦",
      sub: "Celebration — احتفال",
      divider: "✦ ✦ ✦",
    },
    celebration: {
      badge: "Celebration",
      title: "احتفالٌ بالأميرة أميرة",
      body: "في هذا اليوم المبارك، نجتمع — ولو من بعيد — لنحتفي بكِ يا أميرة، وبشريك عمركِ علاء. هذا الموقع هديّة من القلب: مرجعٌ تعودين إليه دائماً لترَيْ كم أنتِ محبوبة، وكم كانت لحظات يومكِ ساحرة.",
    },
    poetry1: {
      title: "هنا تبدأ حكاية — تكتبها الذكريات وترويها القلوب",
      lines: [
        "قصة حب تُفتَح صفحتها الأولى،",
        "وفصل جديد يُكتب بحروف من الذهب",
        "لرواية لامعة سطع بريقها",
        "حتى رآها الكفيف في وضح النهار",
        "وسمع لحنها الأصم في أحلك عتمة وظلام",
        "هنا يولد الحب الجديد…",
        "ذكرى تشهد ... حكاية تبقى،",
        "لتضئ عيوناً مُظلمة، وروحٍ هائمة، وقلوبٍ لا نابضة",
        "فيا لعظمة الحب وقسوته...",
        "نورٌ في الظلام... وظلامٌ في النور...",
      ],
      closing: "أنصيبك نورهٍ وعظمته ،،، أم قدرك وظلمته وقسوته",
      soul: "من أعماق الروح",
    },
    philosophy1: {
      lines: [
        "يُقال أن البشر يولدون على فطرة ما يعيشون، فهل قتل لأنه كذا؟",
        "لا فوالله قتل لأنه وُلِد على فطرة القتل...",
        "قلبٌ ينبض بجبنٍ كقلب الشجعان، والتشبيه هنا للنبض لا القلوب يا غلام.",
        "ولما كانت الدابة التي لا تعقل أفضل من قاتل الفطرة لما رفعت حافرها عن وليدها خشية أن تصيبه.",
        "دابة لا تعقل خشيت فظهرت عظمة قدرة الله.",
        "أوصيك يا غلام برحمة خلق الله،",
        "أيجب أن تُصبح دابة لترحم وتصفح وتعفو؟",
        "سامح لتُسامح، أصفح لكي يُصفح عنك، وأعفو ليٌعفى عنك",
        "وأعلم أن غطاء ستر الله له قدر ومقدار، خفيف كوزن جناح البعوضة لا يزن مثقال ذرة.",
        "حافظوا على ستركم وسركم حتى لا يضيع غطاءكم، ولو ضاقت وأستحكمت فاهرعوا الى سعة فضاء رحمة الله، اللهم عًز علىَ أمرُ لك فيه أسباب.",
      ],
    },
    philosophy2: {
      intro: "يٌقال أن الرجال نوعان",
      quote1: '"رجلُ يحيى بقلبه وآخر يٌحيي قلبه"',
      and: "وكذا",
      quote2: '"أن أعتى الرجال وأخطرهم قتلتهم قلوبهم ،،، وأضعفهم أحيتهم قلوبهم"',
    },
    messages: {
      title: "رسائل من القلب",
      sub: "✦ كلمات تُحفر في الذاكرة وتبقى في القلب ✦",
      amira: "أميرة، أنت القصيدة التي لم أكتبها بعد، والحلم الذي أصبح حقيقة في يوم ١٤ مايو ٢٠٢٦.",
      alaa: "علاء، معك بدأت حكاية لا تنتهي، وكتبنا بيدينا أجمل فصول العمر.",
      family: "كل التهاني والتمنيات لعروسينا الغاليين — بارك الله لكم وبارك عليكم وجمع بينكم في خير وسعادة دائمة.",
    },
    footer: {
      blessing: "✦ بارك الله لكم وبارك عليكم وجمع بينكم في خير ✦",
      date: "١٤ مايو ٢٠٢٦",
      rights: "جميع الحقوق محفوظة",
      dev: "تصميم وتطوير",
    },
    dev: {
      title: "المطوّر",
      name: "Marwan Negm",
      role: "Full Stack Developer",
      badge: "DEV",
    },
    themes: {
      title: "تغيير الألوان",
      textOnly: "تغيير لون النص فقط",
      bgOnly: "تغيير لون الخلفية فقط",
      combined: "تغيير النص والخلفية معاً",
      reset: "إعادة التعيين",
    },
    music: {
      play: "تشغيل الموسيقى",
      pause: "إيقاف الموسيقى",
    },
    lock: {
      title: "الموقع محمي بكلمة مرور",
      placeholder: "أدخل كلمة المرور",
      wrong: "كلمة المرور غير صحيحة",
      enter: "دخول",
    },
  },
  en: {
    nav: {
      title: "Amira & Alaa",
      admin: "Admin",
      lang: "AR",
    },
    splash: {
      names: "Amira & Alaa",
      date: "✦ May 14, 2026 ✦",
      celebration: "Celebration — احتفال",
      enter: "✨ Enter the Celebration ✨",
      hint: "Or click anywhere to enter",
      quran: "﴿ And of His signs is that He created for you from yourselves mates that you may find tranquility in them ﴾",
      quranRef: "Surah Ar-Rum — Verse 21",
    },
    hero: {
      names: "Amira & Alaa",
      date: "✦ May 14, 2026 ✦",
      sub: "Celebration — احتفال",
      divider: "✦ ✦ ✦",
    },
    celebration: {
      badge: "Celebration",
      title: "A Celebration for Princess Amira",
      body: "On this blessed day, we gather — even from afar — to celebrate you, dear Amira, and your life partner Alaa. This website is a heartfelt gift: a place you can always return to and see how deeply you are loved, and how magical your special day was.",
    },
    poetry1: {
      title: "Here a Story Begins — Written by Memories, Told by Hearts",
      lines: [
        "A love story whose first page opens,",
        "A new chapter written in letters of gold",
        "For a luminous novel whose brilliance blazed",
        "Until the blind could see it in broad daylight",
        "And the deaf heard its melody in the deepest dark",
        "Here new love is born…",
        "A memory bears witness... a story endures,",
        "To illuminate darkened eyes, wandering souls, and still hearts",
        "Oh, the grandeur and cruelty of love...",
        "Light in the darkness... and darkness in the light...",
      ],
      closing: "Is your fate its light and greatness… or its darkness and cruelty?",
      soul: "From the depths of the soul",
    },
    philosophy1: {
      lines: [
        "It is said that people are born on the nature of what they live — so did he kill because of that?",
        "No, by God, he killed because he was born on the nature of killing...",
        "A heart that beats with cowardice like the heart of the brave — the comparison here is to the beat, not the hearts, young man.",
        "For when the irrational beast was better than a killer of nature, it lifted its hoof away from its young fearing it would harm them.",
        "A creature without reason feared, and thus the greatness of God's power was revealed.",
        "I advise you, young man, to show mercy to God's creation,",
        "Must you become a beast to show mercy, forgiveness, and pardon?",
        "Forgive so you may be forgiven, pardon so pardon may be granted to you, and excuse so you may be excused.",
        "Know that God's veil of protection has a measure — as light as the weight of a mosquito's wing, not the weight of an atom.",
        "Guard your veil and your secrets so your cover is not lost. And if things become too tight, rush to the expanse of God's infinite mercy.",
      ],
    },
    philosophy2: {
      intro: "It is said that men are of two kinds",
      quote1: '"A man who lives by his heart, and another who gives life to his heart"',
      and: "And likewise",
      quote2: '"The fiercest and most dangerous of men were slain by their hearts… and the weakest were given life by theirs"',
    },
    messages: {
      title: "Messages From The Heart",
      sub: "✦ Words carved in memory, forever in the heart ✦",
      amira: "Amira, you are the poem I have yet to write, and the dream that became reality on May 14, 2026.",
      alaa: "Alaa, with you began a story that never ends — together we wrote the most beautiful chapters of life.",
      family: "All congratulations and best wishes to our dearest couple — may God bless you and bring you together in joy and everlasting happiness.",
    },
    footer: {
      blessing: "✦ May God bless your union and fill your life with joy ✦",
      date: "May 14, 2026",
      rights: "All rights reserved",
      dev: "Designed & Developed by",
    },
    dev: {
      title: "Developer",
      name: "Marwan Negm",
      role: "Full Stack Developer",
      badge: "DEV",
    },
    themes: {
      title: "Color Themes",
      textOnly: "Text Color Only",
      bgOnly: "Background Color Only",
      combined: "Text & Background Combined",
      reset: "Reset",
    },
    music: {
      play: "Play Music",
      pause: "Pause Music",
    },
    lock: {
      title: "Site Protected by Password",
      placeholder: "Enter password",
      wrong: "Incorrect password",
      enter: "Enter",
    },
  },
};
