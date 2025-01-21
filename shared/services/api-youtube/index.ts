import { youtube, youtube_v3 } from '@googleapis/youtube';
import db from "@/lib/db";

const YouTubeAPIClient = youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export const APIYouTube = {
  course: {
    getAll: async (userId: string) => {
      const playlists = await db.playlist.findMany({
        where: { userId: userId },
      });

      const allCourses = [];

      for (const playlist of playlists) {
        const playlistId = playlist.playlistId;
        let nextPageToken = null;
        const courses = [];

        do {
          const { data } = await YouTubeAPIClient.playlistItems.list({
            maxResults: 50,
            part: ['snippet'],
            playlistId: playlistId,
            pageToken: nextPageToken,
          });

          const newCourses = (data.items || []).map(playlistItem => ({
            id: playlistItem.id || '',
            title: playlistItem.snippet?.title || '',
            description: playlistItem.snippet?.description || '',
            image: playlistItem.snippet?.thumbnails?.medium?.url || '',
          }));

          courses.push(...newCourses);

          nextPageToken = data.nextPageToken || null;
        } while (nextPageToken);

        allCourses.push({
          playlistId: playlistId,
          videos: courses,
        });
      }

      return allCourses;
    },

    getById: async (id: string) => {
      const { data: { items: [courseItem] = [] } } = await YouTubeAPIClient.playlists.list({
        id: [id],
        maxResults: 1,
        part: ['snippet'],
      });

      const classes: youtube_v3.Schema$PlaylistItem[] = [];
      let nextPageToken: string | undefined = undefined;
      do {
        await YouTubeAPIClient.playlistItems
          .list({
            maxResults: 50,
            playlistId: id,
            part: ['snippet'],
            pageToken: nextPageToken,
          })
          .then(({ data }) => {
            classes.push(...(data.items || []));
            nextPageToken = data.nextPageToken || undefined;
          });
      } while (nextPageToken);


      type TGroupWithClass = {
        title: string,
        courseId: string,
        classes: {
          id: string,
          title: string,
        }[],
      }
      const classGroups = classes
        .sort((a, b) => (a.snippet?.position || 0) - (b.snippet?.position || 0))
        .map(youTubePlaylistItem => ({
          id: youTubePlaylistItem.id || '',
          title: youTubePlaylistItem.snippet?.title || '',
          description: youTubePlaylistItem.snippet?.description || '',
        }))
        .reduce<TGroupWithClass[]>((previous, current) => {
          const previousGroup = previous.at(previous.length - 1);

          if (previousGroup) {
            previousGroup.classes.push({
              id: current.id,
              title: current.title,
            });
          } else {
            previous.push({
              courseId: id,
              title: 'Playlist do conteúdo',
              classes: [
                {
                  id: current.id,
                  title: current.title,
                }
              ]
            });
          }

          return previous;
        }, []);

      return {
        id,
        title: courseItem.snippet?.title || '',
        description: courseItem.snippet?.description || '',
        image: courseItem.snippet?.thumbnails?.medium?.url || '',

        classGroups,
        numberOfClasses: classes.length,
      };
    },
  },

  class: {
    getById: async (courseId: string, classId: string) => {
      let nextPageToken: string | undefined = undefined;
      const classes: youtube_v3.Schema$PlaylistItem[] = [];

      do {
        const { data } = await YouTubeAPIClient.playlistItems.list({
          maxResults: 50,
          playlistId: courseId,
          part: ['contentDetails'],
          pageToken: nextPageToken,
        });

        classes.push(...(data.items || []));
        nextPageToken = data.nextPageToken || undefined;
      } while (nextPageToken);

      const matchedClassItem = classes.find(item => item.id === classId);

      if (!matchedClassItem) throw new Error("Class not found");

      const videoId = matchedClassItem.contentDetails?.videoId;
      if (!videoId) throw new Error("Video id not found");

      const { data: { items: [videoItem] = [] } } = await YouTubeAPIClient.videos.list({
        id: [videoId],
        maxResults: 1,
        part: ['snippet', 'statistics'],
      });

      return {
        videoId,
        title: String(videoItem.snippet?.title),
        description: String(videoItem.snippet?.description),
        viewsCount: Number(videoItem.statistics?.viewCount),
        likesCount: Number(videoItem.statistics?.likeCount),
        commentsCount: Number(videoItem.statistics?.commentCount),
      };
    }
  },

  comments: {
    getAllByVideoId: async (videoId: string) => {
      const { data } = await YouTubeAPIClient.commentThreads.list({
        videoId,
        maxResults: 50,
        part: ['snippet', 'replies'],
      });

      return (data.items || []).map(threadComment => ({
        likesCount: threadComment.snippet?.topLevelComment?.snippet?.likeCount || 0,
        content: threadComment.snippet?.topLevelComment?.snippet?.textOriginal || '',
        publishDate: threadComment.snippet?.topLevelComment?.snippet?.publishedAt || '',
        author: {
          userName: threadComment.snippet?.topLevelComment?.snippet?.authorDisplayName || '',
          image: threadComment.snippet?.topLevelComment?.snippet?.authorProfileImageUrl || '',
        },
        replies: (threadComment.replies?.comments || []).map(reply => ({
          likesCount: reply.snippet?.likeCount || 0,
          content: reply.snippet?.textOriginal || '',
          publishDate: reply.snippet?.publishedAt || '',
          author: {
            userName: reply.snippet?.authorDisplayName || '',
            image: reply.snippet?.authorProfileImageUrl || '',
          },
        })),
      }));
    },
  },
};
