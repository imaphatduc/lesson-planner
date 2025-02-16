import type { Task } from "~/contexts/Task.type";

export const stageGroupExistInTask =
  (currentTargetLanguageItemId: number) => (groupId: string, task: Task) =>
    task.stageGroups.some(
      (group) =>
        group.targetLanguageItemId === currentTargetLanguageItemId &&
        group.id === groupId
    );
