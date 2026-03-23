import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle, ArrowLeft, Phone } from 'lucide-react';

const GRAMMAR_DATA = {
  vi: {
    name: 'Lớp Ngữ pháp',
    subtitle: 'Chương trình Ngữ pháp tiếng Anh từ cơ bản đến nâng cao',
    levels: [
      { label: 'Lớp 3', desc: 'Làm quen từ vựng, cấu trúc câu đơn giản' },
      { label: 'Lớp 4', desc: 'Mở rộng vốn từ và ngữ pháp cơ bản' },
      { label: 'Lớp 5', desc: 'Củng cố nền tảng, luyện viết câu' },
      { label: 'Lớp 6', desc: 'Ngữ pháp trung học cơ sở, thì động từ' },
      { label: 'Lớp 7', desc: 'Ngữ pháp nâng cao, bài tập đa dạng' },
    ],
    highlights: [
      'Giáo viên giàu kinh nghiệm, tận tâm',
      'Lớp học quy mô nhỏ, sát sao từng học viên',
      'Tài liệu học tập được cung cấp đầy đủ',
      'Lịch học linh hoạt, nhiều ca',
      'Kiểm tra định kỳ, phản hồi tiến độ thường xuyên',
    ],
    cta: 'Đăng ký tư vấn',
    back: '← Quay lại Khóa học',
  },
  en: {
    name: 'Grammar Class',
    subtitle: 'English Grammar program from beginner to advanced level',
    levels: [
      { label: 'Grade 3', desc: 'Introduction to vocabulary and simple sentence structures' },
      { label: 'Grade 4', desc: 'Expanding vocabulary and core grammar' },
      { label: 'Grade 5', desc: 'Consolidating foundations and sentence writing' },
      { label: 'Grade 6', desc: 'Middle school grammar, verb tenses' },
      { label: 'Grade 7', desc: 'Advanced grammar with varied exercises' },
    ],
    highlights: [
      'Experienced and dedicated teachers',
      'Small class sizes for individual attention',
      'Full study materials provided',
      'Flexible schedules with multiple sessions',
      'Regular progress tests and feedback',
    ],
    cta: 'Book a Consultation',
    back: '← Back to Courses',
  },
};

export default async function GrammarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = GRAMMAR_DATA[locale as 'vi' | 'en'] ?? GRAMMAR_DATA.vi;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="py-16" style={{ backgroundColor: 'var(--ez-cream)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={`/${locale}/courses`}
              className="inline-flex items-center gap-1 text-sm mb-6 hover:underline"
              style={{ color: 'var(--ez-primary)' }}>
              <ArrowLeft className="w-4 h-4" />
              {data.back.replace('← ', '')}
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-5xl">🎯</div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">{data.name}</h1>
                <p className="text-gray-500 mt-1">{data.subtitle}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Levels */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {locale === 'vi' ? 'Phân loại lớp học' : 'Class Levels'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {data.levels.map((level) => (
                <div key={level.label}
                  className="rounded-xl p-4 border border-orange-100 hover:shadow-sm transition-shadow"
                  style={{ backgroundColor: 'var(--ez-cream)' }}>
                  <div className="font-bold text-gray-800 mb-1"
                    style={{ color: '#FF6B35' }}>{level.label}</div>
                  <p className="text-xs text-gray-500">{level.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-12" style={{ backgroundColor: 'var(--ez-cream)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {locale === 'vi' ? 'Điểm nổi bật' : 'Highlights'}
            </h2>
            <ul className="space-y-3">
              {data.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--ez-primary)' }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-white text-center">
          <div className="max-w-xl mx-auto px-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {locale === 'vi' ? 'Liên hệ tư vấn ngay' : 'Get in Touch'}
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              {locale === 'vi' ? 'Gọi cho chúng tôi để được hỗ trợ và đăng ký học' : 'Call us for support and enrollment'}
            </p>
            <a href="tel:0943906204"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--ez-primary)' }}>
              <Phone className="w-5 h-5" />
              0943.906.204
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
