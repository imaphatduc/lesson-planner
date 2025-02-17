import type { ActionProps } from "~/contexts/LessonContext/LessonContext";
import { setTasks } from "../setTasks";
import type { PPPStageGroup } from "~/contexts/usePPPProcedures";

export const removeTaskFromStageGroup =
  (props: ActionProps) =>
  (groupName: PPPStageGroup["name"], taskId: number) => {
    setTasks(props)((task) => {
      const { currentTargetLanguageItemId } = props;

      if (task.id === taskId) {
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

      return task;
    });
  };
