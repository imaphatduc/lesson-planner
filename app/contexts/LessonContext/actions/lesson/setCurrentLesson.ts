import type { Lesson } from "~/contexts/Lesson.type";
import type { ActionProps } from "../../LessonContext";
import { db } from "~/db";

export const setCurrentLesson =
  ({ metadata }: ActionProps) =>
  async (set: (lesson: Lesson) => Lesson) => {
    return await db.myLessons
      .filter((lesson) => lesson.id === metadata.id)
      .modify((lesson) => {
        Object.assign(lesson, set(lesson));
      });
  };
