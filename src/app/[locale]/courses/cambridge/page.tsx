import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle, ArrowLeft, Phone } from 'lucide-react';

const CAMBRIDGE_DATA = {
  vi: {
    name: 'Cambridge',
    subtitle: 'Chứng chỉ Cambridge quốc tế, được công nhận toàn cầu',
    levels: [
      { label: 'Starters', desc: 'Dành cho trẻ 6–8 tuổi, bắt đầu tiếp cận tiếng Anh' },
      { label: 'Movers', desc: 'Trẻ 8–10 tuổi, mở rộng từ vựng và giao tiếp' },
      { label: 'Flyers', desc: 'Trẻ 10–12 tuổi, nền tảng vững chắc trước KET' },
      { label: 'KET (A2)', desc: 'Học sinh 12–14 tuổi, chứng chỉ chuẩn quốc tế' },
      { label: 'PET (B1)', desc: 'Học sinh 14–16 tuổi, giao tiếp thành thạo' },
    ],
    highlights: [
      'Chương trình được công nhận bởi Cambridge Assessment',
      'Học viên được thi thử trước kỳ thi chính thức',
      'Giáo viên có chứng chỉ TKT / CELTA',
      'Tài liệu Cambridge chính thống',
      'Lịch thi linh hoạt trong năm',
    ],
    back: '← Quay lại Khóa học',
  },
  en: {
    name: 'Cambridge',
    subtitle: 'International Cambridge certificates recognized worldwide',
    levels: [
      { label: 'Starters', desc: 'For children aged 6–8, first steps in English' },
      { label: 'Movers', desc: 'Ages 8–10, expanding vocabulary and communication' },
      { label: 'Flyers', desc: 'Ages 10–12, strong foundation before KET' },
      { label: 'KET (A2)', desc: 'Ages 12–14, internationally recognized certificate' },
      { label: 'PET (B1)', desc: 'Ages 14–16, confident communication skills' },
    ],
    highlights: [
      'Program recognized by Cambridge Assessment',
      'Mock tests before the official exam',
      'Teachers hold TKT / CELTA certificates',
      'Official Cambridge materials',
      'Flexible exam dates throughout the year',
    ],
    back: '← Back to Courses',
  },
};

export default async function CambridgePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = CAMBRIDGE_DATA[locale as 'vi' | 'en'] ?? CAMBRIDGE_DATA.vi;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="py-16" style={{ backgroundColor: 'var(--ez-cream)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={`/${locale}/courses`}
              className="inline-flex items-center gap-1 text-sm mb-6 hover:underline"
              style={{ color: 'var(--ez-primary)' }}>
              <ArrowLeft className="w-4 h-4" />
              {data.back.replace('← ', '')}
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-5xl">🏆</div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">{data.name}</h1>
                <p className="text-gray-500 mt-1">{data.subtitle}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {locale === 'vi' ? 'Các cấp độ' : 'Levels'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.levels.map((level) => (
                <div key={level.label}
                  className="rounded-xl p-4 border border-orange-100 hover:shadow-sm transition-shadow"
                  style={{ backgroundColor: 'var(--ez-cream)' }}>
                  <div className="font-bold mb-1" style={{ color: '#F5A623' }}>{level.label}</div>
                  <p className="text-xs text-gray-500">{level.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
