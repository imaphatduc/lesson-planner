import { setStage } from "./setStage";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";

export const editTaskStageTiming =
  (props: ActionProps) => (taskId: number, stageId: string, timing: number) => {
    setStage(props)(taskId, stageId, (stage) => ({
      ...stage,
      timing,
    }));
  };
