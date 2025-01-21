'use client';

import { LocalStorage } from "@/shared/services/local-storage";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IPlayerClassGroupProps, PlayerClassGroup } from "./components/PlayerClassGroup";

interface IPlayerPlaylistProps {
  playingCourseId: string;
  playingClassId: string;
  classGroups: Pick<IPlayerClassGroupProps, 'title' | 'classes'>[];
}

export const PlayerPlaylist = ({ classGroups, playingClassId, playingCourseId }: IPlayerPlaylistProps) => {
  const router = useRouter();
  const [watchedContentIds, setWatchedContentIds] = useState<string[]>([]);
  const index = classGroups.findIndex((classGroup) =>
    classGroup.classes.some((classItem) => classItem.classId === playingClassId)
  );
  const [openIndex, setOpenIndex] = useState<number | undefined>(index !== -1 ? index : undefined);


  useEffect(() => {
    const watchedContent = LocalStorage.watchedContent.get(playingCourseId);

    if (!watchedContent) return;

    setWatchedContentIds(watchedContent);
  }, [playingCourseId]);


  const classGroupsWithDone = useMemo(() => {
    return classGroups.map(classGroup => ({
      ...classGroup,
      classes: classGroup.classes.map(classItem => ({
        ...classItem,
        done: watchedContentIds.includes(classItem.classId),
      })),
    }));
  }, [classGroups, watchedContentIds]);


  const handleCheck = useCallback((classId: string) => {
    const newWatchedContent = LocalStorage.watchedContent.toggle(playingCourseId, classId);

    if (!newWatchedContent) return;

    setWatchedContentIds(newWatchedContent);
  }, [playingCourseId]);

  return (
    <div className="flex flex-col gap-2 h-full">
      <ol className="overflow-auto">
        {classGroupsWithDone.map((classGroup, index) => (
          <li key={classGroup.title}>
            <PlayerClassGroup
              {...classGroup}
              playingClassId={playingClassId}

              position={index + 1}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? undefined : index)}

              onCheck={handleCheck}
              onPLay={(classId) => {
                console.log("Navegando para a aula com classId:", classId); // Verifique se o classId está correto
                if (classId) {
                  router.push(`/player/${playingCourseId}/${classId}`);
                } else {
                  console.error("classId inválido:", classId);
                }
              }}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}