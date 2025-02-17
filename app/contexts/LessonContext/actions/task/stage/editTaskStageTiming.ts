import type { PPPStage } from "~/contexts/usePPPProcedures";
import { setStage } from "./setStage";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";

export const editTaskStageTiming =
  (props: ActionProps) =>
  (taskId: number, stageName: PPPStage["name"], timing: number) => {
    setStage(props)(taskId, stageName, (stage) => ({
      ...stage,
      timing,
    }));
  };
