import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card';
import Link from 'next/link';
import RegisterForm from './register-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await auth();

  if (session)
    redirect('/dashboard');

  return (
    <>
      <Card className="max-w-sm w-full rounded-2xl mt-12">
        <CardHeader>
          <h2 className="text-xl font-bold">Cadastre-se</h2>
          <CardDescription>Faça seu cadastro gratuitamente.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <div className='border-t border-gray-400 mt-4 pt-4 w-[65%] mx-auto'>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              Já possui conta?{' '}
              <Link className="text-gray-800 hover:underline" href="/login">
                Faça o login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
