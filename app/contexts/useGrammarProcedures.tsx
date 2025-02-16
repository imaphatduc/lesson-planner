export interface GrammarStageGroup {
  id: string;
  name:
    | "Lead-in"
    | "Setting context"
    | "Presentation"
    | "Practice"
    | "Production";
  color: string;
  stages: string[];
}

export interface GrammarStage {
  id: string;
  name: string;
}

export const useGrammarProcedures = () => {
  const grammarStageGroups: GrammarStageGroup[] = [
    {
      id: "0",
      name: "Lead-in",
      color: "text-blue-300",
      stages: ["0."],
    },
    {
      id: "1",
      name: "Setting context",
      color: "text-pink-300",
      stages: ["1."],
    },
    {
      id: "2",
      name: "Presentation",
      color: "text-yellow-300",
      stages: ["2.1", "2.2", "2.3", "2.4"],
    },
    {
      id: "3",
      name: "Practice",
      color: "text-purple-300",
      stages: ["3.1", "3.2"],
    },
    {
      id: "4",
      name: "Production",
      color: "text-green-300",
      stages: ["4."],
    },
  ];

  const grammarStages: GrammarStage[] = [
    {
      id: "0.",
      name: "Lead-in",
    },
    {
      id: "1.",
      name: "Setting context",
    },
    {
      id: "2.1",
      name: "Presenting meaning",
    },
    {
      id: "2.2",
      name: "Presenting form",
    },
    {
      id: "2.3",
      name: "Mechanical oral practice",
    },
    {
      id: "2.4",
      name: "Meaningful oral practice",
    },
    {
      id: "3.1",
      name: "Controlled practice",
    },
    {
      id: "3.2",
      name: "Less-controlled practice",
    },
    {
      id: "4.",
      name: "Production",
    },
  ];

  const getStage = (id: string) =>
    grammarStages.find((stage) => stage.id === id)!;

  return { grammarStages, grammarStageGroups, getStage };
};
