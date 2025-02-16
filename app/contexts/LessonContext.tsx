import { createContext, use, useState, type PropsWithChildren } from "react";
import type { Task, TaskInStage, TaskProcedure, TaskStage } from "./Task.type";
import type { LessonMetadata, TargetLanguageItem } from "./Lesson.type";
import { MyLessonsContext } from "~/contexts/MyLessonsContext";
import { steps } from "~/features/step-display";

interface T {
  preview: boolean;
  togglePreview: () => void;
  metadata: LessonMetadata;
  tasks: Task[];
  getCurrentTargetLanguageItem: () => TargetLanguageItem;
  setCurrentTargetLanguageItem: (id: number, newName?: string) => void;
  targetLanguageItems: TargetLanguageItem[];
  addTargetLanguageItem: (name: string) => void;
  removeTargetLanguageItem: (id: number) => void;
  setTasks: (d: Task[]) => void;
  getTasksId: (d: Task[]) => number[];
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
  removeTaskFromStage: (stageId: string, taskId: number) => void;
  addProcedure: (
    taskId: number,
    stageId: string,
    activities: string,
    content: string,
    procedureId?: number
  ) => void;
  removeProcedure: (
    taskId: number,
    stageId: string,
    procedureId: number
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
  setCurrentStep: (axis: number) => void;
  editTaskInstructions: (taskId: number, instructions: string) => void;
  editTaskStageTiming: (
    taskId: number,
    stageId: string,
    timing: number
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

  const { myLessons, setMyLessons, getId, getLessonById } =
    use(MyLessonsContext);

  const currentLesson = getLessonById(currentLessonId)!;

  const { targetLanguageItems, tasks, ...metadata } = currentLesson;

  const getCurrentTargetLanguageItem = () =>
    targetLanguageItems.find((d) => d.current) ?? targetLanguageItems[0];

  const setCurrentTargetLanguageItem = (id: number, newName?: string) => {
    setMyLessons(
      myLessons.map((lesson) => {
        if (getId(lesson) === currentLessonId) {
          return {
            ...lesson,
            targetLanguageItems: lesson.targetLanguageItems.map(
              (targetLanguageItem) => {
                if (targetLanguageItem.id === id) {
                  return {
                    ...targetLanguageItem,
                    name: newName ?? targetLanguageItem.name,
                    current: true,
                  };
                }

                return {
                  ...targetLanguageItem,
                  current: false,
                };
              }
            ),
          };
        }

        return lesson;
      })
    );
  };

  const addTargetLanguageItem = (name: string) => {
    setMyLessons(
      myLessons.map((lesson) => {
        if (getId(lesson) === currentLessonId) {
          return {
            ...lesson,
            targetLanguageItems: [
              ...lesson.targetLanguageItems.map((targetLanguageItem) => ({
                ...targetLanguageItem,
                current: false,
              })),
              {
                id: targetLanguageItems.length,
                name,
                tasks: [],
                current: true,
              },
            ],
          };
        }

        return lesson;
      })
    );
  };

  const removeTargetLanguageItem = (id: number) => {
    setMyLessons(
      myLessons.map((lesson) => {
        if (getId(lesson) === currentLessonId) {
          return {
            ...lesson,
            targetLanguageItems: lesson.targetLanguageItems
              .filter((d) => d.id !== id)
              .map((_, i) => ({
                ..._,
                current: i === targetLanguageItems.length - 1,
              })),
          };
        }

        return lesson;
      })
    );
  };

  const setTasks = (tasks: Task[]) => {
    setMyLessons(
      myLessons.map((lesson) => {
        if (getId(lesson) === currentLessonId) {
          return {
            ...lesson,
            tasks,
          };
        }

        return lesson;
      })
    );
  };

  const getTasksId = (tasks: Task[]) => tasks.map((task) => task.id);

  const getTasksByStageGroup = (
    groupId: string,
    targetLanguageItemId?: number
  ) => {
    const _ = (d: number) =>
      targetLanguageItemId !== undefined
        ? d === targetLanguageItemId
        : d === getCurrentTargetLanguageItem().id;

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

  const currentTargetLanguageItemGoodForTask = (task: Task) =>
    task.stageGroups.length === 0 ||
    task.stageGroups.some(
      (group) =>
        group.targetLanguageItemId === getCurrentTargetLanguageItem().id
    );

  const stageGroupExistInTask = (groupId: string, task: Task) =>
    task.stageGroups.some(
      (group) =>
        group.targetLanguageItemId === getCurrentTargetLanguageItem().id &&
        group.id === groupId
    );

  const getGoodTasksForStageGroup = () => {
    return tasks.filter((task) => currentTargetLanguageItemGoodForTask(task));
  };

  const setStageGroup = (groupId: string, taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (currentTargetLanguageItemGoodForTask(task)) {
          if (task.id === taskId) {
            return {
              ...task,
              stageGroups: !stageGroupExistInTask(groupId, task)
                ? [
                    ...task.stageGroups,
                    {
                      id: groupId,
                      targetLanguageItemId: getCurrentTargetLanguageItem().id,
                    },
                  ]
                : task.stageGroups,
            };
          }

          if (groupId === "2") {
            return {
              ...task,
              stageGroups: task.stageGroups.filter(
                (group) =>
                  !(
                    group.targetLanguageItemId ===
                      getCurrentTargetLanguageItem().id && group.id === groupId
                  )
              ),
            };
          }
        }

        return task;
      })
    );
  };

