import type { TaskProcedure } from "~/contexts/Task.type";
import { setCurrentLesson } from "../../../lesson/setCurrentLesson";
import type { ActionProps } from "~/contexts/LessonContext/LessonContext";
import type { PPPStage } from "~/contexts/usePPPProcedures";

export const moveProcedure =
  (props: ActionProps) =>
  (
    pending: {
      stageName: PPPStage["name"];
      taskId: number;
      procedure: TaskProcedure;
    },
    target: {
      stageName: string;
      taskId: number;
      procedureId: number;
    }
  ) => {
    const { tasks } = props;

    if (
      pending.stageName === target.stageName &&
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
            if (stage.name === pending.stageName) {
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

    const { stageName, taskId, procedureId } = target;

    setCurrentLesson(props)((lesson) => ({
      ...lesson,
      tasks: tasksAfterRemoved.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            stages: task.stages.map((stage) => {
              if (stage.name === stageName) {
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
