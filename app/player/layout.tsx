import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const section = await auth();

  if (!section)
    redirect('/login');

  return (
    <>
      {children}
    </>
  );
}
