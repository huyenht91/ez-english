import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'EZ English — Trung tâm Anh ngữ',
  description: 'EZ English — Trung tâm Anh ngữ uy tín với các chương trình Lớp Ngữ pháp, Cambridge và Câu lạc bộ tiếng Anh cho trẻ em.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={montserrat.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
