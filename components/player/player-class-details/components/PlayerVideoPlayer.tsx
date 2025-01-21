'use client';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { MdPlayCircle } from 'react-icons/md';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface IPlayerVideoPlayerProps {
  videoId: string;

  onPlayNext: () => void;
}

export const PlayerVideoPlayer = ({ videoId, onPlayNext }: IPlayerVideoPlayerProps) => {
  const [totalDuration, setTotalDuration] = useState<number | undefined>(undefined);
  const [progress, setProgress] = useState<number | undefined>(undefined);

  const secondsUntilEnd = useMemo(() => {
    if (!progress || !totalDuration)
      return undefined;

    return Number((totalDuration - progress).toFixed(0));
  }, [progress, totalDuration]);

  const showNextButton = useMemo(() => {
    return !!secondsUntilEnd && secondsUntilEnd <= 30;
  }, [secondsUntilEnd])

  return (
    <>
      {showNextButton && (
        <button
          onClick={onPlayNext}
          className='bg-[#555] p-3 px-4 text-text font-bold rounded-lg flex gap-2 items-center absolute right-16 top-36'
        >
          Próximo vídeo em {secondsUntilEnd}
          <MdPlayCircle size={24} />
        </button>
      )}

      <ReactPlayer
        height='100%'
        width='100%'
        controls={true}
        playing={true}
        url={`https://www.youtube.com/watch?v=${videoId}`}

        onProgress={({ playedSeconds }) => setProgress(playedSeconds)}
        onEnded={() => onPlayNext()}
        onDuration={(duration) => setTotalDuration(duration)}

      />
    </>
  );
}