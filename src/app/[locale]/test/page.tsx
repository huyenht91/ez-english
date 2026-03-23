import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MockTestClient from '@/components/MockTestClient';

export default async function TestPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ r?: string }>;
}) {
  const { locale } = await params;
  const { r } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'test' });

  return (
    <>
      <Navbar />
      <main className="flex-1 py-12" style={{ backgroundColor: 'var(--ez-cream)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
            <p className="text-gray-500">{t('subtitle')}</p>
          </div>
          <MockTestClient key={r ?? 'default'} locale={locale} />
        </div>
      </main>
      <Footer />
    </>
  );
}
