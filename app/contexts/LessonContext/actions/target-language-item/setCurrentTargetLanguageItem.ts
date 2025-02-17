import type { ActionProps } from "../../LessonContext";
import { setTargetLanguageItems } from "./setTargetLanguageItems";

export const setCurrentTargetLanguageItem =
  (props: ActionProps) => (id: number, newName?: string) => {
    setTargetLanguageItems(props)((targetLanguageItem) => {
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
