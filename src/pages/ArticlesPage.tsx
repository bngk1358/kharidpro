import React, { useState } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { Article } from '../types';
import { CATEGORIES } from '../data/mockData';
import { BookOpen, Search } from 'lucide-react';

interface ArticlesPageProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ articles, onSelectArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredArticles = articles.filter((art) => {
    if (selectedCategory !== 'all' && art.categoryId !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-3 border border-slate-800 shadow-lg">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
          <BookOpen className="w-5 h-5" />
          <span>مجله تخصصی خرید پرو</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">راهنماهای تخصصی خرید و تحلیل بازار</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          مقالات کاربردی جهت انتخاب بهترین گوشی، لپ‌تاپ، هدفون و ساعت هوشمند متناسب با بودجه شما.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            همه مقالات
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                selectedCategory === c.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full sm:w-64 relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          <input
            type="text"
            placeholder="جستجو در مقالات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-400"
          />
        </div>

      </div>

      {/* Grid Display */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} onSelect={onSelectArticle} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
          مقاله مورد نظر یافت نشد.
        </div>
      )}

    </div>
  );
};
