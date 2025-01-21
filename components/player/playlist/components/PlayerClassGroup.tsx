'use client';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { PlayerClass, IPlayerClassProps } from "./PlayerClass";

export interface IPlayerClassGroupProps {
  title: string;
  position: number;
  playingClassId: string;
  open: boolean;
  classes: (Pick<IPlayerClassProps, "done" | "title"> & { classId: string })[];

  onToggle: () => void;
  onPLay: (classId: string) => void;
  onCheck: (classId: string) => void;
}

export const PlayerClassGroup = ({ title, position, classes, open, onToggle, playingClassId, onPLay, onCheck }: IPlayerClassGroupProps) => {
  return (
    <div className="flex flex-col">
      <button className="flex gap-2 p-4 bg-paper text-text items-center active:opacity-80" onClick={onToggle}>
        <div className="bg-black h-12 w-12 flex items-center justify-center rounded-full">
          {position}
        </div>

        <div className="flex flex-col flex-1 text-start">
          <span className="font-bold line-clamp-1">{title}</span>
          <span className="font-light text-sm">
            {classes.filter((classItem) => classItem.done).length}/{classes.length} aulas
          </span>
        </div>
        {open
          ? <MdKeyboardArrowDown size={28} />
          : <MdKeyboardArrowRight size={28} />
        }

      </button>

      <ol data-open={open} className="flex flex-col data-[open=false]:hidden">
        {classes.map((classItem) => (
          <li key={classItem.title}>
            <PlayerClass
              {...classItem}
              playing={classItem.classId === playingClassId}

              onPlay={() => onPLay(classItem.classId)}
              onCheck={() => onCheck(classItem.classId)}
            />
          </li>
        ))}
      </ol>

    </div>
  );
};