import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'StreamSort',
  description:
    'Organize e aprenda com playlists do YouTube de forma prática e intuitiva. Transforme vídeos em uma experiência de aprendizado personalizada com nosso sistema de organização e dashboard exclusivo.',
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-Br">
      <body className={`${geistSans.variable}  antialiased`}>{children}</body>
    </html>
  );
}
