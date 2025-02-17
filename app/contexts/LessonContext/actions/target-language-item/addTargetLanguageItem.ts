import type { ActionProps } from "../../LessonContext";
import { setCurrentLesson } from "../lesson/setCurrentLesson";

export const addTargetLanguageItem = (props: ActionProps) => (name: string) => {
  setCurrentLesson(props)((lesson) => ({
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
