'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { MOCK_EVENTS, TAG_COLORS, type NewsItem } from '@/data/events';

const EZ_NEWS_KEY = 'ez_news';

export default function EventsSection({ locale, title, viewAll }: { locale: string; title: string; viewAll: string }) {
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(EZ_NEWS_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
        return;
      } catch {}
    }
    setItems(MOCK_EVENTS[locale as 'vi' | 'en'] ?? MOCK_EVENTS.vi);
  }, [locale]);

  const latestEvents = [...items]
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate))
    .slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <Link href={`/${locale}/activities#events`}
            className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
            style={{ color: 'var(--ez-primary)' }}>
            {viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestEvents.map((ev) => {
            const colors = TAG_COLORS[ev.tag] ?? { bg: '#FFF3EE', text: '#FF6B35' };
            const section = ev.type === 'announcement' ? 'announcements' : ev.type === 'news' ? 'news' : 'events';
            return (
              <Link key={ev.id} href={`/${locale}/activities#${section}`}
                className="rounded-2xl border border-orange-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 relative overflow-hidden" style={{ backgroundColor: 'var(--ez-cream)' }}>
                  {ev.image
                    ? <Image src={ev.image} alt={ev.title} fill className="object-cover" />
                    : <span className="absolute inset-0 flex items-center justify-center text-5xl">📅</span>
                  }
                </div>
                <div className="p-4">
                  <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2"
                    style={{ backgroundColor: colors.bg, color: colors.text }}>
                    {ev.tag}
                  </span>
                  <h3 className="font-semibold text-gray-800 mb-1">{ev.title}</h3>
                  <p className="text-xs text-gray-500">{ev.date}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
