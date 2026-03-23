import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RegisterForm from '@/components/sections/RegisterForm';
import Image from 'next/image';
import SuperStarSection from '@/components/sections/SuperStarSection';
import { BookOpen, Award, Users, Clock, ArrowRight, Star, Phone } from 'lucide-react';
import CoursesSection from '@/components/sections/CoursesSection';
import EventsSection from '@/components/sections/EventsSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: 'EZ English — ' + t('hero.titleHighlight'),
  };
}

function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('home.hero');
  return (
    <section
      id="register"
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: 'linear-gradient(135deg, #FDF6EC 0%, #fff8f0 50%, #FDF6EC 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10"
        style={{ backgroundColor: 'var(--ez-primary)' }} />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10"
        style={{ backgroundColor: 'var(--ez-secondary)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: headline + CTAs */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: '#fff3e0', color: 'var(--ez-primary)' }}>
              <Star className="w-4 h-4" />
              {locale === 'vi' ? 'Trung tâm Anh ngữ hàng đầu' : 'Leading English Center'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
              {t('title')}{' '}
              <span style={{ color: 'var(--ez-primary)' }}>{t('titleHighlight')}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/courses`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-base transition-all hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: 'var(--ez-primary)' }}
              >
                {t('cta')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/test`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-base border-2 transition-all hover:shadow-md"
                style={{ borderColor: 'var(--ez-primary)', color: 'var(--ez-primary)' }}
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>

          {/* Right: registration form */}
          <div>
            <RegisterForm />
          </div>

        </div>
      </div>
    </section>
  );
}

function StatsBar({ locale }: { locale: string }) {
  const stats = locale === 'vi'
    ? [
        { value: '1,000+', label: 'Học viên' },
        { value: '10+', label: 'Năm kinh nghiệm' },
        { value: '95%', label: 'Đạt mục tiêu' },
        { value: '10+', label: 'Giáo viên' },
      ]
    : [
        { value: '1,000+', label: 'Students' },
        { value: '10+', label: 'Years experience' },
        { value: '95%', label: 'Goal achieved' },
        { value: '10+', label: 'Teachers' },
      ];
  return (
    <section className="py-8 border-y border-orange-100" style={{ backgroundColor: 'var(--ez-cream)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold" style={{ color: 'var(--ez-primary)' }}>{s.value}</div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function WhyUsSection({ locale }: { locale: string }) {
  const t = useTranslations('home.whyUs');
  const features = [
    { key: 'quality', icon: <Award className="w-6 h-6" /> },
    { key: 'flexible', icon: <Clock className="w-6 h-6" /> },
    { key: 'result', icon: <Users className="w-6 h-6" /> },
  ] as const;

  return (
    <section className="py-16" style={{ backgroundColor: 'var(--ez-cream)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">{t('title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.key} className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                style={{ backgroundColor: 'var(--ez-primary)' }}>
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{t(f.key)}</h3>
              <p className="text-gray-500 text-sm">{t(`${f.key}Desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




function ContactBanner({ locale }: { locale: string }) {
  return (
    <section className="py-14 text-white text-center"
      style={{ background: 'linear-gradient(135deg, var(--ez-primary), var(--ez-primary-dark))' }}>
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          {locale === 'vi' ? 'Bạn muốn biết thêm?' : 'Want to know more?'}
        </h2>
        <p className="text-white/80 mb-6">
          {locale === 'vi'
            ? 'Gọi ngay cho chúng tôi để được tư vấn miễn phí!'
            : 'Call us now for a free consultation!'}
        </p>
        <a
          href="tel:0943906204"
          className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full font-bold text-base transition-all hover:shadow-lg hover:scale-105"
          style={{ color: 'var(--ez-primary)' }}
        >
          <Phone className="w-5 h-5" />
          0943.906.204
        </a>
      </div>
    </section>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tCourses = await getTranslations({ locale, namespace: 'home.courses' });
  const tEvents = await getTranslations({ locale, namespace: 'home.events' });

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection locale={locale} />
        <StatsBar locale={locale} />
        <CoursesSection locale={locale} title={tCourses('title')} subtitle={tCourses('subtitle')} />
        <WhyUsSection locale={locale} />
        <SuperStarSection locale={locale} />
        <EventsSection locale={locale} title={tEvents('title')} viewAll={tEvents('viewAll')} />
        <ContactBanner locale={locale} />
      </main>
      <Footer />
    </>
  );
}
