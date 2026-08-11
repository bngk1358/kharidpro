import React, { useState } from 'react';
import { CouponCard } from '../components/CouponCard';
import { Coupon, PartnerStore } from '../types';
import { STORES } from '../data/mockData';
import { Tag, Search, ShieldCheck } from 'lucide-react';

interface CouponsPageProps {
  coupons: Coupon[];
  stores?: PartnerStore[];
}

export const CouponsPage: React.FC<CouponsPageProps> = ({ coupons, stores }) => {
  const storeList = stores && stores.length > 0 ? stores : STORES;
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredCoupons = coupons.filter((c) => {
    if (selectedStore !== 'all' && c.storeId !== selectedStore) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.code.toLowerCase().includes(q) ||
        c.discountTitle.toLowerCase().includes(q) ||
        c.storeName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-3 border border-slate-800 shadow-lg">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
          <Tag className="w-5 h-5" />
          <span>مرجع کدهای تخفیف واقعی</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">کدهای تخفیف تأییدشده دیجی‌کالا و تکنولایف</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          تمامی کدها به صورت روزانه توسط کارشناسان خرید پرو تست و اعتبارسنجی شده‌اند.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Stores Filter */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 text-xs">
          <button
            onClick={() => setSelectedStore('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
              selectedStore === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            همه فروشگاه‌ها
          </button>
          {storeList.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStore(s.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                selectedStore === s.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s.faName}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-64 relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          <input
            type="text"
            placeholder="جستجوی کد تخفیف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-400"
          />
        </div>

      </div>

      {/* Coupons Grid */}
      {filteredCoupons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
          کد تخفیفی با این مشخصات یافت نشد.
        </div>
      )}

    </div>
  );
};
