import type { Task } from "~/contexts/Task.type";
import type { PPPStageGroup } from "~/contexts/usePPPProcedures";

export const stageGroupExistInTask =
  (currentTargetLanguageItemId: number) =>
  (groupName: PPPStageGroup["name"], task: Task) =>
    task.stageGroups.some(
      (group) =>
        group.targetLanguageItemId === currentTargetLanguageItemId &&
        group.name === groupName
    );
