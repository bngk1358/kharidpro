import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-3 border border-slate-800 shadow-lg">
        <h1 className="text-2xl sm:text-4xl font-black">ارتباط با تیم پشتیبانی خرید پرو</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          انتقادات، پیشنهادات و نظرات شما راهنمای ما در بهبود خدمات مقایسه قیمت است.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
            <h3 className="font-black text-slate-900 text-lg border-b border-slate-100 pb-3">اطلاعات تماس</h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">دفتر مرکزی:</h4>
                  <p className="text-slate-600 leading-relaxed">تهران، خیابان ولیعصر، نرسیده به میدان ونک، برج فناوری خرید پرو</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">شماره تماس پشتیبانی:</h4>
                  <p className="text-slate-600 dir-ltr text-right">۰۲۱ - ۸۸۸۸۹۹۰۰</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">پست الکترونیکی:</h4>
                  <p className="text-slate-600 font-mono">info@kharidpro.ir</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">ساعات کاری:</h4>
                  <p className="text-slate-600">شنبه تا چهارشنبه: ۹:۰۰ الی ۱۸:۰۰</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="font-black text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-500" />
            <span>ارسال پیام مستقیم</span>
          </h3>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 p-6 rounded-2xl space-y-2 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-base">پیام شما با موفقیت دریافت شد!</h4>
              <p className="text-xs text-slate-600">کارشناسان ما حداکثر طی ۲۴ ساعت کاری با شما تماس خواهند گرفت.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                ارسال پیام جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">نام و نام خانوادگی:</label>
                  <input
                    type="text"
                    required
                    placeholder="نام کامل شما"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">ایمیل:</label>
                  <input
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">موضوع پیام:</label>
                <input
                  type="text"
                  placeholder="موضوع درخواست یا پیشنهاد"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">متن پیام:</label>
                <textarea
                  rows={5}
                  required
                  placeholder="متن پیام خود را بنویسید..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-md shadow-amber-500/20"
              >
                <Send className="w-4 h-4" />
                <span>ارسال پیام</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
