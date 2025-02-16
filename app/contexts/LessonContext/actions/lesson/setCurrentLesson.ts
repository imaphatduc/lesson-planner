import { use } from "react";
import type { Lesson, LessonMetadata } from "~/contexts/Lesson.type";
import { MyLessonsContext } from "~/contexts/MyLessonsContext";

export const setCurrentLesson =
  (metadata: LessonMetadata) => (set: (lesson: Lesson) => Lesson) => {
    const { setMyLessons, getId } = use(MyLessonsContext);

    setMyLessons((myLessons) => {
      return myLessons.map((lesson) => {
        if (getId(lesson) === getId(metadata)) {
          return set(lesson);
        }

        return lesson;
      });
    });
  };
