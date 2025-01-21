import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

interface IPlayerHeaderProps {
  title: string;
  subtitle: string;
}

export const PlayerHeader = ({ title, subtitle }: IPlayerHeaderProps) => {
  return (
    <div className="flex gap-4 bg-paper text-text px-4 items-center">
      <Link className="hover:opacity-40" href={'/dashboard/meus-cursos'}>
        <IoMdArrowRoundBack size={28} />
      </Link>

      <div className="flex flex-col gap-1 py-1">
        <h1 className="font-bold text-lg line-clamp-1">
          {title}
        </h1>
        <h2 className="line-clamp-1">
          {subtitle}
        </h2>
      </div>
    </div>
  );
}