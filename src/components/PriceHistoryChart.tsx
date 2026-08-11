import React from 'react';
import { TrendingDown, Calendar, ArrowDownRight } from 'lucide-react';
import { toFaDigit } from '../data/mockData';

interface PriceHistoryChartProps {
  history: { date: string; price: number }[];
}

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ history }) => {
  if (!history || history.length === 0) return null;

  const prices = history.map((h) => h.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const currentPrice = prices[prices.length - 1];
  const startPrice = prices[0];
  const totalDrop = startPrice - currentPrice;
  const dropPercentage = Math.round((totalDrop / startPrice) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">تاریخچه تغییرات قیمت (۳۰ روز گذشته)</h3>
        </div>

        {totalDrop > 0 && (
          <span className="bg-emerald-500/10 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
            <ArrowDownRight className="w-4 h-4" />
            <span>کاهش {toFaDigit(dropPercentage)}٪ ({toFaDigit(totalDrop.toLocaleString('fa-IR'))} تومان)</span>
          </span>
        )}
      </div>

      {/* Visual Bars for Price trend */}
      <div className="pt-4 pb-2">
        <div className="flex items-end justify-between gap-3 h-36 px-2 border-b border-slate-200">
          {history.map((item, index) => {
            // Calculate height percentage relative to range
            const range = maxPrice - minPrice || 1;
            const heightPercent = Math.max(25, Math.min(100, ((item.price - minPrice) / range) * 75 + 25));
            const isLowest = item.price === minPrice;

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                  {toFaDigit(item.price.toLocaleString('fa-IR'))} تومان
                </span>

                <div className="w-full max-w-[36px] bg-slate-100 rounded-t-lg relative flex items-end justify-center overflow-hidden h-full">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full transition-all duration-500 rounded-t-md ${
                      isLowest
                        ? 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                        : 'bg-gradient-to-t from-slate-700 to-slate-500'
                    }`}
                  ></div>
                </div>

                <span className="text-[11px] font-medium text-slate-500 flex items-center gap-0.5">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {item.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl">
        <span>کمترین قیمت ثبت‌شده: <strong className="text-emerald-600">{toFaDigit(minPrice.toLocaleString('fa-IR'))} تومان</strong></span>
        <span>بیشترین قیمت ثبت‌شده: <strong className="text-slate-700">{toFaDigit(maxPrice.toLocaleString('fa-IR'))} تومان</strong></span>
      </div>
    </div>
  );
};
