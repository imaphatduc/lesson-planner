import type { PPPStage } from "~/contexts/usePPPProcedures";
import { setStage } from "../setStage";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";

export const removeProcedure =
  (props: ActionProps) =>
  (taskId: number, stageName: PPPStage["name"], procedureId: number) => {
    setStage(props)(taskId, stageName, (stage) => {
      return {
        ...stage,
        procedures: stage.procedures.filter((p) => p.id !== procedureId),
      };
    });
  };
