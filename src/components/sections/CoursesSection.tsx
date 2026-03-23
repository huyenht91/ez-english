'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Course {
  key: string;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  levels: string;
  icon: string;
}

const COLORS = [
  { color: '#FF6B35', bg: '#FFF3EE' },
  { color: '#F5A623', bg: '#FFF9EE' },
  { color: '#4CAF50', bg: '#F0FFF0' },
  { color: '#7B61FF', bg: '#F3F0FF' },
  { color: '#E91E8C', bg: '#FFF0F8' },
  { color: '#00BCD4', bg: '#F0FDFF' },
];

const DEFAULT_COURSES: Course[] = [
  {
    key: 'grammar',
    nameVi: 'Lớp Ngữ pháp',
    nameEn: 'Grammar Class',
    descVi: 'Chương trình Ngữ pháp tiếng Anh từ cơ bản đến nâng cao, giúp học viên nắm vững nền tảng và tự tin giao tiếp',
    descEn: 'English grammar from beginner to advanced, building a strong foundation for confident communication',
    levels: 'Lớp 3, Lớp 4, Lớp 5, Lớp 6, Lớp 7',
    icon: '🎯',
  },
  {
    key: 'cambridge',
    nameVi: 'Cambridge',
    nameEn: 'Cambridge',
    descVi: 'Chứng chỉ Cambridge quốc tế, được công nhận toàn cầu',
    descEn: 'International Cambridge certificates recognized worldwide',
    levels: 'Starters, Movers, Flyers, KET, PET',
    icon: '🏆',
  },
  {
    key: 'kids',
    nameVi: 'Câu lạc bộ tiếng Anh',
    nameEn: 'Kids Speaking Club',
    descVi: 'Môi trường học vui vẻ, giúp trẻ tự tin giao tiếp tiếng Anh',
    descEn: 'A fun environment helping children speak English confidently',
    levels: '5–7 tuổi, 8–10 tuổi, 11–12 tuổi',
    icon: '⭐',
  },
];

export default function CoursesSection({ locale, title, subtitle }: { locale: string; title: string; subtitle: string }) {
  const [courses, setCourses] = useState<Course[]>(DEFAULT_COURSES);

  useEffect(() => {
    supabase.from('courses').select('*').order('id').then(({ data }) => {
      if (data && data.length > 0) {
        setCourses(data.map((d) => ({
          key: d.key, icon: d.icon, levels: d.levels,
          nameVi: d.name_vi, nameEn: d.name_en,
          descVi: d.desc_vi, descEn: d.desc_en,
        })) as Course[]);
      }
    });
  }, []);

  const isVi = locale === 'vi';

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-500 mt-2">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course, i) => {
            const { color, bg } = COLORS[i % COLORS.length];
            return (
              <div
                key={course.key}
                className="group rounded-2xl p-6 border border-transparent hover:border-orange-200 hover:shadow-lg transition-all duration-200"
                style={{ backgroundColor: bg }}
              >
                <div className="text-4xl mb-4">{course.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {isVi ? course.nameVi : (course.nameEn || course.nameVi)}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {isVi ? course.descVi : (course.descEn || course.descVi)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{ backgroundColor: color + '20', color }}>
                    {course.levels}
                  </span>
                  <Link
                    href={`/${locale}/courses`}
                    className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                    style={{ color }}
                  >
                    {isVi ? 'Xem thêm' : 'Learn more'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
