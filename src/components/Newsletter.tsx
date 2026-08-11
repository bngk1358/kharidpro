import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { saveNewsletterEmail } from '../data/mockData';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('لطفا یک آدرس ایمیل معتبر وارد کنید.');
      return;
    }

    const success = saveNewsletterEmail(email);
    if (success) {
      setSubmitted(true);
      setErrorMsg('');
      setEmail('');
    } else {
      setErrorMsg('این ایمیل قبلاً در خبرنامه ثبت شده است.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-700 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
        <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20 shadow-inner">
          <Mail className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-white">خبرنامه تخفیف‌ها و افت قیمت‌های ویژه</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
            با عضویت در خبرنامه هفتگی خرید پرو، بهترین پیشنهادهای شگفت‌انگیز و کدهای تخفیف اختصاصی را زودتر از بقیه در ایمیل خود دریافت کنید.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>ایمیل شما با موفقیت در خبرنامه خرید پرو ثبت شد!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="آدرس ایمیل خود را وارد کنید..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-amber-500/20"
              >
                <span>عضویت رایگان</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
            {errorMsg && <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>}
          </form>
        )}

        <p className="text-[11px] text-slate-400">بدون اسپم. هر زمان بخواهید می‌توانید لغو عضویت کنید.</p>
      </div>
    </div>
  );
};
