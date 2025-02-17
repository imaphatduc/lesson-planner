import type { TargetLanguageItem } from "~/contexts/Lesson.type";
import { setCurrentLesson } from "../lesson/setCurrentLesson";
import type { ActionProps } from "../../LessonContext";

export const setTargetLanguageItems =
  (props: ActionProps) =>
  (set: (targetLanguageItem: TargetLanguageItem) => TargetLanguageItem) => {
    setCurrentLesson(props)((lesson) => ({
      ...lesson,
      targetLanguageItems: lesson.targetLanguageItems.map(set),
    }));
  };
