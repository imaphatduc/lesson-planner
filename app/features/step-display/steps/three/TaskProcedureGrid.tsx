import NestedGridLayout from "./NestedGridLayout";
import { use, useState } from "react";
import EditingProcedureInputGrid from "./EditingProcedureInputGrid";
import { LessonContext, type TaskProcedure } from "~/contexts";
import { XButton } from "~/features/x-button";
import TaskProcedureDropSlot from "./TaskProcedureDropSlot";
import { DragItem } from "~/features/dnd";
import type { PPPStage } from "~/contexts/usePPPProcedures";

interface Props {
  taskId: number;
  stageName: PPPStage["name"];
  procedure: TaskProcedure;
}

const TaskProcedureGrid = ({ taskId, stageName, procedure }: Props) => {
  const { preview, removeProcedure } = use(LessonContext);

  const [editing, setEditing] = useState(false);

  const [hovering, setHovering] = useState(false);

  const Column = ({ text }: { text: string }) => {
    return (
      <p
        className="prose"
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      ></p>
    );
  };

  return !editing ? (
    <>
      <>
        {!preview ? (
          <TaskProcedureDropSlot
            taskId={taskId}
            stageName={stageName}
            procedureId={procedure.id}
          />
        ) : (
          <></>
        )}
      </>
      <DragItem
        as="tr"
        disabled={preview}
        id={`${stageName}-${taskId}-${procedure.id}`}
        data={{ stageName, taskId, procedure }}
        className={
          hovering && !preview
            ? " relative cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
            : " relative"
        }
        onClickCapture={() => setEditing(true)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <NestedGridLayout
          Left={<Column text={procedure.activities} />}
          Right={<Column text={procedure.content} />}
        />
        {hovering && !preview && (
          <XButton
            onClickCapture={() =>
              removeProcedure(taskId, stageName, procedure.id)
            }
          />
        )}
      </DragItem>
    </>
  ) : (
    <tr>
      <EditingProcedureInputGrid
        taskId={taskId}
        stageName={stageName}
        procedure={procedure}
        setEditing={setEditing}
      />
    </tr>
  );
};

export default TaskProcedureGrid;
