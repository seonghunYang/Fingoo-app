import type { Metadata } from 'next';
import './globals.css';
import MSWComponent from './ui/components/util/msw-component';
import { SWRProvider } from './ui/components/util/swr-provider';
import { cn } from './utils/style';
import localFont from 'next/font/local';

const myFont = localFont({
  src: './PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <body className={cn(myFont.variable, 'font-pretendard')}>
        <MSWComponent>
          <SWRProvider>{children}</SWRProvider>
        </MSWComponent>
      </body>
    </html>
  );
}
