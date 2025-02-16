import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setTask } from "../setTask";

export const removeTaskFromStage =
  (metadata: LessonMetadata, currentTargetLanguageItemId: number) =>
  (stageId: string, taskId: number) => {
    setTask(metadata)(taskId, (task) => {
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
