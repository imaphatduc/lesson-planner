import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setTasks } from "../setTasks";

export const removeTaskFromStageGroup =
  (metadata: LessonMetadata, currentTargetLanguageItemId: number) =>
  (groupId: string, taskId: number) => {
    setTasks(metadata)((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          stageGroups: task.stageGroups.filter(
            (group) =>
              !(
                group.targetLanguageItemId === currentTargetLanguageItemId &&
                group.id === groupId
              )
          ),
        };
      }

      return task;
    });
  };
