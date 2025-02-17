import type { ActionProps } from "../../LessonContext";
import { setCurrentLesson } from "../lesson/setCurrentLesson";

export const removeTargetLanguageItem =
  (props: ActionProps) => (id: number) => {
    setCurrentLesson(props)((lesson) => ({
      ...lesson,
      targetLanguageItems: lesson.targetLanguageItems
        .filter((d) => d.id !== id)
        .map((d, i) => ({
          ...d,
          current: i === lesson.targetLanguageItems.length - 1,
        })),
    }));
  };
