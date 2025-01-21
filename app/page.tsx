import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import womanImg from './assets/course.jpg';
import logo from '../app/assets/logo.svg';

export default async function Home() {
  const section = await auth();


  return (
    <main>
      <section className="container mx-auto text-center pb-20 px-5 md:max-w-[1080px] md:px-2">
        <nav className="flex justify-between items-center py-4">
          <Image src={logo} alt="Logotipo" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon size={24} className="md:hidden cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <a href={'/#funcionamento'}>
                <DropdownMenuItem>Funcionamento</DropdownMenuItem>
              </a>
              <DropdownMenuItem>
                <Link href="/login">
                  <Button variant={'bg-white'}>{section ? 'Dashboard' : 'Fazer login'}</Button>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="items-center gap-1 hidden md:flex">
            <Link href={'#funcionamento'}>
              <Button variant={'link'}>Funcionamento</Button>
            </Link>
            <Link href="/login">
              <Button variant={'bg-white'}>{section ? 'Dashboard' : 'Fazer login'}</Button>
            </Link>
          </div>
        </nav>
        <h1 className="md:text-6xl text-2xl font-bold mt-8 md:mt-16">
          Organize Seus Vídeos Gratuitamente e Potencialize Seu Aprendizado{' '}
        </h1>
        <p className="text-gray-500 mt-4 text-sm md:text-xl max-w-3xl mx-auto">
          Encontre e organize seus vídeos do YouTube de maneira eficiente e personalizada.
          Oferecemos um lugar para você organizar e aprender com facilidade.
        </p>

        <div className="flex gap-2 justify-center ">
          <a href="/login">
            <Button className="mt-8 md:mt-14 md:w-96">Comece Agora</Button>
          </a>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Cadastre-se gratuitamente para começar a usar a plataforma.{' '}
        </p>
      </section>

      <section className="bg-white md:py-16 py-8" id="funcionamento">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Como funciona?
          </h2>
          <div className="mx-24 xl:mx-80 flex flex-col md:flex-row items-center justify-between">
            <Image
              src={womanImg}
              alt="Pessoa estudando online"
              className="max-w-xs"
            />
            <ul className="md:text-2xl text-lg text-muted-foreground space-y-4 md:space-y-6 flex-shrink-0">
              <li className="flex items-center justify-between gap-4">
                Organize automaticamente seus vídeos de vídeos{' '}
                <Check size={24} className="text-green-600" />
              </li>
              <li className="flex items-center justify-between gap-4">
                Deixe seus vídeos dispostos de forma prática e acessível
                <Check size={24} className="text-green-600" />
              </li>
              <li className="flex items-center justify-between gap-4">
                Acesse a plataforma a qualquer momento
                <Check size={24} className="text-green-600" />
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-2 md:py-16 py-10 text-center">
        <h2 className="md:text-6xl text-2xl font-bold md:mt-16">
          Pronto Para Mudar Sua Vida?
        </h2>
        <p className="text-gray-500 mt-4 text-sm md:text-xl max-w-3xl mx-auto">
          O conhecimento tem o poder de transformar tudo. Comece agora e faça a diferença no seu futuro. Milhares já estão no caminho do sucesso. Junte-se a nós!{' '}
        </p>
        <a href="/login">
          <Button className="mt-8 md:mt-14 md:w-96">Comece Agora</Button>
        </a>
        <footer className="mt-16 border-t border-gray-300 pt-10 text-center align-center flex-col">
          <h1 className='font-bold'>STREAMSORT</h1>
          <p className="text-muted-foreground">
            © 2024 StreamSort. Todos os direitos reservados.
          </p>
        </footer>
      </section>
    </main>
  );
}
