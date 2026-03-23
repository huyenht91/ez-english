import { NextIntlClientProvider } from 'next-intl';
import PromoBadge from '@/components/layout/Promobadge';
import ChatBubble from '@/components/layout/ChatBubble';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'vi' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <PromoBadge />
      {children}
      <ChatBubble />
    </NextIntlClientProvider>
  );
}
