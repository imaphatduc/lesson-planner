import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setCurrentLesson } from "../lesson/setCurrentLesson";

export const removeTargetLanguageItem =
  (metadata: LessonMetadata) => (id: number) => {
    setCurrentLesson(metadata)((lesson) => ({
      ...lesson,
      targetLanguageItems: lesson.targetLanguageItems
        .filter((d) => d.id !== id)
        .map((d, i) => ({
          ...d,
          current: i === lesson.targetLanguageItems.length - 1,
        })),
    }));
  };
