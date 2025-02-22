interface RestPPPStageGroup {
  color: string;
}

export type PPPStageGroup = RestPPPStageGroup &
  (
    | {
        name: "Lead-in";
      }
    | {
        name: "Setting context";
      }
    | {
        name: "Presentation";
      }
    | {
        name: "Practice";
      }
    | {
        name: "Production";
      }
  );

export interface PPPStage {
  name:
    | "Lead-in"
    | "Setting context"
    | "Presenting meaning"
    | "Presenting form"
    | "Mechanical oral practice"
    | "Meaningful oral practice"
    | "Revision written practice"
    | "Production";
  group: PPPStageGroup["name"];
}

export const usePPPProcedures = () => {
  const pppStageGroups: PPPStageGroup[] = [
    {
      name: "Lead-in",
      color: "text-blue-600 dark:text-blue-300",
    },
    {
      name: "Setting context",
      color: "text-pink-600 dark:text-pink-300",
    },
    {
      name: "Presentation",
      color: "text-yellow-600 dark:text-yellow-300",
    },
    {
      name: "Practice",
      color: "text-purple-600 dark:text-purple-300",
    },
    {
      name: "Production",
      color: "text-green-600 dark:text-green-300",
    },
  ];

  const pppStages: PPPStage[] = [
    {
      name: "Lead-in",
      group: "Lead-in",
    },
    {
      name: "Setting context",
      group: "Setting context",
    },
    {
      name: "Presenting meaning",
      group: "Presentation",
    },
    {
      name: "Presenting form",
      group: "Presentation",
    },
    {
      name: "Mechanical oral practice",
      group: "Practice",
    },
    {
      name: "Meaningful oral practice",
      group: "Practice",
    },
    {
      name: "Revision written practice",
      group: "Practice",
    },
    {
      name: "Production",
      group: "Production",
    },
  ];

  const getStage = (name: PPPStage["name"]) =>
    pppStages.find((stage) => stage.name === name)!;

  const getStagesInGroup = (name: PPPStageGroup["name"]) =>
    pppStages.filter((stage) => stage.group === name);

  return { pppStages, pppStageGroups, getStage, getStagesInGroup };
};
