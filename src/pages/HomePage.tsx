import React from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { CouponCard } from '../components/CouponCard';
import { ArticleCard } from '../components/ArticleCard';
import { Newsletter } from '../components/Newsletter';
import { Product, Coupon, Article, SiteStats, CategoryId, PartnerStore } from '../types';
import { CATEGORIES, STORES, formatToman, toFaDigit } from '../data/mockData';
import { TrendingDown, Award, Sparkles, Tag, BookOpen, ExternalLink, ArrowLeft, Store, ShieldCheck, Flame, Star, CheckCircle, ArrowUpLeft } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  coupons: Coupon[];
  articles: Article[];
  stores?: PartnerStore[];
  stats: SiteStats;
  onSelectProduct: (product: Product) => void;
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (categoryId: string) => void;
  setActiveTab: (tab: string) => void;
  favorites: string[];
  onToggleFavorite: (product: Product, e: React.MouseEvent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  coupons,
  articles,
  stores,
  stats,
  onSelectProduct,
  onSelectArticle,
  onSelectCategory,
  setActiveTab,
  favorites,
  onToggleFavorite,
}) => {
  // Filter subsets
  const featuredProducts = products.filter((p) => p.isFeatured);
  const priceDropProducts = products.filter((p) => p.isPriceDrop);
  const editorChoices = products.filter((p) => p.isEditorChoice);
  const mostVisitedProducts = [...products].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <Hero
        stats={stats}
        onSearchSubmit={(query) => {
          setActiveTab('products');
        }}
        onSelectCategory={(catId) => {
          onSelectCategory(catId);
          setActiveTab('products');
        }}
        onExploreDeals={() => {
          const el = document.getElementById('price-drops-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 2. Specialized Categories Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-amber-600 font-extrabold text-xs tracking-wider uppercase">دسته‌بندی‌ها</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">دسته‌بندی‌های تخصصی خرید پرو</h2>
            </div>
            <button
              onClick={() => setActiveTab('products')}
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1 transition-colors"
            >
              <span>مشاهده همه محصولات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setActiveTab('products');
                }}
                className="group bg-white rounded-2xl border border-slate-200/80 p-4 text-center hover:border-amber-400 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center space-y-3"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 relative group-hover:scale-105 transition-transform duration-300">
                  <img src={cat.bannerImage} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {toFaDigit(cat.productCount)} محصول
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Special Offers ("پیشنهاد ویژه") */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-700 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl font-black">
                <Flame className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">پیشنهادهای ویژه خرید پرو</h2>
                <p className="text-xs text-slate-400 mt-0.5">محصولات منتخب با بیشترین اختلاف قیمت بازار و ارزش خرید بالا</p>
              </div>
            </div>

            <span className="bg-amber-500/20 text-amber-300 font-bold text-xs px-3 py-1.5 rounded-full border border-amber-400/30">
              تعداد محدود
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </section>

        {/* 4. "محصولاتی که امروز ارزان‌تر شدند" (Price Drops) */}
        <section id="price-drops-section" className="space-y-6 scroll-mt-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">محصولاتی که امروز ارزان‌تر شدند</h2>
                <p className="text-xs text-slate-500">رهگیری خودکار تغییر قیمت‌ها طی ۲۴ ساعت گذشته</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('products')}
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-600 flex items-center gap-1 transition-colors"
            >
              <span>مشاهده همه تخفیف‌ها</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {priceDropProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </section>

        {/* 5. "انتخاب سردبیر" (Editor's Choice) */}
        {editorChoices.length > 0 && (
          <section className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-amber-700 font-extrabold text-xs">تست تخصصی کارشناسان</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">انتخاب سردبیر خرید پرو</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {editorChoices.slice(0, 2).map((product) => {
                const lowestStore = product.stores.find((s) => s.isLowest) || product.stores[0];

                return (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col sm:flex-row gap-6 items-center"
                  >
                    <img
                      src={product.image}
                      alt={product.faTitle}
                      className="w-36 h-36 object-contain rounded-xl bg-slate-50 p-2 shrink-0"
                    />

                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="bg-amber-500/20 text-amber-800 font-bold px-2 py-0.5 rounded">
                          {product.categoryName}
                        </span>
                        <span>{product.brand}</span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {product.faTitle}
                      </h3>

                      {product.editorsNote && (
                        <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 italic leading-relaxed">
                          "{product.editorsNote}"
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 block">کمترین قیمت در {lowestStore?.storeName}:</span>
                          <span className="text-base font-black text-slate-900">
                            {toFaDigit(lowestStore?.price.toLocaleString('fa-IR'))} تومان
                          </span>
                        </div>

                        <button className="bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1">
                          <span>بررسی کامل</span>
                          <ArrowUpLeft className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 6. "برترین محصولات هر دسته‌بندی" (Category Rankings) */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-amber-600 font-bold text-xs">جدول رتبه‌بندی بازار</span>
            <h2 className="text-2xl font-black text-slate-900">برترین محصولات هر دسته‌بندی با کمترین قیمت</h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs text-slate-700">
                <thead className="bg-slate-900 text-white font-bold text-xs uppercase">
                  <tr>
                    <th className="p-4">محصول</th>
                    <th className="p-4">دسته‌بندی</th>
                    <th className="p-4">امتیاز کاربران</th>
                    <th className="p-4">کمترین قیمت بازار</th>
                    <th className="p-4">فروشگاه دارنده ارزان‌ترین قیمت</th>
                    <th className="p-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.slice(0, 5).map((product) => {
                    const lowestStore = product.stores.find((s) => s.isLowest) || product.stores[0];

                    return (
                      <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                          <img src={product.image} alt={product.faTitle} className="w-10 h-10 object-contain rounded bg-slate-50" />
                          <span className="line-clamp-1 max-w-xs">{product.faTitle}</span>
                        </td>
                        <td className="p-4">
                          <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[11px] font-medium">
                            {product.categoryName}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-amber-500">
                          ⭐ {toFaDigit(product.rating)}
                        </td>
                        <td className="p-4 font-black text-slate-900 text-sm">
                          {toFaDigit(lowestStore?.price.toLocaleString('fa-IR'))} تومان
                        </td>
                        <td className="p-4 font-semibold text-emerald-700">
                          {lowestStore?.storeName}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold px-3 py-1.5 rounded-lg transition-colors text-[11px]"
                          >
                            مقایسه قیمت
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7. Partner Store Logos ("فروشگاه‌های همکار") */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900">فروشگاه‌های اینترنتی همکار و معتبر</h2>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              قیمت محصولات به صورت مستمر از معتبرترین فروشگاه‌های دارای اینماد و نماد اعتماد آنلاین استخراج می‌شود.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {(stores && stores.length > 0 ? stores : STORES).map((store) => (
              <a
                key={store.id}
                href={store.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-400 transition-all flex flex-col items-center text-center space-y-3 group"
              >
                <img src={store.logo} alt={store.faName} className="w-16 h-16 object-cover rounded-2xl shadow-sm border border-slate-100 group-hover:scale-105 transition-transform" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-600 transition-colors">{store.faName}</h3>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center justify-center gap-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{store.trustBadge}</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 8. Verified Discount Coupons Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl">
                <Tag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">کدهای تخفیف تأییدشده</h2>
                <p className="text-xs text-slate-500">کدهای فعال و تست‌شده دیجی‌کالا، تکنولایف و سایر فروشگاه‌ها</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('coupons')}
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1 transition-colors"
            >
              <span>مشاهده همه کدهای تخفیف</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coupons.slice(0, 4).map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </section>

        {/* 9. Buying Guides Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">راهنمای خرید تخصصی</h2>
                <p className="text-xs text-slate-500">مقالات آموزشی و راهنماهای انتخاب هوشمندانه برای هر بودجه</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('articles')}
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1 transition-colors"
            >
              <span>مشاهده آرشیو مقالات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} onSelect={onSelectArticle} />
            ))}
          </div>
        </section>

        {/* 10. "پربازدیدترین‌ها" (Most Visited) */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-amber-600 font-bold text-xs">محبوب‌ترین‌های هفته</span>
            <h2 className="text-2xl font-black text-slate-900">پربازدیدترین محصولات توسط کاربران</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mostVisitedProducts.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </section>

        {/* 11. Newsletter Subscription */}
        <Newsletter />

      </div>
    </div>
  );
};
