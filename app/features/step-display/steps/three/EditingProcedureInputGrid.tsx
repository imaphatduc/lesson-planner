import { LessonContext, type TaskProcedure } from "~/contexts";
import NestedGridLayout from "./NestedGridLayout";
import ProcedureInput from "./ProcedureInput";
import { getEditors } from "~/features/rich-text";
import { use } from "react";

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
  const { editProcedure } = use(LessonContext);

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
