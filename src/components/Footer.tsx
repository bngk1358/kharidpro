import React from 'react';
import { ShoppingBag, ShieldCheck, Mail, Phone, MapPin, ExternalLink, Heart, CheckCircle2, Globe, FileText, Send } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenSitemapModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenSitemapModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">تست واقعی محصولات</h4>
              <p className="text-xs text-slate-400">بررسی بی‌طرفانه مشخصات فنی توسط تیم کارشناسان مجرب</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">کدهای تخفیف تأییدشده</h4>
              <p className="text-xs text-slate-400">بررسی و تست روزانه تمام کدهای تخفیف دیجی‌کالا و تکنولایف</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">پایش لحظه‌ای قیمت‌ها</h4>
              <p className="text-xs text-slate-400">رهگیری خودکار تغییرات قیمت از معتبرترین فروشگاه‌ها</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">ارتباط مستقیم با فروشگاه</h4>
              <p className="text-xs text-slate-400">لینک مستقیم به صفحه فروشندگان بدون واسطه مالی</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand & About Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">خرید پرو</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 pl-4">
              خرید پرو مرجع تخصصی نقد، بررسی، مقایسه قیمت لحظه‌ای و ارائه‌دهنده کدهای تخفیف واقعی از معتبرترین فروشگاه‌های اینترنتی ایران نظیر دیجی‌کالا، تکنولایف، موبیت و مقداد آی‌تی است. هدف ما هدایت شما به خریدی هوشمندانه و با مناسب‌ترین قیمت ممکن است.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>تهران، خیابان ولیعصر، نرسیده به میدان ونک، برج فناوری</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white border-r-2 border-amber-500 pr-2">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors">
                  صفحه اصلی
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-amber-400 transition-colors">
                  همه محصولات و مقایسه قیمت
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('coupons')} className="hover:text-amber-400 transition-colors">
                  کدهای تخفیف فعال
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('articles')} className="hover:text-amber-400 transition-colors">
                  راهنمای خرید تخصصی
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-amber-400 transition-colors">
                  درباره تیم خرید پرو
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-amber-400 transition-colors">
                  ارتباط و پشتیبانی
                </button>
              </li>
            </ul>
          </div>

          {/* Partner Stores Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white border-r-2 border-amber-500 pr-2">فروشگاه‌های همکار</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>دیجی‌کالا (Digikala)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>تکنولایف (Technolife)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>موبیت (Mobit)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>مقداد آی‌تی (MeghdadIT)</span>
              </li>
            </ul>
          </div>

          {/* Technical & Domain Setup Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white border-r-2 border-amber-500 pr-2">فنی و دامنه</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('domain-guide')}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>راهنمای اتصال kharidpro.ir</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSitemapModal}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>نقشه سایت و robots.txt</span>
                </button>
              </li>
              <li className="pt-2 text-slate-400">
                <p className="text-[11px] leading-relaxed">
                  تمامی حقوق مادی و معنوی متعلق به وب‌سایت خرید پرو است.
                </p>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© ۱۴۰۳ خرید پرو (kharidpro.ir) - طراحی شده با استانداردهای مدرن وب و سئو</p>
          <div className="flex items-center gap-1">
            <span>ساخته شده با</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>برای خریداران هوشمند ایرانی</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
