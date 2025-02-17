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
  setStageGroupForTask: (groupId: string, taskId: number) => void;
  removeTaskFromStageGroup: (groupId: string, taskId: number) => void;

  getTasksByStage: (
    stageId: string,
    targetLanguageItemId?: number
  ) => TaskInStage[];
  setStageForTask: (stageId: string, taskId: number) => void;
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

export interface ActionProps {
  getId: (metadata: LessonMetadata) => string;
  setMyLessons: Dispatch<SetStateAction<Lesson[]>>;
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

  const { getLessonById, getId, setMyLessons } = use(MyLessonsContext);

  const currentLesson = getLessonById(currentLessonId)!;

  const { targetLanguageItems, tasks, ...metadata } = currentLesson;

  const getCurrentTargetLanguageItem = () =>
    targetLanguageItems.find((d) => d.current) ?? targetLanguageItems[0];

  const props: ActionProps = {
    getId,
    setMyLessons,
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
