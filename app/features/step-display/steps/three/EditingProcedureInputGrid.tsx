import { LessonContext, type TaskProcedure } from "~/contexts";
import NestedGridLayout from "./NestedGridLayout";
import ProcedureInput from "./ProcedureInput";
import { use } from "react";
import { getEditors } from "~/features/rich-text";

interface Props {
  taskId: number;
  stageId: string;
  procedure: TaskProcedure;
  setEditing: (d: boolean) => void;
}

const EditingProcedureInputGrid = ({
  taskId,
  stageId,
  procedure,
  setEditing,
}: Props) => {
  const { tasks, setTasks } = use(LessonContext);

  const editProcedure = (
    id: number,
    taskId: number,
    stageId: string,
    activities: string,
    content: string
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
                  procedures: stage.procedures.map((p) => {
                    if (p.id === id) {
                      return {
                        ...p,
                        ...(activities.length > 0 ? { activities } : {}),
                        ...(content.length > 0 ? { content } : {}),
                      };
                    }

                    return p;
                  }),
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

  const { activitiesEditor, contentEditor } = getEditors(
    (activities) =>
      editProcedure(procedure.id, taskId, stageId, activities, ""),
    (content) => editProcedure(procedure.id, taskId, stageId, "", content),
    {
      activities: procedure.activities,
      content: procedure.content,
    }
  );

  return (
    activitiesEditor &&
    contentEditor && (
      <NestedGridLayout
        Left={<ProcedureInput editor={activitiesEditor} />}
        Right={
          <ProcedureInput editor={contentEditor}>
            <button
              className="px-3 py-1 rounded-b-sm bg-green-700 hover:bg-green-800 transition cursor-pointer"
              onClick={() => setEditing(false)}
            >
              Done
            </button>
          </ProcedureInput>
        }
      />
    )
  );
};

export default EditingProcedureInputGrid;
