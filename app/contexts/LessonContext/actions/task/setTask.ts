import type { Task } from "~/contexts/Task.type";
import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setTasks } from "./setTasks";

export const setTask =
  (metadata: LessonMetadata) => (taskId: number, set: (task: Task) => Task) => {
    setTasks(metadata)((task) => {
      if (task.id === taskId) {
        return set(task);
      }

      return task;
    });
  };
