'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

const NAV_LINKS = [
  { key: 'home', href: '/' },
  {
    key: 'courses',
    href: '/courses',
    children: [
      { key: 'ielts', href: '/courses/ielts' },
      { key: 'cambridge', href: '/courses/cambridge' },
      { key: 'kids', href: '/courses/kids' },
    ],
  },
  {
    key: 'activities',
    href: '/activities',
    children: [
      { key: 'events', href: '/activities#events' },
      { key: 'announcements', href: '/activities#announcements' },
      { key: 'news', href: '/activities#news' },
    ],
  },
  { key: 'hiring', href: '/hiring' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  const otherLocale = locale === 'vi' ? 'en' : 'vi';

  const switchLocale = () => {
    const segments = pathname.split('/');
    segments[1] = otherLocale;
    router.push(segments.join('/') || `/${otherLocale}`);
  };

  const localizedHref = (href: string) => `/${locale}${href === '/' ? '' : href}`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={localizedHref('/')} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: 'var(--ez-primary)' }}>
              EZ
            </div>
            <span className="font-bold text-lg hidden sm:block" style={{ color: 'var(--ez-primary)' }}>
              EZ English
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.key} className="relative group">
                  <button
                    className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                    onMouseEnter={() => setCoursesOpen(true)}
                    onMouseLeave={() => setCoursesOpen(false)}
                  >
                    {t(link.key)}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div
                    className="absolute top-full left-0 w-52 bg-white rounded-lg shadow-lg border border-orange-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150"
                    onMouseEnter={() => setCoursesOpen(true)}
                    onMouseLeave={() => setCoursesOpen(false)}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.key}
                        href={localizedHref(child.href)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                      >
                        {t(child.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.key}
                  href={localizedHref(link.href)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  {t(link.key)}
                </Link>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={switchLocale}
              className="flex items-center gap-1 px-2 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-orange-500 border border-gray-200 hover:border-orange-300 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{otherLocale.toUpperCase()}</span>
            </button>

            {/* Mock Test CTA */}
            <button
              onClick={() => router.push(`${localizedHref('/test')}?r=${Date.now()}`)}
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: 'var(--ez-primary)' }}
            >
              {t('mocktest')}
            </button>

            {/* Staff Login */}
            <Link
              href={localizedHref('/dashboard')}
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium border transition-colors"
              style={{ borderColor: 'var(--ez-primary)', color: 'var(--ez-primary)' }}
            >
              {t('login')}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-orange-100 px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <div key={link.key}>
              <Link
                href={localizedHref(link.href)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </Link>
              {link.children?.map((child) => (
                <Link
                  key={child.key}
                  href={localizedHref(child.href)}
                  className="block pl-6 pr-3 py-2 rounded-md text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(child.key)}
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-2 flex gap-2">
            <button
              className="flex-1 text-center px-3 py-2 rounded-md text-sm font-medium text-white"
              style={{ backgroundColor: 'var(--ez-primary)' }}
              onClick={() => { setMobileOpen(false); router.push(`${localizedHref('/test')}?r=${Date.now()}`); }}
            >
              {t('mocktest')}
            </button>
            <Link
              href={localizedHref('/dashboard')}
              className="flex-1 text-center px-3 py-2 rounded-md text-sm font-medium border"
              style={{ borderColor: 'var(--ez-primary)', color: 'var(--ez-primary)' }}
              onClick={() => setMobileOpen(false)}
            >
              {t('login')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
