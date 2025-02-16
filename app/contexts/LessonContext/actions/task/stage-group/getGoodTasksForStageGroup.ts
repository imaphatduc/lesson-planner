import type { Task } from "~/contexts/Task.type";
import { currentTargetLanguageItemGoodForTask } from "./currentTargetLanguageItemGoodForTask";

export const getGoodTasksForStageGroup =
  (tasks: Task[], currentTargetLanguageItemId: number) => () => {
    return tasks.filter((task) =>
      currentTargetLanguageItemGoodForTask(currentTargetLanguageItemId)(task)
    );
  };
