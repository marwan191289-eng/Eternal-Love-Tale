import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

import vogue from "@assets/Screenshot_2026-05-16_023241_1779688398562.png";
import p1  from "@assets/WhatsApp_Image_2026-05-15_at_02.47.53_1779688398570.jpeg";
import p2  from "@assets/WhatsApp_Image_2026-05-14_at_16.08.18_(4)_1779688398571.jpeg";
import p3  from "@assets/WhatsApp_Image_2026-05-14_at_16.08.18_(3)_1779688398572.jpeg";
import p4  from "@assets/WhatsApp_Image_2026-05-14_at_16.08.18_(2)_1779688398573.jpeg";
import p5  from "@assets/WhatsApp_Image_2026-05-14_at_16.08.18_(1)_1779688398573.jpeg";
import p6  from "@assets/WhatsApp_Image_2026-05-14_at_16.08.18_1779688398574.jpeg";
import p7  from "@assets/WhatsApp_Image_2026-05-14_at_16.08.17_(4)_1779688398575.jpeg";
import p8  from "@assets/WhatsApp_Image_2026-05-14_at_16.08.17_(3)_1779688398576.jpeg";
import p9  from "@assets/WhatsApp_Image_2026-05-14_at_16.08.17_(2)_1779688398576.jpeg";
import p10 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.17_(1)_1779688398577.jpeg";
import p11 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.17_1779688398578.jpeg";
import p12 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.16_(1)_1779688398579.jpeg";
import p13 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.16_1779688398581.jpeg";

export type SeedImage = {
  id: string;
  src: string;
  caption: string;
};

export const SEED_IMAGES: SeedImage[] = [
  { id: "s-vogue", src: vogue, caption: "علاء وأميرة — Vogue Edition" },
  { id: "s-p1",   src: p1,   caption: "العروسان في حديقة الفرح" },
  { id: "s-p12",  src: p12,  caption: "أجمل يوم في العمر" },
  { id: "s-p13",  src: p13,  caption: "لحظة خالدة" },
  { id: "s-p11",  src: p11,  caption: "عقد القران" },
  { id: "s-g1",   src: g1,   caption: "لحظات أنيقة" },
  { id: "s-g6",   src: g6,   caption: "حفل ملكي" },
  { id: "s-g2",   src: g2,   caption: "خاتم العمر" },
  { id: "s-p2",   src: p2,   caption: "أميرة الجميلة" },
  { id: "s-p3",   src: p3,   caption: "إطلالة راقية" },
  { id: "s-p4",   src: p4,   caption: "ملكة الألوان" },
  { id: "s-p5",   src: p5,   caption: "إطلالة كلاسيكية" },
  { id: "s-p6",   src: p6,   caption: "أميرة في كل وقت" },
  { id: "s-p7",   src: p7,   caption: "ابتسامة تفرح القلب" },
  { id: "s-p8",   src: p8,   caption: "أناقة أصيلة" },
  { id: "s-p9",   src: p9,   caption: "في أجمل حلة" },
  { id: "s-p10",  src: p10,  caption: "ذوق رفيع" },
  { id: "s-g3",   src: g3,   caption: "ضوء الشموع" },
  { id: "s-g4",   src: g4,   caption: "زخرفة الفرح" },
  { id: "s-g5",   src: g5,   caption: "حلاوة اليوم" },
];

export const HIDDEN_PHOTOS_KEY = "el-hidden-photos";
export const CUSTOM_MESSAGES_KEY = "el-custom-messages";
export const SITE_LOCK_KEY = "el-site-locked";
export const ADMIN_PASS = "AdminEL_2026";
