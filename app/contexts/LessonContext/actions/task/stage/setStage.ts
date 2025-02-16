import type {
  LessonMetadata,
  TargetLanguageItem,
} from "~/contexts/Lesson.type";
import { setTask } from "../setTask";

export const setStage =
  (
    metadata: LessonMetadata,
    targetLanguageItems: TargetLanguageItem[],
    currentTargetLanguageItemId: number
  ) =>
  (stageId: string, taskId: number) => {
    setTask(metadata)(taskId, (task) => {
      if (stageId.startsWith("0.") || stageId.startsWith("4.")) {
        return {
          ...task,
          stages: !task.stages.some((stage) => stage.id === stageId)
            ? [
                ...task.stages,
                ...targetLanguageItems.map((targetLanguageItem) => ({
                  id: stageId,
                  targetLanguageItemId: targetLanguageItem.id,
                  timing: 0,
                  procedures: [],
                })),
              ]
            : task.stages,
        };
      }

      return {
        ...task,
        stages: !task.stages.some(
          (stage) =>
            stage.id === stageId &&
            stage.targetLanguageItemId === currentTargetLanguageItemId
        )
          ? [
              ...task.stages,
              {
                id: stageId,
                targetLanguageItemId: currentTargetLanguageItemId,
                timing: 0,
                procedures: [],
              },
            ]
          : task.stages,
      };
    });
  };
