import img1 from "@assets/gallery-1_1779957695757.jpg";
import img2 from "@assets/gallery-2_1779957695772.jpg";
import img3 from "@assets/gallery-3_1779957695774.jpg";
import img4 from "@assets/gallery-4_1779957695777.jpg";
import img5 from "@assets/gallery-5_1779957695778.jpg";
import img6 from "@assets/gallery-6_1779957695781.jpg";
import bgMusic from "@assets/background-music_1779687276994_1779957637714.mp3";
import heroBg from "@assets/hero-bg_1779957695782.jpg";
import socialShare from "@assets/social-share_1779957806934.jpg";
import logoImg from "@assets/logo_1779957806929.png";
import vogueImg from "@assets/vogue.png";
import wa1 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.16_1779688398581.jpeg";
import wa2 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.17_1779688398578.jpeg";
import wa3 from "@assets/WhatsApp_Image_2026-05-15_at_02.47.53_1779688398570.jpeg";
import wa4 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.18_1779688398574.jpeg";

export const DEFAULT_GALLERY_IMAGES = [
  { id: "default-1",  url: img1,        alt: "ورود بيضاء",       visible: true },
  { id: "default-2",  url: img2,        alt: "خواتم الزفاف",     visible: true },
  { id: "default-3",  url: img3,        alt: "شمعدان العشاء",    visible: true },
  { id: "default-4",  url: img4,        alt: "نقش ذهبي",         visible: true },
  { id: "default-5",  url: img5,        alt: "تورتة الزفاف",     visible: true },
  { id: "default-6",  url: img6,        alt: "عريشة الزفاف",     visible: true },
  { id: "default-7",  url: socialShare, alt: "علاء وأميرة",      visible: true },
  { id: "default-8",  url: vogueImg,    alt: "أميرة",            visible: true },
  { id: "default-9",  url: wa1,         alt: "لحظات خاصة",       visible: true },
  { id: "default-10", url: wa2,         alt: "لحظات الزفاف",     visible: true },
  { id: "default-11", url: wa3,         alt: "ذكريات جميلة",     visible: true },
  { id: "default-12", url: wa4,         alt: "أميرة وعلاء",      visible: true },
];

export const DEFAULT_MUSIC_URL: string = bgMusic as string;
export const HERO_BG: string = heroBg as string;
export const SOCIAL_SHARE: string = socialShare as string;
export const LOGO_IMG: string = logoImg as string;
