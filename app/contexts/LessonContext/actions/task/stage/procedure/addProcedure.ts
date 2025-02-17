import type { PPPStage } from "~/contexts/usePPPProcedures";
import { setStage } from "../setStage";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";

export const addProcedure =
  (props: ActionProps) =>
  (
    taskId: number,
    stageName: PPPStage["name"],
    activities: string,
    content: string,
    procedureId?: number
  ) => {
    setStage(props)(taskId, stageName, (stage) => {
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
