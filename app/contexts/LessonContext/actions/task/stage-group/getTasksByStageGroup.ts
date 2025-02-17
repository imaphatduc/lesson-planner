import type { ActionProps } from "~/contexts/LessonContext/LessonContext";

export const getTasksByStageGroup =
  ({ metadata, tasks, currentTargetLanguageItemId }: ActionProps) =>
  (groupId: string, targetLanguageItemId?: number) => {
    const _ = (d: number) =>
      targetLanguageItemId !== undefined
        ? d === targetLanguageItemId
        : d === currentTargetLanguageItemId;

    if (metadata.currentStep >= 2) {
      return tasks.filter((task) =>
        task.stages.some(
          (stage) =>
            _(stage.targetLanguageItemId) && stage.id.startsWith(`${groupId}.`)
        )
      );
    }

    const getTasks = (groupId: string, only = false) =>
      tasks.filter((task) =>
        task.stageGroups.some(
          (group) =>
            (only ? _(group.targetLanguageItemId) : true) &&
            group.id === groupId
        )
      );

    const getLeadinAndProductionTasks = () => {
      const allTasks = tasks.filter(
        (task) =>
          !getTasks("1").some((d) => d.id === task.id) &&
          !getTasks("2").some((d) => d.id === task.id) &&
          !getTasks("3").some((d) => d.id === task.id)
      );

      if (allTasks.length === 1) {
        return { leadinTasks: [], productionTasks: allTasks };
      }

      const [leadinTask, ...productionTasks] = allTasks;

      return { leadinTasks: [leadinTask], productionTasks };
    };

    switch (groupId) {
      case "0":
        return getLeadinAndProductionTasks().leadinTasks;
      case "4":
        return getLeadinAndProductionTasks().productionTasks;
      default:
        return getTasks(groupId, true);
    }
  };
