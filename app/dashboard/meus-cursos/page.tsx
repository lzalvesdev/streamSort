import { auth } from '@/auth';
import MyCard from '@/components/card/Card';
import { KeepWatching } from '@/components/KeepWatching';
import { APIYouTube } from '@/shared/services/api-youtube';

export default async function MyCourses() {
  const section = await auth();
  const userId = String(section?.user?.email);

  const courses = await APIYouTube.course.getAll(userId);

  return (
    <>
      <div className='md:max-w-[980px] justify-center mx-auto flex flex-col gap-7 px-5 md:px-0'>
        <h1 className="text-3xl font-bold text-center md:text-start">Minhas Playlists</h1>

        <KeepWatching />

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 items-center pb-5 '>
          {courses.map((courses) => (
            <MyCard
              key=''
              title={courses.videos[0].title}
              image={courses.videos[0].image}
              href={`/player/${courses.playlistId}/${courses.videos[0].id}`}
              quantity={courses.videos.length}
            />
          ))
          }
        </div>
      </div>
    </>
  );
}