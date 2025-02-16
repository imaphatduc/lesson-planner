export interface TaskProcedure {
  id: number;
  activities: string;
  content: string;
}

export interface TaskGroupStage {
  id: string;
  targetLanguageItemId: number;
}

export interface TaskStage {
  id: string;
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
