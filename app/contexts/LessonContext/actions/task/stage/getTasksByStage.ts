import type { ActionProps } from "~/contexts/LessonContext/LessonContext";
import type { TaskStage } from "~/contexts/Task.type";
import type { PPPStage } from "~/contexts/usePPPProcedures";

export const getTasksByStage =
  ({ tasks, currentTargetLanguageItemId }: ActionProps) =>
  (stageName: PPPStage["name"], targetLanguageItemId?: number) => {
    const _ = (stage: TaskStage) =>
      stage.name === stageName &&
      (targetLanguageItemId !== undefined
        ? stage.targetLanguageItemId === targetLanguageItemId
        : stage.targetLanguageItemId === currentTargetLanguageItemId);

    const tasksInStage = tasks
      .filter((task) => task.stages.some((stage) => _(stage)))
      .map((task) => {
        const stage = task.stages.find(_);

        return {
          ...task,
          stage,
        };
      });

    return tasksInStage;
  };
