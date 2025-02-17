import { setTask } from "../setTask";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";

export const setStageForTask =
  (props: ActionProps) => (stageId: string, taskId: number) => {
    setTask(props)(taskId, (task) => {
      const { targetLanguageItems, currentTargetLanguageItemId } = props;

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
