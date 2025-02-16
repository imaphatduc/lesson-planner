import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setStageInTask } from "../setStageInTask";

export const addProcedure =
  (metadata: LessonMetadata) =>
  (
    taskId: number,
    stageId: string,
    activities: string,
    content: string,
    procedureId?: number
  ) => {
    setStageInTask(metadata)(taskId, stageId, (stage) => {
      if (procedureId) {
        let index = stage.procedures.findIndex((p) => p.id === procedureId);

        if (index === -1) {
          return stage;
        }

        const procedures = [
          ...stage.procedures.slice(0, index),
          {
            id: procedureId,
            activities,
            content,
          },
          ...stage.procedures.slice(index).map((p) => ({
            ...p,
            id: p.id + 1,
          })),
        ];

        return {
          ...stage,
          procedures,
        };
      }

      const id = stage.procedures.reduce((max, p) => Math.max(p.id, max), 0);

      return {
        ...stage,
        procedures: [
          ...stage.procedures,
          {
            id,
            activities,
            content,
          },
        ],
      };
    });
  };
