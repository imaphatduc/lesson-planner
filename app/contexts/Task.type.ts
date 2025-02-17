import type { PPPStage, PPPStageGroup } from "./usePPPProcedures";

export interface TaskProcedure {
  id: number;
  activities: string;
  content: string;
}

export interface TaskGroupStage {
  name: PPPStageGroup["name"];
  targetLanguageItemId: number;
}

export interface TaskStage {
  name: PPPStage["name"];
  targetLanguageItemId: number;
  timing: number;
  procedures: TaskProcedure[];
}

export interface Task {
  id: number;
  instructions: string;
  stageGroups: TaskGroupStage[];
  stages: TaskStage[];
  field?: string;
  audio?: string;
}

export type TaskInStage = Task & { stage?: TaskStage };
