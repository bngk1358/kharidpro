import React from 'react';
import { ExternalLink, ShieldCheck, CheckCircle2, Award, Zap } from 'lucide-react';
import { StorePrice } from '../types';
import { toFaDigit } from '../data/mockData';

interface PriceComparisonTableProps {
  stores: StorePrice[];
  productTitle: string;
}

export const PriceComparisonTable: React.FC<PriceComparisonTableProps> = ({ stores, productTitle }) => {
  // Sort stores by lowest price
  const sortedStores = [...stores].sort((a, b) => a.price - b.price);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
          <h3 className="font-bold text-sm sm:text-base">جدول مقایسه قیمت لحظه‌ای فروشگاه‌های معتبر</h3>
        </div>
        <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30">
          بروزرسانی امروز
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {sortedStores.map((store, index) => {
          const isLowest = index === 0;

          return (
            <div
              key={store.storeId}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                isLowest ? 'bg-amber-500/5' : 'hover:bg-slate-50/80'
              }`}
            >
              {/* Store Brand & Warranty */}
              <div className="flex items-center gap-3">
                <img
                  src={store.logo}
                  alt={store.storeName}
                  className="w-12 h-12 object-cover rounded-xl border border-slate-200 shadow-sm shrink-0 bg-white"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-base">{store.storeName}</h4>
                    {isLowest && (
                      <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Award className="w-3 h-3" />
                        <span>ارزان‌ترین قیمت بازار</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{store.warranty}</span>
                  </div>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <div className="text-right sm:text-left">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-900">
                      {toFaDigit(store.price.toLocaleString('fa-IR'))}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">تومان</span>
                  </div>
                  {store.oldPrice && (
                    <span className="text-xs text-slate-400 line-through decoration-rose-500/60 block">
                      {toFaDigit(store.oldPrice.toLocaleString('fa-IR'))} تومان
                    </span>
                  )}
                </div>

                <a
                  href={store.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm ${
                    isLowest
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>خرید از {store.storeName}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-50 p-3 text-center border-t border-slate-100 text-xs text-slate-500">
        با کلیک روی دکمه خرید، به صورت مستقیم و بدون واسطه مالی به صفحه محصول در فروشگاه مربوطه منتقل می‌شوید.
      </div>
    </div>
  );
};
