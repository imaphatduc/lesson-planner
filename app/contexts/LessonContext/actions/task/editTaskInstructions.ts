import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setTask } from "./setTask";

export const editTaskInstructions =
  (metadata: LessonMetadata) => (taskId: number, instructions: string) => {
    setTask(metadata)(taskId, (task) => ({
      ...task,
      instructions,
    }));
  };
