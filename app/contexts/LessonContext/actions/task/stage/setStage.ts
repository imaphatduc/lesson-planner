import type { TaskStage } from "~/contexts/Task.type";
import { setTask } from "../setTask";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";

export const setStage =
  (props: ActionProps) =>
  (taskId: number, stageId: string, set: (stage: TaskStage) => TaskStage) => {
    setTask(props)(taskId, (task) => {
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
