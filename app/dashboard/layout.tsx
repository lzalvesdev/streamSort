import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import Header from '@/components/header/Header';
import { ToastContainer } from 'react-toastify';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const section = await auth();
  const userName = section?.user?.name;

  if (!section)
    redirect('/login');

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userName={userName ?? ""} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <ToastContainer pauseOnHover={false} position='bottom-right' />
    </div>
  );
}
