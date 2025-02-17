import { setTask } from "../setTask";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";

export const removeTaskFromStage =
  (props: ActionProps) => (stageId: string, taskId: number) => {
    setTask(props)(taskId, (task) => {
      const { currentTargetLanguageItemId } = props;

      if (stageId.startsWith("0.") || stageId.startsWith("4.")) {
        return {
          ...task,
          stages: task.stages.filter((stage) => stage.id !== stageId),
        };
      }

      return {
        ...task,
        stages: task.stages.filter(
          (stage) =>
            !(
              stage.targetLanguageItemId === currentTargetLanguageItemId &&
              stage.id === stageId
            )
        ),
      };
    });
  };
