import { auth } from '@/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import LoginForm from './login-form';

export default async function LoginPage() {
  const session = await auth();
  if (session)
    redirect('/dashboard');

  return (
    <>
      <Card className="max-w-sm w-full rounded-2xl mt-12">
        <CardHeader>
          <h2 className="text-xl font-bold">Boas Vindas</h2>
          <CardDescription>Faça seu login com email e senha.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className='border-t border-gray-400 mt-4 pt-4 w-[65%] mx-auto'>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              Não possui conta?{' '}
              <Link className="text-gray-800 hover:underline" href="/cadastro">
                Cadastre-se
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
