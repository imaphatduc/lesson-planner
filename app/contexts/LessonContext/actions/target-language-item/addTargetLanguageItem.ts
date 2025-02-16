import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setCurrentLesson } from "../lesson/setCurrentLesson";

export const addTargetLanguageItem =
  (metadata: LessonMetadata) => (name: string) => {
    setCurrentLesson(metadata)((lesson) => ({
      ...lesson,
      targetLanguageItems: [
        ...lesson.targetLanguageItems.map((targetLanguageItem) => ({
          ...targetLanguageItem,
          current: false,
        })),
        {
          id: lesson.targetLanguageItems.length,
          name,
          tasks: [],
          current: true,
        },
      ],
    }));
  };
