import type { ActionProps } from "~/contexts/LessonContext/LessonContext";
import {
  usePPPProcedures,
  type PPPStageGroup,
} from "~/contexts/usePPPProcedures";

export const getTasksByStageGroup =
  ({ metadata, tasks, currentTargetLanguageItemId }: ActionProps) =>
  (groupName: PPPStageGroup["name"], targetLanguageItemId?: number) => {
    const _ = (d: number) =>
      targetLanguageItemId !== undefined
        ? d === targetLanguageItemId
        : d === currentTargetLanguageItemId;

    const { getStage } = usePPPProcedures();

    if (metadata.currentStep >= 2) {
      return tasks.filter((task) =>
        task.stages.some(
          (stage) =>
            _(stage.targetLanguageItemId) &&
            getStage(stage.name).group === groupName
        )
      );
    }

    const getTasks = (groupName: PPPStageGroup["name"], only = false) => {
      return tasks.filter((task) =>
        task.stageGroups.some(
          (group) =>
            (only ? _(group.targetLanguageItemId) : true) &&
            group.name === groupName
        )
      );
    };

    const getLeadinAndProductionTasks = () => {
      const allTasks = tasks.filter(
        (task) =>
          !getTasks("Setting context").some((d) => d.id === task.id) &&
          !getTasks("Presentation").some((d) => d.id === task.id) &&
          !getTasks("Practice").some((d) => d.id === task.id)
      );

      if (allTasks.length === 1) {
        return { leadinTasks: [], productionTasks: allTasks };
      }

      const [leadinTask, ...productionTasks] = allTasks;

      return { leadinTasks: [leadinTask], productionTasks };
    };

    switch (groupName) {
      case "Lead-in":
        return getLeadinAndProductionTasks().leadinTasks;
      case "Production":
        return getLeadinAndProductionTasks().productionTasks;
      default:
        return getTasks(groupName, true);
    }
  };
