import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { MdPlaylistPlay } from "react-icons/md";
import Motion from './components/motion';

interface ICardProps {
  href: string;
  image: string;
  title: string;
  quantity: number;
  onDelete?: () => Promise<void>;
}

export default async function MyCard({ href, image, title, quantity }: ICardProps) {
  return (
    <>
      <Motion>
        <Card className='relative cursor-pointer hover:bg-gray-300'>
          <Link href={href}>
            <CardHeader className='relative'>
              <Image
                src={image}
                width={500}
                height={500}
                alt={title}
                className="w-full h-auto rounded"
                draggable={false}
              />
              <div className="absolute bottom-8 right-7 bg-black bg-opacity-70 text-white font-semibold text-xs px-1 py-0.5 rounded flex items-center ">
                <MdPlaylistPlay className='text-lg' />
                {quantity}
              </div>
            </CardHeader>
          </Link>
          <CardContent>
            <CardTitle>{title}</CardTitle>
          </CardContent>

          {/* <DeleteButton onDelete={onDelete} /> */}

        </Card>
      </Motion>
    </>
  );
}