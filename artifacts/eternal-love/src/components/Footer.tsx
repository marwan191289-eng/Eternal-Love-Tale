import { Heart, Code2 } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/20 bg-gradient-to-t from-card/60 to-card/20 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-right">
            <h3 className="font-display-ar text-xl font-bold text-gold mb-4">حكاية حب</h3>
            <p className="font-body-ar text-muted-foreground text-sm leading-relaxed">
              موقع مخصص لتخليد ذكريات يوم الفرح والحب الأبدي بين أميرة وعلاء.
            </p>
          </div>

          <div className="text-center">
            <h3 className="font-display-ar text-xl font-bold text-gold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 font-body-ar text-sm">
              <li><a href="#literary" className="text-gold/80 hover:text-gold transition-colors">الحكاية</a></li>
              <li><a href="#gallery" className="text-gold/80 hover:text-gold transition-colors">معرض الصور</a></li>
              <li><a href="#messages" className="text-gold/80 hover:text-gold transition-colors">الرسائل</a></li>
              <li><a href="#share" className="text-gold/80 hover:text-gold transition-colors">شارك ذكرى</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-display-ar text-xl font-bold text-gold mb-4">معلومات</h3>
            <p className="font-body-ar text-muted-foreground text-sm">
              <span className="block">📅 ١٤ مايو ٢٠٢٦</span>
              <span className="block mt-2">💍 يوم الفرح والحب الأبدي</span>
            </p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <p className="font-body-ar text-sm text-gold/60 flex items-center gap-2">
            صُنع بـ <Heart size={16} className="text-red-500 fill-red-500" /> لأميرة وعلاء
          </p>
          <p className="font-display tracking-widest text-xs text-gold/40">
            © {currentYear} ETERNAL LOVE · AMIRA &amp; ALAA
          </p>
          <p className="font-body-ar text-xs text-gold/60">
            جميع الحقوق محفوظة
          </p>
        </div>

        {/* Developer signature card */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-2xl border border-gold/25 bg-card/40 backdrop-blur px-8 py-4 shadow-elegant">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/40 flex items-center justify-center shrink-0">
              <Code2 size={18} className="text-gold" />
            </div>
            <div className="text-right">
              <p className="font-display text-[10px] tracking-[0.3em] text-gold/40 uppercase">Developed by</p>
              <p className="font-display-ar text-base font-bold text-gold leading-tight">Marwan Negm</p>
              <p className="font-display text-[9px] tracking-widest text-gold/30 mt-0.5">DEV · {currentYear}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
