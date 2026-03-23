import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle, ArrowLeft, Phone } from 'lucide-react';

const KIDS_DATA = {
  vi: {
    name: 'Câu lạc bộ tiếng Anh',
    subtitle: 'Môi trường học vui vẻ, giúp trẻ tự tin giao tiếp tiếng Anh',
    groups: [
      { label: '5–7 tuổi', desc: 'Làm quen tiếng Anh qua trò chơi và bài hát' },
      { label: '8–10 tuổi', desc: 'Giao tiếp cơ bản, kể chuyện, đóng vai' },
      { label: '11–12 tuổi', desc: 'Thuyết trình, thảo luận nhóm, phát âm chuẩn' },
    ],
    highlights: [
      'Giáo viên sáng tạo, vui vẻ và kiên nhẫn',
      'Lớp học nhỏ, tương tác cao',
      'Hoạt động đa dạng: trò chơi, bài hát, kể chuyện',
      'Phụ huynh nhận báo cáo tiến độ định kỳ',
      'Môi trường học an toàn và thân thiện',
    ],
    back: '← Quay lại Khóa học',
  },
  en: {
    name: 'Kids Speaking Club',
    subtitle: 'A fun environment helping children speak English confidently',
    groups: [
      { label: 'Ages 5–7', desc: 'Introduction through games and songs' },
      { label: 'Ages 8–10', desc: 'Basic communication, storytelling, role play' },
      { label: 'Ages 11–12', desc: 'Presentations, group discussions, pronunciation' },
    ],
    highlights: [
      'Creative, fun, and patient teachers',
      'Small classes with high interaction',
      'Diverse activities: games, songs, storytelling',
      'Regular progress reports for parents',
      'Safe and friendly learning environment',
    ],
    back: '← Back to Courses',
  },
};

export default async function KidsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = KIDS_DATA[locale as 'vi' | 'en'] ?? KIDS_DATA.vi;

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
              <div className="text-5xl">⭐</div>
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
              {locale === 'vi' ? 'Nhóm tuổi' : 'Age Groups'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.groups.map((g) => (
                <div key={g.label}
                  className="rounded-xl p-4 border border-green-100 hover:shadow-sm transition-shadow"
                  style={{ backgroundColor: '#F0FFF0' }}>
                  <div className="font-bold mb-1" style={{ color: '#4CAF50' }}>{g.label}</div>
                  <p className="text-xs text-gray-500">{g.desc}</p>
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
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#4CAF50' }} />
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
