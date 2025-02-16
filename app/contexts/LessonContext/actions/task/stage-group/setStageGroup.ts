import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setTasks } from "../setTasks";
import { currentTargetLanguageItemGoodForTask } from "./currentTargetLanguageItemGoodForTask";
import { stageGroupExistInTask } from "./stageGroupExistInTask";

export const setStageGroup =
  (metadata: LessonMetadata, currentTargetLanguageItemId: number) =>
  (groupId: string, taskId: number) => {
    setTasks(metadata)((task) => {
      if (
        currentTargetLanguageItemGoodForTask(currentTargetLanguageItemId)(task)
      ) {
        if (task.id === taskId) {
          return {
            ...task,
            stageGroups: !stageGroupExistInTask(currentTargetLanguageItemId)(
              groupId,
              task
            )
              ? [
                  ...task.stageGroups,
                  {
                    id: groupId,
                    targetLanguageItemId: currentTargetLanguageItemId,
                  },
                ]
              : task.stageGroups,
          };
        }

        if (groupId === "2") {
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
      }

      return task;
    });
  };
