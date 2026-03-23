import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MOCK_EVENTS, TAG_COLORS } from '@/data/events';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === 'vi';
  return {
    title: isVi ? 'Tin tức & Sự kiện' : 'News & Events',
    description: isVi
      ? 'Cập nhật tin tức, sự kiện và thông báo mới nhất từ EZ English Hạ Long.'
      : 'Latest news, events and announcements from EZ English Ha Long.',
    openGraph: {
      title: isVi ? 'Tin tức & Sự kiện | EZ English' : 'News & Events | EZ English',
      description: isVi ? 'Cập nhật tin tức và sự kiện mới nhất từ EZ English.' : 'Latest news and events from EZ English.',
    },
  };
}

export default async function ActivitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'activities' });
  const items = MOCK_EVENTS[locale as 'vi' | 'en'] ?? MOCK_EVENTS.vi;

  const events = items.filter((i) => i.type === 'event');
  const announcements = items.filter((i) => i.type === 'announcement');
  const news = items.filter((i) => i.type === 'news');

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="py-16" style={{ backgroundColor: 'var(--ez-cream)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">{t('title')}</h1>
          </div>
        </section>

        {/* Events */}
        <section id="events" className="py-12 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              📅 {t('events')}
            </h2>
            <div className="space-y-6">
              {events.map((ev) => {
                const colors = TAG_COLORS[ev.tag] ?? { bg: '#FFF3EE', text: '#FF6B35' };
                if (ev.image) {
                  return (
                    <div key={ev.id} className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        <div className="relative h-52 sm:h-64 md:h-auto bg-orange-50">
                          <Image src={ev.image} alt={ev.title} fill className="object-cover" />
                        </div>
                        <div className="p-6 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: colors.bg, color: colors.text }}>
                              {ev.tag}
                            </span>
                            <span className="text-xs text-gray-400">{ev.date}</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-3">{ev.title}</h3>
                          <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {ev.fullContent}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={ev.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-36 flex items-center justify-center text-5xl" style={{ backgroundColor: 'var(--ez-cream)' }}>
                      🎉
                    </div>
                    <div className="p-5">
                      <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2"
                        style={{ backgroundColor: colors.bg, color: colors.text }}>
                        {ev.tag}
                      </span>
                      <h3 className="font-bold text-gray-800 mb-1">{ev.title}</h3>
                      <p className="text-xs text-gray-400 mb-3">{ev.date}</p>
                      <p className="text-sm text-gray-600">{ev.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Announcements */}
        <section id="announcements" className="py-12 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              📢 {locale === 'vi' ? 'Thông báo' : 'Announcements'}
            </h2>
            <div className="space-y-6">
              {announcements.map((item) => {
                const colors = TAG_COLORS[item.tag] ?? { bg: '#fff3e0', text: 'var(--ez-primary)' };
                if (item.image) {
                  return (
                    <div key={item.id} className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        <div className="relative h-52 sm:h-64 md:h-auto bg-orange-50">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="p-6 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: colors.bg, color: colors.text }}>
                              {item.tag}
                            </span>
                            <span className="text-xs text-gray-400">{item.date}</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h3>
                          <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{item.fullContent}</div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={item.id} className="bg-white rounded-2xl p-5 border border-orange-100 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">📣</div>
                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: colors.bg, color: colors.text }}>
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3 ml-9">{item.date}</p>
                    <div className="ml-9 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {item.fullContent ?? item.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* News */}
        <section id="news" className="py-12 scroll-mt-20" style={{ backgroundColor: 'var(--ez-cream)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              📰 {t('news')}
            </h2>
            <div className="space-y-6">
              {news.map((item) => {
                const colors = TAG_COLORS[item.tag] ?? { bg: '#fff3e0', text: 'var(--ez-primary)' };
                if (item.image) {
                  return (
                    <div key={item.id} className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        <div className="relative h-72 md:h-auto bg-orange-50 flex items-center justify-center">
                          <Image src={item.image!} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="p-6 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: colors.bg, color: colors.text }}>
                              {item.tag}
                            </span>
                            <span className="text-xs text-gray-400">{item.date}</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h3>
                          <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {item.fullContent}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={item.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">📣</div>
                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: colors.bg, color: colors.text }}>
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3 ml-9">{item.date}</p>
                    <div className="ml-9 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {item.fullContent ?? item.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
