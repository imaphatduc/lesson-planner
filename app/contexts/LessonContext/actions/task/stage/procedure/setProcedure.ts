import type { TaskProcedure } from "~/contexts/Task.type";
import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setStageInTask } from "../setStageInTask";

export const setProcedure =
  (metadata: LessonMetadata) =>
  (
    taskId: number,
    stageId: string,
    procedureId: number,
    set: (procedure: TaskProcedure) => TaskProcedure
  ) => {
    setStageInTask(metadata)(taskId, stageId, (stage) => {
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
