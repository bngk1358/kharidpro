import React from 'react';
import { Article, Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Clock, User, Calendar, ArrowRight, Share2, BookOpen, ShoppingBag } from 'lucide-react';

interface ArticleDetailPageProps {
  article: Article;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (product: Product, e: React.MouseEvent) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  allProducts,
  onBack,
  onSelectProduct,
  favorites,
  onToggleFavorite,
}) => {
  const recommended = allProducts.filter((p) =>
    article.recommendedProductIds.includes(p.id)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Header */}
      <button
        onClick={onBack}
        className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2"
      >
        <ArrowRight className="w-4 h-4" />
        <span>بازگشت به آرشیو مقالات</span>
      </button>

      {/* Article Cover & Header */}
      <article className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8">
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-amber-500/10 text-amber-700 font-extrabold px-3 py-1 rounded-full border border-amber-500/20">
              {article.categoryName}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>زمان مطالعه: {article.readTime}</span>
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{article.publishDate}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            {article.title}
          </h1>

          {/* Author info card */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <img
              src={article.authorAvatar}
              alt={article.author}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{article.author}</h4>
              <p className="text-xs text-slate-500">{article.authorRole}</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden aspect-video bg-slate-100 border border-slate-100">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Main Text Content */}
        <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-['Vazirmatn']">
          <p className="font-bold text-slate-900 text-base leading-relaxed bg-slate-50 p-4 rounded-2xl border-r-4 border-amber-500">
            {article.summary}
          </p>

          <div
            className="space-y-4 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }}
          ></div>
        </div>

      </article>

      {/* Recommended Products Box */}
      {recommended.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-slate-900 text-xl">محصولات پیشنهادی این مقاله با مقایسه قیمت</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recommended.map((product) => (
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
      )}

    </div>
  );
};
