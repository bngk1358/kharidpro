import React from 'react';
import { ShieldCheck, Award, CheckCircle2, ShoppingBag, Users, Zap, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Hero Header */}
      <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl space-y-4 text-center border border-slate-800 shadow-xl">
        <div className="w-16 h-16 bg-amber-500 text-slate-950 font-black rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
          <ShoppingBag className="w-8 h-8" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black">درباره خرید پرو</h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          مرجع تخصصی نقد، بررسی واقعی، استعلام و مقایسه قیمت لحظه‌ای کالای دیجیتال در ایران.
        </p>
      </div>

      {/* Story & Philosophy */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6">
        <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">داستان و هدف ما</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
          با گسترش فروشگاه‌های اینترنتی در ایران و نوسانات قیمت کالا، یافتن بهترین قیمت و محصولی که دقیقا با نیاز خریدار همخوانی داشته باشد تبدیل به یک چالش شده است. تیم «خرید پرو» با هدف ایجاد شفافیت کامل در بازار دیجیتال تاسیس شد.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          ما بدون هیچ‌گونه وابستگی تجاری به فروشگاهی خاص، قیمت‌ها را به صورت کاملاً مستقل و لحظه‌ای از معتبرترین مرجع‌های بازار ایران نظیر دیجی‌کالا، تکنولایف، موبیت و مقداد آی‌تی جمع‌آوری و مقایسه می‌کنیم تا شما با کمترین هزینه، بهترین کالا را تهیه کنید.
        </p>
      </section>

      {/* Testing Methodology */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-amber-600 font-extrabold text-xs">شفافیت کامل</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">چگونه محصولات را تست می‌کنیم؟</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 text-center">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">۱. تست کاربری واقعی</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              هر محصول حداقل به مدت ۷ روز توسط تیم متخصص ما در شرایط کاری واقعی مورد تست دوربین، باتری و سخت‌افزار قرار می‌گیرد.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 text-center">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">۲. پایش خودکار قیمت</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ربات‌های هوشمند خرید پرو هر ۱۰ دقیقه قیمت‌های فروشگاه‌های دارای گارانتی معتبر را استخراج و مقایسه می‌کنند.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 text-center">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">۳. تست کدهای تخفیف</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              تمامی کدهای تخفیف دیجی‌کالا و تکنولایف پیش از انتشار در سایت به صورت دستی روی سبد خرید تست می‌شوند.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
