'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Mail, Clock, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const localizedHref = (href: string) => `/${locale}${href}`;

  return (
    <footer className="text-white mt-auto" style={{ backgroundColor: '#2D2D2D' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: 'var(--ez-primary)' }}
              >
                EZ
              </div>
              <span className="font-bold text-xl text-white">EZ ENGLISH 🫧</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {locale === 'vi'
                ? 'Trung tâm Anh ngữ uy tín với các chương trình Lớp Ngữ pháp, Cambridge và Câu lạc bộ tiếng Anh cho trẻ em.'
                : 'A trusted English center offering Grammar Class, Cambridge, and Kids Speaking Club programs.'}
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://web.facebook.com/anhnguez"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-orange-500 transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              {locale === 'vi' ? 'Liên kết nhanh' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {[
                { key: 'home', href: '/' },
                { key: 'ielts', href: '/courses/ielts' },
                { key: 'cambridge', href: '/courses/cambridge' },
                { key: 'kids', href: '/courses/kids' },
                { key: 'activities', href: '/activities' },
                { key: 'hiring', href: '/hiring' },
              ].map((link) => (
                <li key={link.key}>
                  <Link
                    href={localizedHref(link.href)}
                    className="text-gray-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              {locale === 'vi' ? 'Liên hệ' : 'Contact'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--ez-primary)' }} />
                <span className="text-gray-400 text-sm">
                  Số 7 phố Trần Cao Vân, Hồng Hà, Hạ Long, Quảng Ninh (sau chợ cột 5 cũ)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--ez-primary)' }} />
                <a href="tel:0943906204" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
                  0943.906.204
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-base flex-shrink-0">💬</span>
                <div className="text-sm">
                  <span className="text-gray-500 text-xs block">Zalo</span>
                  <a href="https://zalo.me/0989153204" target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-400 transition-colors">
                    0989.153.204
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--ez-primary)' }} />
                <span className="text-gray-400 text-sm">{t('hoursValue')}</span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              {locale === 'vi' ? 'Bản đồ' : 'Map'}
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/10" style={{ height: '160px' }}>
              <iframe
                src="https://maps.google.com/maps?q=Số+7+Trần+Cao+Vân,+Hồng+Hà,+Hạ+Long,+Quảng+Ninh&output=embed"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EZ English location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">{t('copyright')}</p>
          <Link
            href={localizedHref('/test')}
            className="text-xs font-medium px-4 py-1.5 rounded-full transition-colors text-white"
            style={{ backgroundColor: 'var(--ez-primary)' }}
          >
            {locale === 'vi' ? 'Làm bài kiểm tra thử' : 'Take Mock Test'}
          </Link>
        </div>
      </div>
    </footer>
  );
}
