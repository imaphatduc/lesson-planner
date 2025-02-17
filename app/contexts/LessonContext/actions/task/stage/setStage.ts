import type { TaskStage } from "~/contexts/Task.type";
import { setTask } from "../setTask";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";
import type { PPPStage } from "~/contexts/usePPPProcedures";

export const setStage =
  (props: ActionProps) =>
  (
    taskId: number,
    stageName: PPPStage["name"],
    set: (stage: TaskStage) => TaskStage
  ) => {
    setTask(props)(taskId, (task) => {
      return {
        ...task,
        stages: task.stages.map((stage) => {
          if (stage.name === stageName) {
            return set(stage);
          }

          return stage;
        }),
      };
    });
  };
