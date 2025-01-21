'use client';
import { MdCheckCircle, MdCircle, MdPlayCircleOutline } from "react-icons/md";

export interface IPlayerClassProps {
  done: boolean;
  playing: boolean;
  title: string;

  onPlay: () => void;
  onCheck: () => void;
};

export const PlayerClass = ({ title, playing, done, onPlay, onCheck }: IPlayerClassProps) => {
  return (
    <button className='flex gap-6 p-4 items-center' onClick={() => onPlay()}>
      <div
        className="relative flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          onCheck();
        }}
      >
        {!done ? (
          <>
            <MdPlayCircleOutline
              size={24}
              className="absolute transition-opacity duration-300 opacity-100 hover:opacity-0"
            />
            <MdCircle
              size={24}
              className="absolute transition-opacity duration-300 opacity-0 hover:opacity-100"
            />
          </>
        ) : (
          <MdCheckCircle size={24} className="text-green-500" />
        )}
      </div>

      <div className='flex flex-col gap-1 items-start'>
        <p
          data-done={done}
          className='line-clamp-2 text-start data-[done=true]:text-green-500'
        >
          {title}
        </p>

        {playing && (
          <span className='px-2 py-1 bg-blue-500 rounded-full leading-4'>
            Reproduzindo
          </span>
        )}
      </div>
    </button>
  );
};