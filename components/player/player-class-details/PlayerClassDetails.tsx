'use client';

import { CourseHeader } from "@/components/course-header/CourseHeader";
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdComment, MdThumbUp, MdVisibility } from "react-icons/md";
import { PlayerPlaylist } from "../playlist/PlayerPlaylist";
import { IPlayerClassGroupProps } from "../playlist/components/PlayerClassGroup";
import { PlayerClassHeader } from "./components/PlayerClassHeader";
import { PlayerVideoPlayer } from "./components/PlayerVideoPlayer";
import { Comments } from "./components/comments/Comments";
import ICommentProps from "./components/comments/Comment";
import { LocalStorage } from "@/shared/services/local-storage";

interface PlayerClassDetailsProps {
  course: {
    title: string;
    description: string;
    numberOfClasses: number;
    id: string;
    classGroups: Pick<IPlayerClassGroupProps, 'title' | 'classes'>[];
  };
  classItem: {
    id: string;
    videoId: string;
    title: string;
    description: string;
    likesCount: number;
    viewsCount: number;
    commentsCount: number;
  };
  comments: ICommentProps[];
}


export const PlayerClassDetails = ({ course, classItem, comments }: PlayerClassDetailsProps) => {
  const [currentTab, setCurrentTab] = useState('class-details');
  const router = useRouter();

  const nextClassId = useMemo(() => {
    const classes = course.classGroups.flatMap(classGroups => classGroups.classes);

    const currentClassIndex = classes.findIndex(({ classId }) => classId === classItem.id);

    const nextClassIndex = currentClassIndex + 1;

    if (nextClassIndex === classes.length) {
      return undefined;
    };

    return classes[nextClassIndex].classId;

  }, [course.classGroups, classItem.id]);

  useEffect(() => {
    const matchMedia = window.matchMedia("(min-width: 768px)");

    const handleMatchMedia = (e: MediaQueryListEvent) => {
      if (e.matches && currentTab === 'course-playlist') {
        setCurrentTab('class-details');
      }
    };

    matchMedia.addEventListener('change', handleMatchMedia);
    return () => matchMedia.removeEventListener('change', handleMatchMedia);
  }, [currentTab]);

  useEffect(() => {
    LocalStorage.keepWatching.set({
      classId: classItem.id,
      courseId: course.id,
      className: classItem.title,
      courseName: course.title,
    });
  }, [course.id, course.title, classItem.id, classItem.title]);

  const handlePlayerNext = useCallback(() => {
    if (!nextClassId)
      return;

    LocalStorage.watchedContent.toggle(course.id, classItem.id, 'add');
    router.push(`/player/${course.id}/${nextClassId}`);
  }, [course.id, classItem.id, nextClassId, router]);

  return (
    <div className='flex-1 pr-2 overflow-auto pl-2 md:pr-10 md:pl-8 pb-10'>
      <div className='aspect-video rounded-2xl overflow-hidden'>
        <PlayerVideoPlayer
          onPlayNext={handlePlayerNext}
          videoId={classItem.videoId}
        />
      </div>

      <div className="flex flex-wrap gap-3 p-2 text-sm md:text-base opacity-80 overflow-hidden">
        <div className="flex gap-1 items-center">
          <MdVisibility />
          <span>{classItem.viewsCount}</span>
          <span>Vizualizações</span>
        </div>
        <a className="flex gap-1 items-center hover:text-green-700 break-words" href={`https://www.youtube.com/watch?v=${classItem.videoId}`} target="_blank">
          <MdThumbUp />
          <span>{classItem.likesCount}</span>
          <span>Curtidas</span>
        </a>
        <div className="flex gap-1 items-center">
          <MdComment />
          <span>{classItem.commentsCount}</span>
          <span>Comentários</span>
        </div>
      </div>

      <Tabs.Root value={currentTab} onValueChange={value => setCurrentTab(value)}>
        <Tabs.List className='flex gap-2'>
          <Tabs.Trigger
            value='course-playlist'
            className='p-2 flex items-center justify-center border-b-4 border-transparent data-[state=active]:border-primary md:hidden'
          >
            Conteúdo do curso
          </Tabs.Trigger>
          <Tabs.Trigger
            value='class-details'
            className='p-2 flex items-center justify-center border-b-4 border-transparent data-[state=active]:border-primary'
          >
            Visão geral
          </Tabs.Trigger>
          <Tabs.Trigger
            value='class-comments'
            className='p-2 flex items-center justify-center border-b-4 border-transparent data-[state=active]:border-primary'
          >
            Comentários
          </Tabs.Trigger>
          <Tabs.Trigger
            value='course-details'
            className='p-2 flex items-center justify-center border-b-4 border-transparent data-[state=active]:border-primary'
          >
            Visão geral do curso
          </Tabs.Trigger>
        </Tabs.List>

        <hr className='border-paper mb-2' />

        <Tabs.Content value='class-details' className='px-2'>
          <PlayerClassHeader
            title={classItem.title}
            description={classItem.description}
          />
        </Tabs.Content>
        <Tabs.Content value='course-playlist' className='px-2'>
          <PlayerPlaylist
            playingCourseId={course.id}
            playingClassId={classItem.id}
            classGroups={course.classGroups}
          />
        </Tabs.Content>
        <Tabs.Content value='class-comments' className='px-2'>
          <Comments
            comments={comments}
          />
        </Tabs.Content>
        <Tabs.Content value='course-details' className='px-2'>
          <CourseHeader
            title={course.title}
            description={course.description}
            numberOfClasses={course.numberOfClasses}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}