import { use, useState } from "react";
import NestedGridLayout from "./NestedGridLayout";
import ProcedureInput from "./ProcedureInput";
import AddProcedureButtonGrid from "./AddProcedureButtonGrid";
import { LessonContext } from "~/contexts";
import { getEditors } from "~/features/rich-text";
import type { PPPStage } from "~/contexts/usePPPProcedures";

interface Props {
  taskId: number;
  stageName: PPPStage["name"];
  procedureId?: number;
}

const ProcedureInputGrid = ({ taskId, stageName, procedureId }: Props) => {
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

  const addTaskProcedure = (taskId: number, stageName: PPPStage["name"]) => {
    addProcedure(
      taskId,
      stageName,
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
                addTaskProcedure(taskId, stageName);
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
