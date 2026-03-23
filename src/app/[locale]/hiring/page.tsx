import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HiringSection from '@/components/sections/HiringSection';
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

export default async function HiringPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hiring' });

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

        {/* Job listings — reads from localStorage (staff editable) */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <HiringSection
              applyLabel={t('apply')}
              requirementLabel={t('requirement')}
              benefitLabel={t('benefit')}
            />
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
