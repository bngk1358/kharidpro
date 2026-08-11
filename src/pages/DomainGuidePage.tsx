import React, { useState } from 'react';
import { Globe, Check, Copy, ShieldCheck, ArrowRight, Server, Terminal, ExternalLink, HelpCircle } from 'lucide-react';

export const DomainGuidePage: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const dnsRecords = [
    { type: 'A', name: '@ (یا kharidpro.ir)', value: '185.143.233.10', ttl: '3600 (خودکار)' },
    { type: 'A', name: '@ (یا kharidpro.ir)', value: '185.143.233.11', ttl: '3600 (خودکار)' },
    { type: 'CNAME', name: 'www', value: 'kharidpro.ir', ttl: '3600 (خودکار)' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-3xl space-y-3 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
          <Globe className="w-5 h-5" />
          <span>تنظیمات دامنه اختصاصی kharidpro.ir</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">راهنمای اتصال گام‌به‌گام دامنه IR به خرید پرو</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          برای فعال‌سازی دامنه kharidpro.ir بر روی این وب‌سایت، مراحل زیر را در پنل ایرنیک (IRNIC) یا کلودفلر (Cloudflare) انجام دهید.
        </p>
      </div>

      {/* Step 1 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 bg-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center text-sm">
            ۱
          </div>
          <h3 className="font-bold text-slate-900 text-base">تنظیم رکورد‌های DNS (DNS Records)</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          وارد پنل مدیریت DNS دامنه خود در سایت ارائه دهنده شوید و رکوردهای زیر را دقیقا ایجاد کنید:
        </p>

        {/* DNS Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-white font-bold">
              <tr>
                <th className="p-3">نوع رکورد (Type)</th>
                <th className="p-3">نام (Host/Name)</th>
                <th className="p-3">مقدار (Value/IP)</th>
                <th className="p-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-slate-50 font-mono text-slate-800">
              {dnsRecords.map((rec, idx) => (
                <tr key={idx} className="hover:bg-slate-100">
                  <td className="p-3 font-bold text-amber-600">{rec.type}</td>
                  <td className="p-3">{rec.name}</td>
                  <td className="p-3 font-bold dir-ltr text-right">{rec.value}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => copyToClipboard(rec.value, idx)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold flex items-center gap-1 mx-auto"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === idx ? 'کپی شد' : 'کپی'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Step 2 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 bg-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center text-sm">
            ۲
          </div>
          <h3 className="font-bold text-slate-900 text-base">انتظار برای انتشار DNS و فعال‌سازی SSL</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          پس از ثبت رکوردهای فوق، انتشار نهایی DNS برای دامنه‌های .ir بین ۲ تا ۲۴ ساعت زمان می‌برد. گواهی امنیتی SSL (HTTPS) به صورت خودکار و رایگان صادر خواهد شد.
        </p>

        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>پشتیبانی کامل از پروتکل HTTPS با گواهینامه رایگان Let's Encrypt</span>
        </div>
      </div>

    </div>
  );
};
