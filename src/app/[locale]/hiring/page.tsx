import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === 'vi';
  return {
    title: isVi ? 'Tuyển dụng' : 'Careers',
    description: isVi
      ? 'EZ English tuyển dụng giáo viên tiếng Anh và nhân viên tư vấn tuyển sinh tại Hạ Long, Quảng Ninh.'
      : 'EZ English is hiring English teachers and enrollment consultants in Ha Long, Quang Ninh.',
    openGraph: {
      title: isVi ? 'Tuyển dụng | EZ English' : 'Careers | EZ English',
    },
  };
}

const JOBS = {
  vi: [
    {
      id: 1,
      title: 'Giáo viên Ngữ pháp',
      type: 'Toàn thời gian',
      requirements: [
        'IELTS 7.0 trở lên hoặc bằng cấp tương đương',
        'Có ít nhất 1 năm kinh nghiệm dạy Ngữ pháp tiếng Anh',
        'Kỹ năng giao tiếp và thuyết trình tốt',
        'Nhiệt tình, trách nhiệm',
      ],
      benefits: [
        'Lương cạnh tranh, trao đổi khi phỏng vấn',
        'Môi trường làm việc chuyên nghiệp',
        'Được đào tạo nội bộ',
        'Thưởng theo kết quả học viên',
      ],
    },
    {
      id: 2,
      title: 'Giáo viên Cambridge (Thiếu nhi)',
      type: 'Bán thời gian / Toàn thời gian',
      requirements: [
        'Bằng cấp Cambridge TKT hoặc CELTA là lợi thế',
        'Yêu thích và có kinh nghiệm dạy trẻ em',
        'Sáng tạo, vui vẻ, kiên nhẫn',
        'IELTS 7.0 trở lên',
      ],
      benefits: [
        'Lương cạnh tranh, trao đổi khi phỏng vấn',
        'Lịch dạy linh hoạt',
        'Tài liệu giảng dạy được cung cấp đầy đủ',
        'Cơ hội thăng tiến',
      ],
    },
    {
      id: 3,
      title: 'Nhân viên Tư vấn Tuyển sinh',
      type: 'Toàn thời gian',
      requirements: [
        'Kỹ năng giao tiếp, thuyết phục tốt',
        'Tiếng Anh giao tiếp cơ bản',
        'Ưu tiên có kinh nghiệm tư vấn giáo dục',
        'Nhiệt tình, chủ động',
      ],
      benefits: [
        'Lương cơ bản + hoa hồng hấp dẫn, trao đổi khi phỏng vấn',
        'Thưởng KPI hàng tháng',
        'Được học tiếng Anh miễn phí',
        'Bảo hiểm đầy đủ',
      ],
    },
  ],
  en: [
    {
      id: 1,
      title: 'Grammar Teacher',
      type: 'Full-time',
      requirements: [
        'IELTS 7.0 or equivalent qualification',
        'Minimum 1 year of English Grammar teaching experience',
        'Strong communication and presentation skills',
        'Enthusiastic and responsible',
      ],
      benefits: [
        'Competitive salary, discussed at interview',
        'Professional working environment',
        'Internal training provided',
        'Performance-based bonuses',
      ],
    },
    {
      id: 2,
      title: 'Cambridge Teacher (Children)',
      type: 'Part-time / Full-time',
      requirements: [
        'Cambridge TKT or CELTA is an advantage',
        'Passion for and experience teaching children',
        'Creative, fun, and patient',
        'IELTS 7.0 or above',
      ],
      benefits: [
        'Competitive salary, discussed at interview',
        'Flexible teaching schedule',
        'Full teaching materials provided',
        'Career advancement opportunities',
      ],
    },
    {
      id: 3,
      title: 'Enrollment Consultant',
      type: 'Full-time',
      requirements: [
        'Strong communication and persuasion skills',
        'Basic English communication',
        'Educational consulting experience preferred',
        'Proactive and enthusiastic',
      ],
      benefits: [
        'Base salary + attractive commission, discussed at interview',
        'Monthly KPI bonuses',
        'Free English classes',
        'Full insurance coverage',
      ],
    },
  ],
};

export default async function HiringPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hiring' });
  const jobs = JOBS[locale as 'vi' | 'en'] ?? JOBS.vi;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="py-16 text-center" style={{ backgroundColor: 'var(--ez-cream)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">{t('title')}</h1>
            <p className="text-gray-500 max-w-xl mx-auto">{t('subtitle')}</p>
          </div>
        </section>

        {/* Job listings */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Job header */}
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                  style={{ backgroundColor: 'var(--ez-cream)' }}>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                    <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--ez-primary)', color: 'white' }}>
                      {job.type}
                    </span>
                  </div>
                  <a
                    href={`mailto:info@ezenglish.vn?subject=Apply: ${job.title}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium text-sm self-start transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--ez-primary)' }}
                  >
                    <Mail className="w-4 h-4" />
                    {t('apply')}
                  </a>
                </div>

                {/* Requirements & Benefits */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">{t('requirement')}</h3>
                    <ul className="space-y-2">
                      {job.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-400" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">{t('benefit')}</h3>
                    <ul className="space-y-2">
                      {job.benefits.map((ben) => (
                        <li key={ben} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
                          {ben}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Apply CTA */}
        <section className="py-12 text-center" style={{ backgroundColor: 'var(--ez-cream)' }}>
          <div className="max-w-xl mx-auto px-4">
            <p className="text-gray-600 mb-4">
              {locale === 'vi'
                ? 'Gửi CV của bạn về email:'
                : 'Send your CV to:'}
            </p>
            <a
              href="mailto:info@ezenglish.vn"
              className="text-xl font-bold hover:underline"
              style={{ color: 'var(--ez-primary)' }}
            >
              info@ezenglish.vn
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
