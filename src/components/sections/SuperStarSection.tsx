'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { SUPER_STARS_VI, type SuperStar, SUPERSTARS_STORAGE_KEY } from '@/data/superstars';

const CARD_GAP = 24;
const PAUSE_MS = 4000;
const SLIDE_MS = 500;

function StarCard({ star }: { star: SuperStar }) {
  return (
    <div
      className="relative rounded-2xl p-6 text-center border border-orange-100 hover:shadow-lg transition-shadow duration-200 h-full"
      style={{ backgroundColor: 'var(--ez-cream)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: star.color }} />
      <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden shadow-sm"
        style={{ border: `3px solid ${star.color}40` }}>
        {star.image ? (
          <Image src={star.image} alt={star.name} width={80} height={80} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: star.color + '20' }}>
            {star.avatar}
          </div>
        )}
      </div>
      <h3 className="font-bold text-gray-800 text-base mb-1">{star.name}</h3>
      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
        style={{ backgroundColor: star.color + '15', color: star.color }}>
        {star.achievement}
      </span>
      <div className="relative">
        <Quote className="w-4 h-4 absolute -top-1 -left-1 opacity-20" style={{ color: star.color }} />
        <p className="text-xs text-gray-500 italic leading-relaxed pl-3">{star.quote}</p>
      </div>
    </div>
  );
}

function StarCarousel({ stars }: { stars: SuperStar[] }) {
  const [index, setIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);

  // Pad with clones: 4 at end for forward loop, 4 at start for backward
  const clonesBefore = stars.slice(-4);
  const clonesAfter = stars.slice(0, 4);
  const extended = [...clonesBefore, ...stars, ...clonesAfter];
  // Real items start at offset 4
  const OFFSET = 4;

  const measureCard = useCallback(() => {
    if (!wrapperRef.current) return;
    const w = wrapperRef.current.offsetWidth;
    setCardWidth((w - CARD_GAP * 3) / 4);
  }, []);

  useEffect(() => {
    measureCard();
    window.addEventListener('resize', measureCard);
    return () => window.removeEventListener('resize', measureCard);
  }, [measureCard]);

  // Translate to the correct position (OFFSET + index)
  const translateX = cardWidth > 0 ? (OFFSET + index) * (cardWidth + CARD_GAP) : 0;

  const slideTo = useCallback((next: number, withAnim = true) => {
    if (sliding) return;
    setSliding(withAnim);
    setIndex(next);
  }, [sliding]);

  // After slide animation, silently reset if we're in clone territory
  useEffect(() => {
    if (!sliding) return;
    const t = setTimeout(() => {
      setSliding(false);
      // If overshot forward into clones after
      if (index >= stars.length) {
        setIndex(index - stars.length);
      }
      // If overshot backward into clones before
      if (index < 0) {
        setIndex(index + stars.length);
      }
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [sliding, index, stars.length]);

  const goNext = useCallback(() => {
    if (sliding) return;
    pausedRef.current = true;
    slideTo(index + 1);
    // Resume auto after 8s of inactivity
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { pausedRef.current = false; }, 8000);
  }, [index, sliding, slideTo]);

  const goPrev = useCallback(() => {
    if (sliding) return;
    pausedRef.current = true;
    slideTo(index - 1);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { pausedRef.current = false; }, 8000);
  }, [index, sliding, slideTo]);

  // Auto-play
  useEffect(() => {
    const schedule = () => {
      timerRef.current = setTimeout(() => {
        if (!pausedRef.current) slideTo(index + 1);
        schedule();
      }, PAUSE_MS);
    };
    schedule();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [index, slideTo]);

  const dotIndex = ((index % stars.length) + stars.length) % stars.length;

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={goPrev}
        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-orange-200 shadow-md flex items-center justify-center text-gray-500 hover:text-white hover:border-transparent transition-all duration-200"
        style={{ ['--hover-bg' as string]: 'var(--ez-primary)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--ez-primary)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Track */}
      <div
        ref={wrapperRef}
        className="overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div
          className="flex"
          style={{
            gap: CARD_GAP,
            transform: `translateX(-${translateX}px)`,
            transition: sliding ? `transform ${SLIDE_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` : 'none',
          }}
        >
          {extended.map((star, i) => (
            <div key={`${star.id}-${i}`} style={{ width: cardWidth || 260, flexShrink: 0 }}>
              <StarCard star={star} />
            </div>
          ))}
        </div>
      </div>

      {/* Right arrow */}
      <button
        onClick={goNext}
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-orange-200 shadow-md flex items-center justify-center text-gray-500 hover:text-white hover:border-transparent transition-all duration-200"
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--ez-primary)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {stars.map((_, i) => (
          <button
            key={i}
            onClick={() => slideTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === dotIndex ? 24 : 8,
              height: 8,
              backgroundColor: i === dotIndex ? 'var(--ez-primary)' : '#e5e7eb',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function SuperStarSection({ locale }: { locale: string }) {
  const [stars, setStars] = useState<SuperStar[]>(SUPER_STARS_VI);

  useEffect(() => {
    const saved = localStorage.getItem(SUPERSTARS_STORAGE_KEY);
    if (saved) setStars(JSON.parse(saved) as SuperStar[]);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: '#fff3e0', color: 'var(--ez-primary)' }}>
            <Star className="w-4 h-4 fill-current" />
            {locale === 'vi' ? 'Học viên tiêu biểu' : 'Star Students'}
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {locale === 'vi' ? '⭐ SUPER STAR EZ ENGLISH' : '⭐ EZ ENGLISH SUPER STARS'}
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">
            {locale === 'vi'
              ? 'Những học viên xuất sắc đã chinh phục các kỳ thi và toả sáng cùng EZ English'
              : 'Outstanding students who conquered their exams and shone with EZ English'}
          </p>
        </div>

        {stars.length > 4 ? (
          <div className="px-6">
            <StarCarousel stars={stars} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stars.map((star) => (
              <StarCard key={star.id} star={star} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
