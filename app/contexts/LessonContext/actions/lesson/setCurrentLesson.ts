import type { Lesson } from "~/contexts/Lesson.type";
import type { ActionProps } from "../../LessonContext";

export const setCurrentLesson =
  ({ metadata, getId, setMyLessons }: ActionProps) =>
  (set: (lesson: Lesson) => Lesson) => {
    setMyLessons((myLessons) => {
      return myLessons.map((lesson) => {
        if (getId(lesson) === getId(metadata)) {
          return set(lesson);
        }

        return lesson;
      });
    });
  };