  const removeTaskFromStageGroup = (groupId: string, taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            stageGroups: task.stageGroups.filter(
              (group) =>
                !(
                  group.targetLanguageItemId ===
                    getCurrentTargetLanguageItem().id && group.id === groupId
                )
            ),
          };
        }

        return task;
      })
    );
  };

  const getTasksByStage = (stageId: string, targetLanguageItemId?: number) => {
    const removeProperty = (obj: Task, key: "stages") => {
      const { [key]: _, ...newObj } = obj;
      return newObj;
    };

    const _ = (stage: TaskStage) =>
      stage.id === stageId &&
      (targetLanguageItemId !== undefined
        ? stage.targetLanguageItemId === targetLanguageItemId
        : stage.targetLanguageItemId === getCurrentTargetLanguageItem().id);

    const tasksInStage = tasks
      .filter((task) => task.stages.some((stage) => _(stage)))
      .map((task) => {
        const stage = task.stages.find(_);

        return {
          ...task,
          stage,
        };
      });

    return tasksInStage;
  };

  const setStage = (stageId: string, taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          if (stageId.startsWith("0.") || stageId.startsWith("4.")) {
            return {
              ...task,
              stages: !task.stages.some((stage) => stage.id === stageId)
                ? [
                    ...task.stages,
                    ...targetLanguageItems.map((targetLanguageItem) => ({
                      id: stageId,
                      targetLanguageItemId: targetLanguageItem.id,
                      timing: 0,
                      procedures: [],
                    })),
                  ]
                : task.stages,
            };
          }

          return {
            ...task,
            stages: !task.stages.some(
              (stage) =>
                stage.id === stageId &&
                stage.targetLanguageItemId === getCurrentTargetLanguageItem().id
            )
              ? [
                  ...task.stages,
                  {
                    id: stageId,
                    targetLanguageItemId: getCurrentTargetLanguageItem().id,
                    timing: 0,
                    procedures: [],
                  },
                ]
              : task.stages,
          };
        }

        return task;
      })
    );
  };

  const removeTaskFromStage = (stageId: string, taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          if (stageId.startsWith("0.") || stageId.startsWith("4.")) {
            return {
              ...task,
              stages: task.stages.filter((stage) => stage.id !== stageId),
            };
          }

          return {
            ...task,
            stages: task.stages.filter(
              (stage) =>
                !(
                  stage.targetLanguageItemId ===
                    getCurrentTargetLanguageItem().id && stage.id === stageId
                )
            ),
          };
        }

        return task;
      })
    );
  };

  const addProcedure = (
    taskId: number,
    stageId: string,
    activities: string,
    content: string,
    procedureId?: number
  ) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            stages: task.stages.map((stage) => {
              if (stage.id === stageId) {
                if (procedureId) {
                  let index = stage.procedures.findIndex(
                    (p) => p.id === procedureId
                  );

                  if (index === -1) {
                    return stage;
                  }

                  const procedures = [
                    ...stage.procedures.slice(0, index),
                    {
                      id: procedureId,
                      activities,
                      content,
                    },
                    ...stage.procedures.slice(index).map((p) => ({
                      ...p,
                      id: p.id + 1,
                    })),
                  ];

                  return {
                    ...stage,
                    procedures,
                  };
                }

                const id = stage.procedures.reduce(
                  (max, p) => Math.max(p.id, max),
                  0
                );

                return {
                  ...stage,
                  procedures: [
                    ...stage.procedures,
                    {
                      id,
                      activities,
                      content,
                    },
                  ],
                };
              }

              return stage;
            }),
          };
        }

        return task;
      })
    );
  };

  const removeProcedure = (
    taskId: number,
    stageId: string,
    procedureId: number
  ) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            stages: task.stages.map((stage) => {
              if (stage.id === stageId) {
                return {
                  ...stage,
                  procedures: stage.procedures.filter(
                    (p) => p.id !== procedureId
                  ),
                };
              }

              return stage;
            }),
          };
        }

        return task;
      })
    );
  };

  const moveProcedure = (
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
  ) => {
    if (
      pending.stageId === target.stageId &&
      pending.taskId === target.taskId &&
      pending.procedure.id === target.procedureId
    ) {
      return;
    }

    const tasksAfterRemoved = tasks.map((task) => {
      if (task.id === pending.taskId) {
        return {
          ...task,
          stages: task.stages.map((stage) => {
            if (stage.id === pending.stageId) {
              return {
                ...stage,
                procedures: stage.procedures.filter(
                  (p) => p.id !== pending.procedure.id
                ),
              };
            }

            return stage;
          }),
        };
      }

      return task;
    });

    const { stageId, taskId, procedureId } = target;

    setTasks(
      tasksAfterRemoved.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            stages: task.stages.map((stage) => {
              if (stage.id === stageId) {
                let index = stage.procedures.findIndex(
                  (p) => p.id === procedureId
                );

                if (index === -1) {
                  return stage;
                }

                const procedures = [
                  ...stage.procedures.slice(0, index),
                  {
                    ...pending.procedure,
                    id: procedureId,
                  },
                  ...stage.procedures.slice(index).map((p) => ({
                    ...p,
                    id: p.id + 1,
                  })),
                ];

                return {
                  ...stage,
                  procedures,
                };
              }

              return stage;
            }),
          };
        }

        return task;
      })
    );
  };

  const setCurrentStep = (axis: number) => {
    setMyLessons(
      myLessons.map((lesson) => {
        if (getId(lesson) === currentLessonId) {
          const newCurrentStep = lesson.currentStep + (axis > 0 ? 1 : -1);

          return {
            ...lesson,
            currentStep: Math.min(
              Math.max(newCurrentStep, 0),
              steps.length - 1
            ),
          };
        }

        return lesson;
      })
    );
  };

  const editTaskInstructions = (taskId: number, instructions: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            instructions,
          };
        }

        return task;
      })
    );
  };

  const editTaskStageTiming = (
    taskId: number,
    stageId: string,
    timing: number
  ) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            stages: task.stages.map((stage) => {
              if (stage.id === stageId) {
                return {
                  ...stage,
                  timing,
                };
              }

              return stage;
            }),
          };
        }

        return task;
      })
    );
  };

  return (
    <LessonContext.Provider
      value={{
        preview,
        togglePreview,
        metadata,
        tasks,
        getCurrentTargetLanguageItem,
        setCurrentTargetLanguageItem,
        targetLanguageItems,
        addTargetLanguageItem,
        removeTargetLanguageItem,
        setTasks,
        getTasksId,
        getTasksByStageGroup,
        getGoodTasksForStageGroup,
        setStageGroup,
        removeTaskFromStageGroup,
        getTasksByStage,
        setStage,
        removeTaskFromStage,
        addProcedure,
        removeProcedure,
        moveProcedure,
        setCurrentStep,
        editTaskInstructions,
        editTaskStageTiming,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};
