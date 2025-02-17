import type { TaskProcedure } from "~/contexts/Task.type";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";
import { setStage } from "../setStage";

export const setProcedure =
  (props: ActionProps) =>
  (
    taskId: number,
    stageId: string,
    procedureId: number,
    set: (procedure: TaskProcedure) => TaskProcedure
  ) => {
    setStage(props)(taskId, stageId, (stage) => {
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
