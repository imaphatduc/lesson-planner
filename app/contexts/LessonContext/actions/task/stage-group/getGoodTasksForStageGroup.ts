import type { ActionProps } from "~/contexts/LessonContext/LessonContext";
import { currentTargetLanguageItemGoodForTask } from "./currentTargetLanguageItemGoodForTask";

export const getGoodTasksForStageGroup =
  ({ tasks, currentTargetLanguageItemId }: ActionProps) =>
  () => {
    return tasks.filter((task) =>
      currentTargetLanguageItemGoodForTask(currentTargetLanguageItemId)(task)
    );
  };
