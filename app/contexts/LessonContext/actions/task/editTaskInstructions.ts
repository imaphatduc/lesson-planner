import type { ActionProps } from "../../LessonContext";
import { setTask } from "./setTask";

export const editTaskInstructions =
  (props: ActionProps) => (taskId: number, instructions: string) => {
    setTask(props)(taskId, (task) => ({
      ...task,
      instructions,
    }));
  };
