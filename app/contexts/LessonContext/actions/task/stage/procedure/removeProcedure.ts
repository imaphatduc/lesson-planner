import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setStage } from "../setStage";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";

export const removeProcedure =
  (props: ActionProps) =>
  (taskId: number, stageId: string, procedureId: number) => {
    setStage(props)(taskId, stageId, (stage) => {
      return {
        ...stage,
        procedures: stage.procedures.filter((p) => p.id !== procedureId),
      };
    });
  };
