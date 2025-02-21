import { LessonContext, type TaskProcedure } from "~/contexts";
import NestedGridLayout from "./NestedGridLayout";
import ProcedureInput from "./ProcedureInput";
import { getEditors } from "~/features/rich-text";
import { use } from "react";
import type { PPPStage } from "~/contexts/usePPPProcedures";

interface Props {
  taskId: number;
  stageName: PPPStage["name"];
  procedure: TaskProcedure;
  setEditing: (d: boolean) => void;
}

const EditingProcedureInputGrid = ({
  taskId,
  stageName,
  procedure,
  setEditing,
}: Props) => {
  const { editProcedure } = use(LessonContext);

  const [activitiesEditor, contentEditor] = getEditors([
    {
      defaultValue: procedure.activities,
      setter: (activities) =>
        editProcedure(procedure.id, taskId, stageName, activities, ""),
    },
    {
      defaultValue: procedure.content,
      setter: (content) =>
        editProcedure(procedure.id, taskId, stageName, "", content),
    },
  ]);

  return (
    activitiesEditor &&
    contentEditor && (
      <NestedGridLayout
        Left={<ProcedureInput editor={activitiesEditor} />}
        Right={
          <ProcedureInput editor={contentEditor}>
            <button
              className="px-3 py-1 rounded-b-sm text-white bg-green-700 hover:bg-green-800 transition cursor-pointer"
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
