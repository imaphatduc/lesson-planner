import { createContext, use, useState, type PropsWithChildren } from "react";
import type { Task, TaskInStage, TaskProcedure } from "../Task.type";
import type { LessonMetadata, TargetLanguageItem } from "../Lesson.type";
import { MyLessonsContext } from "~/contexts/MyLessonsContext";
import { setCurrentStep } from "./actions/lesson";
import {
  setCurrentTargetLanguageItem,
  addTargetLanguageItem,
  removeTargetLanguageItem,
} from "./actions/target-language-item";
import { editTaskInstructions } from "./actions/task";
import {
  getTasksByStageGroup,
  getGoodTasksForStageGroup,
  setStageGroup,
  removeTaskFromStageGroup,
} from "./actions/task/stage-group";
import {
  getTasksByStage,
  setStage,
  editTaskStageTiming,
  removeTaskFromStage,
} from "./actions/task/stage";
import {
  addProcedure,
  editProcedure,
  moveProcedure,
  removeProcedure,
} from "./actions/task/stage/procedure";

interface T {
  preview: boolean;
  togglePreview: () => void;

  metadata: LessonMetadata;
  setCurrentStep: (axis: number) => void;

  // TARGET LANGUAGE ITEM //

  targetLanguageItems: TargetLanguageItem[];
  getCurrentTargetLanguageItem: () => TargetLanguageItem;
  setCurrentTargetLanguageItem: (id: number, newName?: string) => void;
  addTargetLanguageItem: (name: string) => void;
  removeTargetLanguageItem: (id: number) => void;

  // TASK //

  tasks: Task[];
  editTaskInstructions: (taskId: number, instructions: string) => void;

  getTasksByStageGroup: (
    groupId: string,
    targetLanguageItemId?: number
  ) => Task[];
  getGoodTasksForStageGroup: (groupId: string) => Task[];
  setStageGroup: (groupId: string, taskId: number) => void;
  removeTaskFromStageGroup: (groupId: string, taskId: number) => void;

  getTasksByStage: (
    stageId: string,
    targetLanguageItemId?: number
  ) => TaskInStage[];
  setStage: (stageId: string, taskId: number) => void;
  editTaskStageTiming: (
    taskId: number,
    stageId: string,
    timing: number
  ) => void;
  removeTaskFromStage: (stageId: string, taskId: number) => void;

  addProcedure: (
    taskId: number,
    stageId: string,
    activities: string,
    content: string,
    procedureId?: number
  ) => void;
  editProcedure: (
    id: number,
    taskId: number,
    stageId: string,
    activities: string,
    content: string
  ) => void;
  moveProcedure: (
    pending: {
      stageId: string;
      taskId: number;
      procedure: TaskProcedure;
    },
    target: {
      stageId: string;
      taskId: number;
      procedureId: number;
    }
  ) => void;
  removeProcedure: (
    taskId: number,
    stageId: string,
    procedureId: number
  ) => void;
}

// @ts-expect-error
export const LessonContext = createContext<T>({});

interface Props {
  currentLessonId: string;
  defaultPreview?: boolean;
}

export const LessonProvider = ({
  children,
  currentLessonId,
  defaultPreview = false,
}: PropsWithChildren<Props>) => {
  const [preview, setPreview] = useState(defaultPreview);

  const togglePreview = () => setPreview((d) => !d);

  const { getLessonById } = use(MyLessonsContext);

  const currentLesson = getLessonById(currentLessonId)!;

  const { targetLanguageItems, tasks, ...metadata } = currentLesson;

  const getCurrentTargetLanguageItem = () =>
    targetLanguageItems.find((d) => d.current) ?? targetLanguageItems[0];

  return (
    <LessonContext.Provider
      value={{
        preview,
        togglePreview,
        metadata,
        setCurrentStep: setCurrentStep(metadata),
        targetLanguageItems,
        getCurrentTargetLanguageItem,
        setCurrentTargetLanguageItem: setCurrentTargetLanguageItem(metadata),
        addTargetLanguageItem: addTargetLanguageItem(metadata),
        removeTargetLanguageItem: removeTargetLanguageItem(metadata),
        tasks,
        editTaskInstructions: editTaskInstructions(metadata),
        getTasksByStageGroup: getTasksByStageGroup(
          metadata,
          tasks,
          getCurrentTargetLanguageItem().id
        ),
        getGoodTasksForStageGroup: getGoodTasksForStageGroup(
          tasks,
          getCurrentTargetLanguageItem().id
        ),
        setStageGroup: setStageGroup(
          metadata,
          getCurrentTargetLanguageItem().id
        ),
        removeTaskFromStageGroup: removeTaskFromStageGroup(
          metadata,
          getCurrentTargetLanguageItem().id
        ),
        getTasksByStage: getTasksByStage(
          tasks,
          getCurrentTargetLanguageItem().id
        ),
        setStage: setStage(
          metadata,
          targetLanguageItems,
          getCurrentTargetLanguageItem().id
        ),
        editTaskStageTiming: editTaskStageTiming(metadata),
        removeTaskFromStage: removeTaskFromStage(
          metadata,
          getCurrentTargetLanguageItem().id
        ),
        addProcedure: addProcedure(metadata),
        editProcedure: editProcedure(metadata),
        moveProcedure: moveProcedure(metadata, tasks),
        removeProcedure: removeProcedure(metadata),
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};
