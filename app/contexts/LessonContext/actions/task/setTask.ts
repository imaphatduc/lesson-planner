import type { Task } from "~/contexts/Task.type";
import { setTasks } from "./setTasks";
import type { ActionProps } from "../../LessonContext";

export const setTask =
  (props: ActionProps) => (taskId: number, set: (task: Task) => Task) => {
    setTasks(props)((task) => {
      if (task.id === taskId) {
        return set(task);
      }

      return task;
    });
  };
