'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

export default function RegisterForm() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  const [form, setForm] = useState({ name: '', phone: '', consent: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    const reg = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'new',
    };
    const existing = JSON.parse(localStorage.getItem('ez_registrations') ?? '[]');
    localStorage.setItem('ez_registrations', JSON.stringify([reg, ...existing]));
    setSubmitted(true);
  };

  const inputClass =
    'w-full bg-white border border-gray-200 rounded-full px-5 py-3.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 text-sm transition-colors';

  if (submitted) {
    return (
      <div className="bg-white/80 rounded-3xl border border-orange-100 p-10 text-center shadow-sm">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {isVi ? 'Đăng ký thành công!' : 'Registration Successful!'}
        </h2>
        <p className="text-gray-500 text-sm">
          {isVi
            ? 'Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. Cảm ơn bạn đã tin tưởng EZ English!'
            : 'We will contact you as soon as possible. Thank you for choosing EZ English!'}
        </p>
      </div>
    );
  }

  return (
    <div>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 sm:p-8 shadow-sm border border-orange-100">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold leading-tight" style={{ color: 'var(--ez-primary)' }}>
              {isVi ? 'Đăng Ký Ngay' : 'Register Now'}
            </h2>
            <p className="text-2xl font-extrabold leading-tight text-gray-800">
              {isVi ? 'Nhận 2 buổi học miễn phí' : 'Get 2 Free Sessions'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              required
              placeholder={isVi ? 'Họ và tên (*)' : 'Full Name (*)'}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />

            {/* Phone */}
            <input
              type="tel"
              required
              placeholder={isVi ? 'Số điện thoại (*)' : 'Phone Number (*)'}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />

            {/* Consent checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="sr-only"
                />
                <div
                  className="w-5 h-5 rounded flex items-center justify-center border-2 transition-colors"
                  style={{
                    backgroundColor: form.consent ? 'var(--ez-primary)' : 'white',
                    borderColor: form.consent ? 'var(--ez-primary)' : '#d1d5db',
                  }}
                >
                  {form.consent && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-500 leading-relaxed">
                {isVi
                  ? 'Bằng việc đăng ký thông tin, bạn đồng ý cho phép EZ English liên lạc thông qua các hình thức: cuộc gọi, tin nhắn, email nhằm mục đích tư vấn các chương trình Anh ngữ.'
                  : 'By registering, you agree to allow EZ English to contact you via call, SMS, or email for English program consultation purposes.'}
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={!form.consent}
              className="w-full py-4 rounded-full text-white font-bold text-sm tracking-widest uppercase transition-all hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-3"
              style={{ backgroundColor: 'var(--ez-primary)' }}
            >
              {isVi ? 'Đăng Ký Ngay' : 'Register Now'}
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            </button>
          </form>
        </div>
    </div>
  );
}
