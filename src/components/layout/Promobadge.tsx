'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function PromoBadge() {
  const locale = useLocale();
  const pathname = usePathname();
  if (pathname.includes('/dashboard')) return null;

  return (
    <Link
      href={`/${locale}#register`}
      className="fixed top-24 right-0 z-40 group flex flex-col items-center justify-center text-center text-white font-bold shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
      style={{
        backgroundColor: 'var(--ez-primary)',
        width: '72px',
        padding: '12px 8px',
        borderRadius: '12px 0 0 12px',
        lineHeight: 1.2,
      }}
    >
      <span className="text-xs uppercase tracking-wide opacity-90">
        {locale === 'vi' ? 'Nhận' : 'Get'}
      </span>
      <span className="text-2xl font-extrabold leading-none my-0.5">2</span>
      <span className="text-xs font-semibold">
        {locale === 'vi' ? 'buổi' : 'sessions'}
      </span>
      <span className="text-xs font-semibold">
        {locale === 'vi' ? 'học' : 'free'}
      </span>
      <span className="text-xs font-semibold">
        {locale === 'vi' ? 'miễn phí' : 'learning'}
      </span>
      <span className="mt-2 text-lg">🎁</span>
    </Link>
  );
}
