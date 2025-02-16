import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setTargetLanguageItems } from "./setTargetLanguageItems";

export const setCurrentTargetLanguageItem =
  (metadata: LessonMetadata) => (id: number, newName?: string) => {
    setTargetLanguageItems(metadata)((targetLanguageItem) => {
      if (targetLanguageItem.id === id) {
        return {
          ...targetLanguageItem,
          name: newName ?? targetLanguageItem.name,
          current: true,
        };
      }

      return {
        ...targetLanguageItem,
        current: false,
      };
    });
  };
