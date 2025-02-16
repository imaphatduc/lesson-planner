import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setStageInTask } from "../setStageInTask";

export const removeProcedure =
  (metadata: LessonMetadata) =>
  (taskId: number, stageId: string, procedureId: number) => {
    setStageInTask(metadata)(taskId, stageId, (stage) => {
      return {
        ...stage,
        procedures: stage.procedures.filter((p) => p.id !== procedureId),
      };
    });
  };
