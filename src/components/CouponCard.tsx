import React, { useState } from 'react';
import { Copy, Check, ExternalLink, ShieldCheck, Tag, Clock } from 'lucide-react';
import { Coupon } from '../types';
import { toFaDigit } from '../data/mockData';

interface CouponCardProps {
  coupon: Coupon;
}

export const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 relative overflow-hidden group">
      {/* Top Accent Line */}
      <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600"></div>

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={coupon.storeLogo}
            alt={coupon.storeName}
            className="w-12 h-12 object-cover rounded-xl border border-slate-200 shadow-sm bg-slate-50"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-slate-900 text-sm">{coupon.storeName}</h4>
              {coupon.isVerified && (
                <span className="bg-emerald-500/10 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  <span>تأییدشده</span>
                </span>
              )}
            </div>
            {coupon.category && (
              <span className="text-[11px] text-slate-500 mt-0.5 block">{coupon.category}</span>
            )}
          </div>
        </div>

        <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-sm">
          {coupon.discountAmount}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="font-bold text-slate-800 text-sm leading-snug">{coupon.discountTitle}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{coupon.discountDescription}</p>
      </div>

      {/* Code Box & Expiry */}
      <div className="pt-2 border-t border-slate-100 space-y-3">
        <div className="bg-slate-900 text-white p-2.5 rounded-xl flex items-center justify-between border border-slate-800">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-amber-300 font-bold tracking-wider text-sm select-all">
              {coupon.code}
            </span>
          </div>

          <button
            onClick={handleCopyCode}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              copied
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>کپی شد!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>کپی کد</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>اعتبار تا: {coupon.expiryDate}</span>
          </span>

          <a
            href={coupon.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
          >
            <span>استفاده در {coupon.storeName}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
