import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setStageInTask } from "./setStageInTask";

export const editTaskStageTiming =
  (metadata: LessonMetadata) =>
  (taskId: number, stageId: string, timing: number) => {
    setStageInTask(metadata)(taskId, stageId, (stage) => ({
      ...stage,
      timing,
    }));
  };
