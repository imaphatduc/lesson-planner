import type { Task, TaskStage } from "~/contexts/Task.type";

export const getTasksByStage =
  (tasks: Task[], currentTargetLanguageItemId: number) =>
  (stageId: string, targetLanguageItemId?: number) => {
    const _ = (stage: TaskStage) =>
      stage.id === stageId &&
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
