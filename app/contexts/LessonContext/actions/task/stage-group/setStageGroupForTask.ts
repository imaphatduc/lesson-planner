import type { ActionProps } from "~/contexts/LessonContext/LessonContext";
import { setTasks } from "../setTasks";
import { currentTargetLanguageItemGoodForTask } from "./currentTargetLanguageItemGoodForTask";
import { stageGroupExistInTask } from "./stageGroupExistInTask";
import type { PPPStageGroup } from "~/contexts/usePPPProcedures";

export const setStageGroupForTask =
  (props: ActionProps) =>
  (groupName: PPPStageGroup["name"], taskId: number) => {
    const { currentTargetLanguageItemId } = props;

    setTasks(props)((task) => {
      if (
        currentTargetLanguageItemGoodForTask(currentTargetLanguageItemId)(task)
      ) {
        if (task.id === taskId) {
          return {
            ...task,
            stageGroups: !stageGroupExistInTask(currentTargetLanguageItemId)(
              groupName,
              task
            )
              ? [
                  ...task.stageGroups,
                  {
                    name: groupName,
                    targetLanguageItemId: currentTargetLanguageItemId,
                  },
                ]
              : task.stageGroups,
          };
        }

        if (groupName === "Presentation") {
          return {
            ...task,
            stageGroups: task.stageGroups.filter(
              (group) =>
                !(
                  group.targetLanguageItemId === currentTargetLanguageItemId &&
                  group.name === groupName
                )
            ),
          };
        }
      }

      return task;
    });
  };
