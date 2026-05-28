import img1 from "@assets/gallery-1_1779957695757.jpg";
import img2 from "@assets/gallery-2_1779957695772.jpg";
import img3 from "@assets/gallery-3_1779957695774.jpg";
import img4 from "@assets/gallery-4_1779957695777.jpg";
import img5 from "@assets/gallery-5_1779957695778.jpg";
import img6 from "@assets/gallery-6_1779957695781.jpg";
import bgMusic from "@assets/background-music_1779687276994_1779957637714.mp3";
import heroBg from "@assets/hero-bg_1779957695782.jpg";
import socialShare from "@assets/social-share_1779957806934.jpg";

export const DEFAULT_GALLERY_IMAGES = [
  { id: "default-1", url: img1,      alt: "ورود بيضاء",    visible: true },
  { id: "default-2", url: img2,      alt: "خواتم الزفاف",  visible: true },
  { id: "default-3", url: img3,      alt: "كنادل العشاء",  visible: true },
  { id: "default-4", url: img4,      alt: "نقش ذهبي",      visible: true },
  { id: "default-5", url: img5,      alt: "تورتة الزفاف",  visible: true },
  { id: "default-6", url: img6,      alt: "عريشة الزفاف",  visible: true },
  { id: "default-7", url: socialShare, alt: "علاء وأميرة",  visible: true },
];

export const DEFAULT_MUSIC_URL: string = bgMusic as string;
export const HERO_BG: string = heroBg as string;
export const SOCIAL_SHARE: string = socialShare as string;
