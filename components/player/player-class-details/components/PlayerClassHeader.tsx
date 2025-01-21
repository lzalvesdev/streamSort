import dynamic from 'next/dynamic';
import { UrlMatcher } from 'interweave-autolink';
import { useMemo } from 'react';

const Interweave = dynamic(() => import('interweave').then(result => result.Interweave), { ssr: false })

interface PlayerClassHeaderProps {
  title: string;
  description: string;
}

export const PlayerClassHeader = ({ title, description }: PlayerClassHeaderProps) => {

  const urlMatcher = useMemo(() => {
    return new UrlMatcher(
      'UrlMatcher',
      { validateTLD: false },
      ({ url }) => (
        <a className='hover:underline text-blue-500' href={url} target="_blank">
          {url}
        </a>
      )
    );
  }, []);

  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <h3 className="font-extrabold text-xl break-words">
        {title}
      </h3>
      <p className="break-words">
        <Interweave
          content={description}
          matchers={[urlMatcher]}
        />
      </p>
    </div>
  )
}