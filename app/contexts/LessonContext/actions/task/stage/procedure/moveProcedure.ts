import type { LessonMetadata } from "~/contexts/Lesson.type";
import type { Task, TaskProcedure } from "~/contexts/Task.type";
import { setCurrentLesson } from "../../../lesson/setCurrentLesson";

export const moveProcedure =
  (metadata: LessonMetadata, tasks: Task[]) =>
  (
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

    setCurrentLesson(metadata)((lesson) => ({
      ...lesson,
      tasks: tasksAfterRemoved.map((task) => {
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
      }),
    }));
  };
