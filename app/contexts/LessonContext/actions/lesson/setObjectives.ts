import type { ActionProps } from "../../LessonContext";
import { setCurrentLesson } from "./setCurrentLesson";

export const setObjectives =
  (props: ActionProps) =>
  (knowledge: string, ability: string, behavior: string) => {
    setCurrentLesson(props)((lesson) => ({
      ...lesson,
      objectives: {
        ...lesson.objectives,
        ...(knowledge.length > 0 ? { knowledge } : {}),
        ...(ability.length > 0 ? { ability } : {}),
        ...(behavior.length > 0 ? { behavior } : {}),
      },
    }));
  };
