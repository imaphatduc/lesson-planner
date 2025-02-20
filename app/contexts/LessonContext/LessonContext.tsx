import {
  createContext,
  use,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import type { Task, TaskInStage, TaskProcedure } from "../Task.type";
import type {
  Lesson,
  LessonMetadata,
  TargetLanguageItem,
} from "../Lesson.type";
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
  setStageGroupForTask,
  removeTaskFromStageGroup,
} from "./actions/task/stage-group";
import {
  getTasksByStage,
  setStageForTask,
  editTaskStageTiming,
  removeTaskFromStage,
} from "./actions/task/stage";
import {
  addProcedure,
  editProcedure,
  moveProcedure,
  removeProcedure,
} from "./actions/task/stage/procedure";
import type { PPPStage, PPPStageGroup } from "../usePPPProcedures";

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
    groupName: PPPStageGroup["name"],
    targetLanguageItemId?: number
  ) => Task[];
  getGoodTasksForStageGroup: () => Task[];
  setStageGroupForTask: (
    groupName: PPPStageGroup["name"],
    taskId: number
  ) => void;
  removeTaskFromStageGroup: (
    groupName: PPPStageGroup["name"],
    taskId: number
  ) => void;

  getTasksByStage: (
    stageName: PPPStage["name"],
    targetLanguageItemId?: number
  ) => TaskInStage[];
  setStageForTask: (stage: PPPStage, taskId: number) => void;
  editTaskStageTiming: (
    taskId: number,
    stageName: PPPStage["name"],
    timing: number
  ) => void;
  removeTaskFromStage: (stage: PPPStage, taskId: number) => void;

  addProcedure: (
    taskId: number,
    stageName: PPPStage["name"],
    activities: string,
    content: string,
    procedureId?: number
  ) => void;
  editProcedure: (
    id: number,
    taskId: number,
    stageName: PPPStage["name"],
    activities: string,
    content: string
  ) => void;
  moveProcedure: (
    pending: {
      stageName: PPPStage["name"];
      taskId: number;
      procedure: TaskProcedure;
    },
    target: {
      stageName: PPPStage["name"];
      taskId: number;
      procedureId?: number;
    }
  ) => void;
  removeProcedure: (
    taskId: number,
    stageName: PPPStage["name"],
    procedureId: number
  ) => void;
}

export interface ActionProps {
  metadata: T["metadata"];
  targetLanguageItems: T["targetLanguageItems"];
  tasks: T["tasks"];
  currentTargetLanguageItemId: number;
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

  const props: ActionProps = {
    metadata,
    targetLanguageItems,
    tasks,
    currentTargetLanguageItemId: getCurrentTargetLanguageItem().id,
  };

  return (
    <LessonContext.Provider
      value={{
        preview,
        togglePreview,
        metadata,
        setCurrentStep: setCurrentStep(props),
        targetLanguageItems,
        getCurrentTargetLanguageItem,
        setCurrentTargetLanguageItem: setCurrentTargetLanguageItem(props),
        addTargetLanguageItem: addTargetLanguageItem(props),
        removeTargetLanguageItem: removeTargetLanguageItem(props),
        tasks,
        editTaskInstructions: editTaskInstructions(props),
        getTasksByStageGroup: getTasksByStageGroup(props),
        getGoodTasksForStageGroup: getGoodTasksForStageGroup(props),
        setStageGroupForTask: setStageGroupForTask(props),
        removeTaskFromStageGroup: removeTaskFromStageGroup(props),
        getTasksByStage: getTasksByStage(props),
        setStageForTask: setStageForTask(props),
        editTaskStageTiming: editTaskStageTiming(props),
        removeTaskFromStage: removeTaskFromStage(props),
        addProcedure: addProcedure(props),
        editProcedure: editProcedure(props),
        moveProcedure: moveProcedure(props),
        removeProcedure: removeProcedure(props),
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};
