import type { Lesson } from "~/contexts/Lesson.type";
import type { ActionProps } from "../../LessonContext";
import { db } from "~/db";

export const setCurrentLesson =
  ({ metadata, getId }: ActionProps) =>
  async (set: (lesson: Lesson) => Lesson) => {
    return await db.myLessons
      .filter((lesson) => getId(lesson) === getId(metadata))
      .modify((lesson) => {
        Object.assign(lesson, set(lesson));
      });
  };
