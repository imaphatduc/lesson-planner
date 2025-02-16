import type { TaskStage } from "~/contexts/Task.type";
import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setTask } from "../setTask";

export const setStageInTask =
  (metadata: LessonMetadata) =>
  (taskId: number, stageId: string, set: (stage: TaskStage) => TaskStage) => {
    setTask(metadata)(taskId, (task) => {
      return {
        ...task,
        stages: task.stages.map((stage) => {
          if (stage.id === stageId) {
            return set(stage);
          }

          return stage;
        }),
      };
    });
  };
