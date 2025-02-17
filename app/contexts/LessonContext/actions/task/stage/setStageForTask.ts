import type { PPPStage } from "~/contexts/usePPPProcedures";
import { setTask } from "../setTask";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";

export const setStageForTask =
  (props: ActionProps) => (stage: PPPStage, taskId: number) => {
    setTask(props)(taskId, (task) => {
      const { targetLanguageItems, currentTargetLanguageItemId } = props;

      if (stage.group === "Lead-in" || stage.group === "Production") {
        return {
          ...task,
          stages: !task.stages.some((d) => d.name === stage.name)
            ? [
                ...task.stages,
                ...targetLanguageItems.map((targetLanguageItem) => ({
                  name: stage.name,
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
          (d) =>
            d.name === stage.name &&
            d.targetLanguageItemId === currentTargetLanguageItemId
        )
          ? [
              ...task.stages,
              {
                name: stage.name,
                targetLanguageItemId: currentTargetLanguageItemId,
                timing: 0,
                procedures: [],
              },
            ]
          : task.stages,
      };
    });
  };
