import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setProcedure } from "./setProcedure";

export const editProcedure =
  (metadata: LessonMetadata) =>
  (
    id: number,
    taskId: number,
    stageId: string,
    activities: string,
    content: string
  ) => {
    setProcedure(metadata)(taskId, stageId, id, (procedure) => ({
      ...procedure,
      ...(activities.length > 0 ? { activities } : {}),
      ...(content.length > 0 ? { content } : {}),
    }));
  };
