import { use, useState } from "react";
import NestedGridLayout from "./NestedGridLayout";
import ProcedureInput from "./ProcedureInput";
import AddProcedureButtonGrid from "./AddProcedureButtonGrid";
import { LessonContext } from "~/contexts";
import { getEditors } from "~/features/rich-text";

interface Props {
  taskId: number;
  stageId: string;
  procedureId?: number;
}

const ProcedureInputGrid = ({ taskId, stageId, procedureId }: Props) => {
  const { addProcedure } = use(LessonContext);

  const [pendingProcedure, setPendingProcedure] = useState({
    activities: "",
    content: "",
  });

  const editPendingProcedure = (activities: string, content: string) => {
    setPendingProcedure({
      ...(activities.length > 0
        ? { activities }
        : { activities: pendingProcedure.activities }),
      ...(content.length > 0
        ? { content }
        : { content: pendingProcedure.content }),
    });
  };

  const addTaskProcedure = (taskId: number, stageId: string) => {
    addProcedure(
      taskId,
      stageId,
      pendingProcedure.activities,
      pendingProcedure.content,
      procedureId
    );

    setPendingProcedure({
      activities: "",
      content: "",
    });
  };

  const { activitiesEditor, contentEditor } = getEditors(
    (activities) => editPendingProcedure(activities, ""),
    (content) => editPendingProcedure("", content)
  );

  return (
    activitiesEditor &&
    contentEditor && (
      <NestedGridLayout
        Left={<ProcedureInput editor={activitiesEditor} />}
        Right={
          <div>
            <ProcedureInput editor={contentEditor} />
            <AddProcedureButtonGrid
              onClick={() => {
                addTaskProcedure(taskId, stageId);
                activitiesEditor.commands.setContent("");
                contentEditor.commands.setContent("");
              }}
            />
          </div>
        }
      />
    )
  );
};

export default ProcedureInputGrid;
