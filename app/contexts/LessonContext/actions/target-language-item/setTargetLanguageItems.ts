import type {
  LessonMetadata,
  TargetLanguageItem,
} from "~/contexts/Lesson.type";
import { setCurrentLesson } from "../lesson/setCurrentLesson";

export const setTargetLanguageItems =
  (metadata: LessonMetadata) =>
  (set: (targetLanguageItem: TargetLanguageItem) => TargetLanguageItem) => {
    setCurrentLesson(metadata)((lesson) => ({
      ...lesson,
      targetLanguageItems: lesson.targetLanguageItems.map(set),
    }));
  };
