import type { Task } from "~/contexts/Task.type";

export const currentTargetLanguageItemGoodForTask =
  (currentTargetLanguageItemId: number) => (task: Task) =>
    task.stageGroups.length === 0 ||
    task.stageGroups.some(
      (group) => group.targetLanguageItemId === currentTargetLanguageItemId
    );
