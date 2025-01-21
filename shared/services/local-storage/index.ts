/* eslint-disable @typescript-eslint/no-unused-vars */

const LOCAL_STORAGE_KEY = 'KEEP_WATCHING';
const WATCHED_CONTENT__LOCAL_STORAGE_KEY = 'WATCHED_CONTENT';

export interface IKeepWatching {
  classId: string;
  courseId: string;
  className: string;
  courseName: string;
}

export const LocalStorage = {
  keepWatching: {
    get: (): IKeepWatching | null => {
      try {
        const result = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (result) {
          return JSON.parse(result);
        }

        return null;
      } catch (e) {
        return null;
      }
    },
    set: (data: IKeepWatching) => {
      try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        return;
      }
    },
  },
  watchedContent: {
    get: (courseId: string): string[] | null => {
      try {
        const data = localStorage.getItem(WATCHED_CONTENT__LOCAL_STORAGE_KEY);
        if (!data) return null;

        const watchedContent = JSON.parse(data) as Record<string, string[]>;

        return watchedContent[courseId] || null;
      } catch (error) {
        return null;
      }
    },
    toggle: (courseId: string, classId: string, forceState?: 'add' | 'remove') => {
      try {
        let watchedContent: Record<string, string[]> = {};

        const data = localStorage.getItem(WATCHED_CONTENT__LOCAL_STORAGE_KEY);
        if (data) {
          watchedContent = JSON.parse(data);
        }

        if (!watchedContent[courseId]) {
          watchedContent[courseId] = [];
        }

        if (forceState !== undefined) {
          if (forceState === 'add') {
            if (!watchedContent[courseId].includes(classId)) {
              watchedContent[courseId].push(classId);
            }
          } else {
            watchedContent[courseId] = watchedContent[courseId].filter(id => id !== classId);
          }
        } else {
          if (watchedContent[courseId].includes(classId)) {
            watchedContent[courseId] = watchedContent[courseId].filter(id => id !== classId);
          } else {
            watchedContent[courseId].push(classId);
          }
        }

        localStorage.setItem(WATCHED_CONTENT__LOCAL_STORAGE_KEY, JSON.stringify(watchedContent));

        return watchedContent[courseId] || null;
      } catch (error) {
        return null;
      }
    },
  },
};