import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: {
    default: 'EZ English — Trung tâm Anh ngữ Hạ Long',
    template: '%s | EZ English',
  },
  description: 'EZ English — Trung tâm Anh ngữ uy tín tại Hạ Long, Quảng Ninh. Các chương trình Lớp Ngữ pháp, chứng chỉ Cambridge quốc tế và Câu lạc bộ tiếng Anh cho trẻ em từ 5–12 tuổi.',
  keywords: ['EZ English', 'trung tâm tiếng Anh Hạ Long', 'Cambridge thiếu nhi', 'luyện thi IELTS Quảng Ninh', 'học tiếng Anh trẻ em', 'câu lạc bộ tiếng Anh'],
  authors: [{ name: 'EZ English' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'EZ English',
    title: 'EZ English — Trung tâm Anh ngữ Hạ Long',
    description: 'Trung tâm Anh ngữ uy tín tại Hạ Long, Quảng Ninh. Ngữ pháp, Cambridge, Câu lạc bộ tiếng Anh cho trẻ em.',
    locale: 'vi_VN',
  },
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
