import { PlayerClassDetails, PlayerHeader, PlayerPlaylist } from '@/components/player';
import { APIYouTube } from '@/shared/services/api-youtube';
import { Metadata } from 'next';

interface PageProps {
  params: {
    courseId: string;
    classId: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const classDetails = await APIYouTube.class.getById(params.courseId, params.classId);

  return {
    title: classDetails.title,
    description: classDetails.description,
    openGraph: {
      locale: 'pt-Br',
      type: 'video.episode',
      title: classDetails.title,
      description: classDetails.description,
      videos: [`https://www.youtube.com/watch?v=${classDetails.videoId}`],
    }
  };
};


export default async function PagePlayer({ params }: PageProps) {
  const { courseId, classId } = params;
  const courseDetails = await APIYouTube.course.getById(courseId);
  const classDetails = await APIYouTube.class.getById(courseId, classId);

  const comments = await APIYouTube.comments.getAllByVideoId(classDetails.videoId);

  const classGroupsData = courseDetails.classGroups.map(classGroup => ({
    title: classGroup.title,
    classes: classGroup.classes.map(classItem => ({
      done: false,
      classId: classItem.id,
      title: classItem.title,
    }))
  }));

  return (
    <main className='flex flex-col gap-2 h-screen'>
      <PlayerHeader
        title={classDetails.title}
        subtitle={courseDetails.title}
      />

      <div className='flex gap-2 h-[calc(100vh-72px)]'>
        <div className='max-w-96 hidden md:block'>
          <PlayerPlaylist
            playingCourseId={courseId}
            playingClassId={classId}
            classGroups={classGroupsData}
          />
        </div>

        <PlayerClassDetails
          comments={comments}
          classItem={{ ...classDetails, id: classId }}
          course={{ ...courseDetails, classGroups: classGroupsData }}
        />
      </div>
    </main>
  )
}