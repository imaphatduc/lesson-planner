import NestedGridLayout from "./NestedGridLayout";
import { use, useState } from "react";
import EditingProcedureInputGrid from "./EditingProcedureInputGrid";
import { LessonContext, type TaskProcedure } from "~/contexts";
import { XButton } from "~/features/x-button";
import TaskProcedureDropSlot from "./TaskProcedureDropSlot";
import { DragItem } from "~/features/dnd";

interface Props {
  taskId: number;
  stageId: string;
  procedure: TaskProcedure;
}

const TaskProcedureGrid = ({ taskId, stageId, procedure }: Props) => {
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
      {!preview ? (
        <TaskProcedureDropSlot
          taskId={taskId}
          stageId={stageId}
          procedureId={procedure.id}
        />
      ) : (
        <div className="col-span-2"></div>
      )}
      <DragItem
        disabled={preview}
        id={`${stageId}-${taskId}-${procedure.id}`}
        data={{ stageId, taskId, procedure }}
        className={
          hovering && !preview
            ? " col-span-2 relative cursor-pointer hover:bg-gray-700"
            : " col-span-2 relative"
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
              removeProcedure(taskId, stageId, procedure.id)
            }
          />
        )}
      </DragItem>
    </>
  ) : (
    <>
      <div></div>
      <EditingProcedureInputGrid
        taskId={taskId}
        stageId={stageId}
        procedure={procedure}
        setEditing={setEditing}
      />
    </>
  );
};

export default TaskProcedureGrid;
