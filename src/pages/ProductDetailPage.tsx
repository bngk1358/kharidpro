import React, { useState } from 'react';
import { PriceComparisonTable } from '../components/PriceComparisonTable';
import { PriceHistoryChart } from '../components/PriceHistoryChart';
import { Product, Review } from '../types';
import { toFaDigit } from '../data/mockData';
import { Star, ShieldCheck, CheckCircle2, XCircle, ArrowRight, Bookmark, Share2, Award, ThumbsUp, MessageSquarePlus, Send, Zap } from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product, e: React.MouseEvent) => void;
  onAddReview: (productId: string, review: Review) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  isFavorite,
  onToggleFavorite,
  onAddReview,
}) => {
  const [selectedImg, setSelectedImg] = useState(product.image);
  const [activeTab, setActiveTab] = useState<'prices' | 'specs' | 'proscons' | 'reviews'>('prices');
  const [copySuccess, setCopySuccess] = useState(false);

  // New review state
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAdded, setReviewAdded] = useState(false);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const lowestStore = product.stores.find((s) => s.isLowest) || product.stores[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.faTitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName: reviewName,
      rating: reviewRating,
      date: new Date().toLocaleDateString('fa-IR'),
      comment: reviewComment,
      verifiedBuy: true,
    };

    onAddReview(product.id, newRev);
    setReviewAdded(true);
    setReviewName('');
    setReviewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button & Header Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به لیست محصولات</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 p-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            title="اشتراک‌گذاری"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{copySuccess ? 'لینک کپی شد!' : 'اشتراک‌گذاری'}</span>
          </button>

          <button
            onClick={(e) => onToggleFavorite(product, e)}
            className={`p-2.5 rounded-xl text-xs font-bold transition-all border ${
              isFavorite
                ? 'bg-rose-500 text-white border-rose-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Top Overview (Images + Details) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Images Gallery Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 p-6 flex items-center justify-center overflow-hidden relative">
            <img src={selectedImg} alt={product.faTitle} className="max-h-full max-w-full object-contain" />
            {product.isPriceDrop && (
              <span className="absolute top-3 right-3 bg-rose-500 text-white font-extrabold text-xs px-3 py-1 rounded-xl shadow-md">
                {toFaDigit(product.priceDropPercentage)}٪ تخفیف
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`w-16 h-16 rounded-xl border p-1 bg-slate-50 overflow-hidden shrink-0 transition-all ${
                    selectedImg === img ? 'border-amber-500 ring-2 ring-amber-400/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="نمای کالا" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Info Column */}
        <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-amber-500/10 text-amber-700 font-extrabold px-3 py-1 rounded-full border border-amber-500/20">
                {product.categoryName}
              </span>
              <span className="bg-slate-100 text-slate-600 font-semibold px-3 py-1 rounded-full">
                برند: {product.brand}
              </span>
              {product.isEditorChoice && (
                <span className="bg-amber-500 text-slate-950 font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>انتخاب سردبیر</span>
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {product.faTitle}
            </h1>
            <p className="text-xs text-slate-400 font-mono dir-ltr text-right">{product.title}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs pt-2">
              <div className="flex items-center text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="mr-1 text-slate-900">{toFaDigit(product.rating)}</span>
              </div>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">{toFaDigit(product.reviewsCount)} دیدگاه کاربر</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-600 font-medium">به‌روزرسانی: {product.updatedAt}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          {/* Lowest Price Banner Card */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-2xl space-y-2 border border-slate-700 shadow-md">
            <span className="text-xs text-amber-300 font-semibold block">کمترین قیمت موجود در بازار:</span>
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black font-['Vazirmatn'] text-white">
                  {toFaDigit(lowestStore?.price.toLocaleString('fa-IR'))}
                </span>
                <span className="text-xs font-semibold text-slate-300">تومان</span>
              </div>

              {lowestStore?.oldPrice && (
                <span className="text-sm text-slate-400 line-through decoration-rose-500">
                  {toFaDigit(lowestStore.oldPrice.toLocaleString('fa-IR'))} تومان
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/80">
              <span>عرضه‌شده در {lowestStore?.storeName} با {lowestStore?.warranty}</span>
              <span className="text-emerald-400 font-bold">موجود در انبار</span>
            </div>
          </div>
        </div>

      </div>

      {/* Tabs Bar for Detail Sections */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('prices')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'prices' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>مقایسه قیمت فروشگاه‌ها</span>
        </button>

        <button
          onClick={() => setActiveTab('specs')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'specs' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>مشخصات فنی</span>
        </button>

        <button
          onClick={() => setActiveTab('proscons')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'proscons' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>نقاط قوت و ضعف</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'reviews' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>دیدگاه‌ها ({toFaDigit(product.reviews.length)})</span>
        </button>
      </div>

      {/* Tab Content Display */}
      {activeTab === 'prices' && (
        <div className="space-y-8">
          <PriceComparisonTable stores={product.stores} productTitle={product.faTitle} />
          <PriceHistoryChart history={product.priceHistory} />
        </div>
      )}

      {activeTab === 'specs' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">مشخصات فنی کامل</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.specs.map((spec, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">{spec.title}:</span>
                <span className="text-slate-900 font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'proscons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pros */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-base">
              <CheckCircle2 className="w-5 h-5" />
              <span>نقاط قوت (مزایا)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {product.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
              <XCircle className="w-5 h-5" />
              <span>نقاط ضعف (معایب)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {product.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0"></span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-8">
          
          {/* Reviews List */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">نظرات خریداران واقعی</h3>

            {product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{rev.userName}</span>
                        {rev.verifiedBuy && (
                          <span className="bg-emerald-500/10 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/20">
                            خریدار واقعی
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-4">هنوز دیدگاهی ثبت نشده است. اولین نظر را شما ثبت کنید!</p>
            )}
          </div>

          {/* Add Review Form */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-amber-500" />
              <span>ثبت دیدگاه جدید</span>
            </h3>

            {reviewAdded ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 p-4 rounded-xl text-xs font-bold">
                دیدگاه شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">نام و نام خانوادگی:</label>
                    <input
                      type="text"
                      required
                      placeholder="مثلا: علی محمدی"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">امتیاز شما به این محصول:</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-bold focus:outline-none"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (عالی - ۵ از ۵)</option>
                      <option value={4}>⭐⭐⭐⭐ (خوب - ۴ از ۵)</option>
                      <option value={3}>⭐⭐⭐ (متوسط - ۳ از ۵)</option>
                      <option value={2}>⭐⭐ (ضعیف - ۲ از ۵)</option>
                      <option value={1}>⭐ (خیلی ضعیف - ۱ از ۵)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">متن نظر شما:</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="تجربه کاربری خود درباره کیفیت، قیمت و ارزش خرید این محصول را بنویسید..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-amber-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>ثبت نظر</span>
                </button>
              </form>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
