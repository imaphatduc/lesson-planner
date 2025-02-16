import { useState } from "react";
import { DropSlot } from "~/features/dnd";
import ProcedureInputGrid from "./ProcedureInputGrid";

interface Props {
  stageId: string;
  taskId: number;
  procedureId?: number;
}

const TaskProcedureDropSlot = ({ stageId, taskId, procedureId }: Props) => {
  const [addingProcedure, setAddingProcedure] = useState(!procedureId);

  return (
    <div className="col-span-2">
      <div className="p-2 self-start">
        <DropSlot
          id={`${taskId}-${stageId}-${procedureId}`}
          className="w-full border-2 border-dashed border-neutral-600 hover:border-neutral-500 text-center rounded-full cursor-pointer"
          data={{ taskId, stageId, procedureId }}
          onClick={() => setAddingProcedure((d: boolean) => !d)}
        >
          +
        </DropSlot>
      </div>
      {addingProcedure && (
        <ProcedureInputGrid
          taskId={taskId}
          stageId={stageId}
          procedureId={procedureId}
        />
      )}
    </div>
  );
};

export default TaskProcedureDropSlot;
