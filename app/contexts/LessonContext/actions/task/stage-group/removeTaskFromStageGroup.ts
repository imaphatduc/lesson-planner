import type { ActionProps } from "~/contexts/LessonContext/LessonContext";
import { setTasks } from "../setTasks";

export const removeTaskFromStageGroup =
  (props: ActionProps) => (groupId: string, taskId: number) => {
    setTasks(props)((task) => {
      const { currentTargetLanguageItemId } = props;

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
