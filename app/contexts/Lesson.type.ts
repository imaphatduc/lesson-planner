import type { Task } from "./Task.type";

export const lessonReference = {
  A: "Vocabulary",
  B: "Grammar",
  // C: "Listening",
  D: "Grammar",
  E: "Word skills",
  // F: "Reading",
  G: "Speaking",
  H: "Writing",
} as const;

export type LessonCode = keyof typeof lessonReference;
export type LessonField = (typeof lessonReference)[LessonCode];

export interface TargetLanguageItem {
  id: number;
  name: string;
  current?: boolean;
}

export interface Lesson {
  id: string;
  no?: number;
  name: string;
  code: LessonCode | "";
  objectives: string;
  book: "Friends Global";
  grade: number;
  unit: number;
  unitName: string;
  page: number;
  image: string;
  targetLanguageItems: TargetLanguageItem[];
  tasks: Task[];
  currentStep: number;
}

type RestType<T, K extends keyof T> = Omit<T, K>;

export type LessonMetadata = RestType<
  RestType<Lesson, "targetLanguageItems">,
  "tasks"
>;
