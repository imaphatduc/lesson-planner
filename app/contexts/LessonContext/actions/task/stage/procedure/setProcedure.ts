import type { TaskProcedure } from "~/contexts/Task.type";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";
import { setStage } from "../setStage";
import type { PPPStage } from "~/contexts/usePPPProcedures";

export const setProcedure =
  (props: ActionProps) =>
  (
    taskId: number,
    stageName: PPPStage["name"],
    procedureId: number,
    set: (procedure: TaskProcedure) => TaskProcedure
  ) => {
    setStage(props)(taskId, stageName, (stage) => {
      return {
        ...stage,
        procedures: stage.procedures.map((procedure) => {
          if (procedure.id === procedureId) {
            return set(procedure);
          }

          return procedure;
        }),
      };
    });
  };
