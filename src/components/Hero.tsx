import React, { useState } from 'react';
import { Search, Sparkles, ShieldCheck, Zap, ArrowLeft, TrendingDown, Store, CheckCircle, BarChart3, Tag } from 'lucide-react';
import { CATEGORIES, toFaDigit } from '../data/mockData';
import { SiteStats } from '../types';

interface HeroProps {
  stats: SiteStats;
  onSearchSubmit: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onExploreDeals: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  stats,
  onSearchSubmit,
  onSelectCategory,
  onExploreDeals,
}) => {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearchSubmit(inputVal.trim());
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-slate-50 text-slate-900 overflow-hidden border-b border-slate-200/80">
      {/* Decorative Gradient Elements */}
      <div className="absolute -top-12 right-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-sky-400/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Top Tagline Pill */}
          <div className="inline-flex items-center gap-2 bg-white/90 border border-amber-300 px-4 py-1.5 rounded-full text-xs font-black text-amber-900 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>خرید پرو | موتور هوشمند مقایسه قیمت و راهنمای خرید آنلاین</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight">
            قبل از خرید، مطمئن شوید <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">بهترین انتخاب</span> را دارید
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
            تست و بررسی واقعی محصولات، مقایسه قیمت لحظه‌ای از بیش از ۱۲ فروشگاه معتبر (دیجی‌کالا، تکنولایف، مقداد آی‌تی و...) همراه با کدهای تخفیف روزانه.
          </p>

          {/* Main Search Bar */}
          <form onSubmit={handleSubmit} className="pt-2 max-w-2xl mx-auto">
            <div className="bg-white p-2 rounded-2xl border-2 border-slate-200/90 shadow-2xl shadow-slate-300/40 flex items-center gap-2 focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/15 transition-all">
              <Search className="w-6 h-6 text-amber-500 shrink-0 mr-2" />
              <input
                type="text"
                placeholder="نام محصول یا برند مورد نظر را جستجو کنید (مثلا: S24 Ultra یا MacBook M3)..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-sm sm:text-base font-bold"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl transition-all flex items-center gap-1.5 shrink-0 text-sm shadow-md shadow-amber-500/20 active:scale-95"
              >
                <span>جستجو و مقایسه</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Categories Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-500 font-bold ml-1">جستجوی سریع:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="bg-white hover:bg-amber-500 hover:text-slate-950 text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-sm transition-all hover:border-amber-400"
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Trust Highlights & CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExploreDeals}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95"
            >
              <TrendingDown className="w-4 h-4 text-emerald-200" />
              <span>پیشنهادهای با بیشترین افت قیمت امروز</span>
            </button>
          </div>

        </div>

        {/* Live Site Statistics Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 mx-auto bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-2 border border-amber-200/60">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-['Vazirmatn']">
              {toFaDigit(stats.testedProducts.toLocaleString('fa-IR'))}+
            </span>
            <p className="text-xs text-slate-500 mt-1 font-bold">محصول بررسی شده تخصصی</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 mx-auto bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-2 border border-amber-200/60">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-['Vazirmatn']">
              {toFaDigit(stats.categoriesCount)}
            </span>
            <p className="text-xs text-slate-500 mt-1 font-bold">دسته‌بندی تخصصی دیجیتال</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 mx-auto bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-2 border border-amber-200/60">
              <Store className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-['Vazirmatn']">
              {toFaDigit(stats.partnerStoresCount)}
            </span>
            <p className="text-xs text-slate-500 mt-1 font-bold">فروشگاه آنلاین معتبر رصدشده</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 mx-auto bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-2 border border-emerald-200/60">
              <TrendingDown className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-['Vazirmatn']">
              {toFaDigit(stats.trackedPriceDrops)}+
            </span>
            <p className="text-xs text-slate-500 mt-1 font-bold">کاهش قیمت رهگیری شده امروز</p>
          </div>

        </div>

      </div>
    </div>
  );
};
