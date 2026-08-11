import React from 'react';
import { BookOpen, Clock, User, ArrowUpLeft } from 'lucide-react';
import { Article } from '../types';
import { toFaDigit } from '../data/mockData';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(article)}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-sm text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-700">
          {article.categoryName}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>زمان مطالعه: {article.readTime}</span>
            </span>
            <span>•</span>
            <span>{article.publishDate}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={article.authorAvatar}
              alt={article.author}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <span className="text-xs font-semibold text-slate-700">{article.author}</span>
          </div>

          <span className="text-xs font-bold text-amber-600 group-hover:text-amber-700 flex items-center gap-1">
            <span>مطالعه مقاله</span>
            <ArrowUpLeft className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};
