import type { PPPStage } from "~/contexts/usePPPProcedures";
import { setProcedure } from "./setProcedure";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";

export const editProcedure =
  (props: ActionProps) =>
  (
    id: number,
    taskId: number,
    stageName: PPPStage["name"],
    activities: string,
    content: string
  ) => {
    setProcedure(props)(taskId, stageName, id, (procedure) => ({
      ...procedure,
      ...(activities.length > 0 ? { activities } : {}),
      ...(content.length > 0 ? { content } : {}),
    }));
  };
