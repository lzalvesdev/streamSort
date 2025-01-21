import Logo from '@/components/logo';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 flex flex-col items-center justify-center   overflow-hidden h-full">
      <Link href={'/'}>
        <Logo />
      </Link>
      {children}
    </section>
  );
}
