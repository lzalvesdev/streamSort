'use client';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Form from 'next/form';
import logoutAction from '@/app/(auth)/(logout)/logoutAction';

interface IHeaderProps {
  userName?: string;
}

export default function Header({ userName }: IHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto md:px-4 lg:px-0 md:max-w-[980px] py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-gray-700 hover:text-gray-900 min-w-6">
            <Logo />
          </Link>
        </div>
        <nav className="flex items-center ">
          <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
            <Button
              variant={'link'}
              className={cn(pathname === '/dashboard' ? 'underline' : '')}
            >
              Página Inicial
            </Button>
          </Link>
          <Link
            href="/dashboard/meus-cursos"
            className="text-gray-700 hover:text-gray-900"
          >
            <Button
              variant={'link'}
              className={cn(
                pathname === '/dashboard/meus-cursos' ? 'underline' : ''
              )}
            >
              Minhas Playlists
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-700 hover:text-gray-900 pr-4 md:pr-0">
                <User size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel className="font-light uppercase text-xs">
                {userName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild >
                <Form action={logoutAction}>
                  <button className='w-full text-start'>Sair</button>
                </Form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}