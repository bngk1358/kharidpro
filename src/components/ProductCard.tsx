import React from 'react';
import { Star, TrendingDown, Award, Bookmark, ArrowUpLeft, Store, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { formatToman, toFaDigit } from '../data/mockData';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isFavorite,
  onToggleFavorite,
}) => {
  const lowestStore = product.stores.find((s) => s.isLowest) || product.stores[0];

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Card Header Media */}
      <div className="relative aspect-square bg-slate-50 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
        
        {/* Badges Overlay */}
        <div className="absolute top-3 right-3 z-10 flex flex-col items-start gap-1.5">
          {product.isPriceDrop && product.priceDropPercentage && (
            <span className="bg-rose-500 text-white font-extrabold text-[11px] px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{toFaDigit(product.priceDropPercentage)}٪ ارزان‌تر شد</span>
            </span>
          )}
          {product.isEditorChoice && (
            <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-lg shadow flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>انتخاب سردبیر</span>
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleFavorite(product, e)}
          className={`absolute top-3 left-3 z-10 p-2 rounded-full transition-all backdrop-blur-sm ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-slate-400 hover:text-rose-500 border border-slate-200'
          }`}
          title={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
        >
          <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.faTitle}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Brand Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium text-[11px]">
              {product.categoryName}
            </span>
            <span className="font-semibold text-slate-400">{product.brand}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">
            {product.faTitle}
          </h3>
        </div>

        {/* Rating & Stores Info */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{toFaDigit(product.rating)}</span>
              <span className="text-slate-400 font-normal">({toFaDigit(product.reviewsCount)})</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Store className="w-3.5 h-3.5 text-slate-400" />
              <span>{toFaDigit(product.stores.length)} فروشگاه</span>
            </div>
          </div>

          {/* Price Block */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 block font-medium">کمترین قیمت در {lowestStore?.storeName}:</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black text-slate-900">
                  {toFaDigit(lowestStore?.price.toLocaleString('fa-IR'))}
                </span>
                <span className="text-[11px] text-slate-500">تومان</span>
              </div>
            </div>

            {lowestStore?.oldPrice && (
              <span className="text-xs text-slate-400 line-through decoration-rose-500/60 font-medium">
                {toFaDigit(lowestStore.oldPrice.toLocaleString('fa-IR'))}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(product)}
          className="w-full bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-xs py-2.5 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 group-hover:shadow-md"
        >
          <span>مشاهده و مقایسه قیمت‌ها</span>
          <ArrowUpLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
