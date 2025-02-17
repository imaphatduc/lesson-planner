import type { PPPStage } from "~/contexts/usePPPProcedures";
import { setTask } from "../setTask";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";

export const removeTaskFromStage =
  (props: ActionProps) => (stage: PPPStage, taskId: number) => {
    setTask(props)(taskId, (task) => {
      const { currentTargetLanguageItemId } = props;

      if (stage.group === "Lead-in" || stage.group === "Production") {
        return {
          ...task,
          stages: task.stages.filter((stage) => stage.name !== stage.name),
        };
      }

      return {
        ...task,
        stages: task.stages.filter(
          (d) =>
            !(
              d.targetLanguageItemId === currentTargetLanguageItemId &&
              d.name === stage.name
            )
        ),
      };
    });
  };
