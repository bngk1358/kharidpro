import React, { useState } from 'react';
import { Search, ShoppingBag, Bookmark, Tag, BookOpen, ShieldCheck, Phone, Info, Menu, X, SlidersHorizontal, ArrowLeft, ExternalLink, Sparkles, UserCheck } from 'lucide-react';
import { CATEGORIES, toFaDigit } from '../data/mockData';
import { Product } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectCategory?: (categoryId: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onSelectCategory,
  favoritesCount,
  onOpenFavorites,
  allProducts,
  onSelectProduct,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.faTitle.includes(searchQuery) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.includes(searchQuery)
      )
    : [];

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-xl border-b border-slate-800">
      {/* Top Banner Message */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-600 to-slate-900 text-xs py-1.5 px-4 text-center font-medium border-b border-slate-800/80 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>به خرید پرو خوش آمدید | مقایسه لحظه‌ای قیمت از بیش از ۱۲ فروشگاه معتبر کشور</span>
        <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full text-[10px] hidden sm:inline-block border border-amber-400/30">بروزرسانی روزانه</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNav('home')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center border border-amber-400/30">
                <ShoppingBag className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white font-['Vazirmatn']">خرید پرو</span>
                <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase">PRO</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">نقد، مقایسه و راهنمای خرید</p>
            </div>
          </div>

          {/* Search Trigger Input (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full bg-slate-800/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-4 py-2.5 rounded-xl border border-slate-700 flex items-center justify-between text-sm transition-all shadow-inner group"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>جستجوی محصول، برند یا مدل (مثلا: S24 Ultra یا MacBook)...</span>
              </div>
              <span className="text-[11px] bg-slate-700/80 text-slate-300 px-2 py-0.5 rounded border border-slate-600">Ctrl + K</span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-300">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'home' ? 'text-amber-400 bg-slate-800/80 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              خانه
            </button>

            <button
              onClick={() => handleNav('products')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'products' ? 'text-amber-400 bg-slate-800/80 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              محصولات
            </button>

            <button
              onClick={() => handleNav('coupons')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'coupons' ? 'text-amber-400 bg-slate-800/80 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Tag className="w-4 h-4 text-amber-400" />
              کدهای تخفیف
            </button>

            <button
              onClick={() => handleNav('articles')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'articles' ? 'text-amber-400 bg-slate-800/80 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              راهنمای خرید
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'about' ? 'text-amber-400 bg-slate-800/80 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              درباره ما
            </button>
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon button for mobile */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              title="جستجو"
            >
              <Search className="w-5 h-5 text-amber-400" />
            </button>

            {/* Bookmark / Favorites */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700/80 flex items-center justify-center"
              title="علاقه‌مندی‌ها"
            >
              <Bookmark className="w-5 h-5 text-amber-400" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow">
                  {toFaDigit(favoritesCount)}
                </span>
              )}
            </button>

            {/* Admin Panel Link */}
            <button
              onClick={() => handleNav('admin')}
              className={`hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all border ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>پنل مدیریت</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-slate-950 border-t border-slate-800/80 py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto gap-4 scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold whitespace-nowrap flex items-center gap-1">
            دسته‌بندی‌های تخصصی:
          </span>
          <div className="flex items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(cat.id);
                  handleNav('products');
                }}
                className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 whitespace-nowrap transition-colors flex items-center gap-1.5"
              >
                <span>{cat.name}</span>
                <span className="text-[10px] text-slate-500">({toFaDigit(cat.productCount)})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 p-4 space-y-3 animate-fadeIn">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-800 font-semibold flex items-center justify-between text-slate-200"
          >
            <span>صفحه اصلی</span>
            <ArrowLeft className="w-4 h-4 text-slate-500" />
          </button>
          <button
            onClick={() => handleNav('products')}
            className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-800 font-semibold flex items-center justify-between text-slate-200"
          >
            <span>محصولات و مقایسه قیمت</span>
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={() => handleNav('coupons')}
            className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-800 font-semibold flex items-center justify-between text-slate-200"
          >
            <span>کدهای تخفیف تأییدشده</span>
            <Tag className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={() => handleNav('articles')}
            className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-800 font-semibold flex items-center justify-between text-slate-200"
          >
            <span>راهنمای خرید و اخبار</span>
            <BookOpen className="w-4 h-4 text-slate-400" />
          </button>
          <button
            onClick={() => handleNav('about')}
            className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-800 font-semibold flex items-center justify-between text-slate-200"
          >
            <span>درباره ما و نحوه کار</span>
            <ShieldCheck className="w-4 h-4 text-slate-400" />
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-800 font-semibold flex items-center justify-between text-slate-200"
          >
            <span>تماس با ما</span>
            <Phone className="w-4 h-4 text-slate-400" />
          </button>
          <button
            onClick={() => handleNav('domain-guide')}
            className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-800 font-semibold flex items-center justify-between text-slate-200"
          >
            <span>راهنمای اتصال دامنه (kharidpro.ir)</span>
            <ExternalLink className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={() => handleNav('admin')}
            className="w-full text-center py-2.5 px-3 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>بخش مدیریت سایت</span>
          </button>
        </div>
      )}

      {/* Live Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-scaleIn">
            <div className="p-4 border-b border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-amber-400" />
              <input
                type="text"
                autoFocus
                placeholder="نام محصول، مدل یا برند مورد نظرتان را تایپ کنید..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-base font-medium"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results container */}
            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-2">
              {searchQuery.trim() === '' ? (
                <div className="p-8 text-center text-slate-400 space-y-2">
                  <p className="font-semibold text-slate-300">جستجوی هوشمند بین بیش از ۱,۴۰۰ محصول</p>
                  <p className="text-xs text-slate-500">پیشنهادات محبوب: iPhone 15 Pro Max, Galaxy S24 Ultra, MacBook M3, Sony XM5</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors border border-transparent hover:border-slate-700/60"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-lg bg-slate-800"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-100">{product.faTitle}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                          <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                            {product.categoryName}
                          </span>
                          <span>برند: {product.brand}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left">
                      <span className="text-xs text-slate-400 block">کمترین قیمت بازار:</span>
                      <span className="text-sm font-bold text-amber-400">
                        {toFaDigit(product.stores[0]?.price.toLocaleString('fa-IR'))} تومان
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <p>محصولی با عبارت "{searchQuery}" یافت نشد.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
