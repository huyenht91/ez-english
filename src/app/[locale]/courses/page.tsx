import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === 'vi';
  return {
    title: isVi ? 'Khóa học' : 'Courses',
    description: isVi
      ? 'Khám phá các chương trình học tại EZ English: Lớp Ngữ pháp, Cambridge quốc tế và Câu lạc bộ tiếng Anh cho trẻ em.'
      : 'Explore EZ English programs: Grammar Class, Cambridge international certificates, and Kids Speaking Club.',
    openGraph: {
      title: isVi ? 'Khóa học | EZ English' : 'Courses | EZ English',
    },
  };
}

const COURSE_LIST = [
  {
    key: 'ielts',
    href: '/courses/ielts',
    icon: '🎯',
    color: '#FF6B35',
    bg: '#FFF3EE',
    levels: ['Lớp 3', 'Lớp 4', 'Lớp 5', 'Lớp 6', 'Lớp 7'],
  },
  {
    key: 'cambridge',
    href: '/courses/cambridge',
    icon: '🏆',
    color: '#F5A623',
    bg: '#FFF9EE',
    levels: ['Starters', 'Movers', 'Flyers', 'KET', 'PET'],
  },
  {
    key: 'kids',
    href: '/courses/kids',
    icon: '⭐',
    color: '#4CAF50',
    bg: '#F0FFF0',
    levels: ['5–7 tuổi', '8–10 tuổi', '11–12 tuổi'],
  },
];

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'courses' });

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="py-16" style={{ backgroundColor: 'var(--ez-cream)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">{t('title')}</h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              {locale === 'vi'
                ? 'Chọn chương trình phù hợp với độ tuổi và mục tiêu của bạn'
                : 'Choose the program that fits your age and goals'}
            </p>
          </div>
        </section>

        {/* Course cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {COURSE_LIST.map((course) => (
              <div key={course.key} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="h-40 flex items-center justify-center text-6xl" style={{ backgroundColor: course.bg }}>
                  {course.icon}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{t(`${course.key}.name`)}</h2>
                  <p className="text-gray-500 text-sm mb-4">{t(`${course.key}.description`)}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.levels.map((level) => (
                      <span key={level} className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ backgroundColor: course.color + '20', color: course.color }}>
                        {level}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/${locale}${course.href}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: course.color }}
                  >
                    {locale === 'vi' ? 'Xem chi tiết' : 'View details'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
