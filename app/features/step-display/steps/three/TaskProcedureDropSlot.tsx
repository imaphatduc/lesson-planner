import { useState } from "react";
import { DropSlot } from "~/features/dnd";
import ProcedureInputGrid from "./ProcedureInputGrid";
import type { PPPStage } from "~/contexts/usePPPProcedures";

interface Props {
  stageName: PPPStage["name"];
  taskId: number;
  procedureId?: number;
}

const TaskProcedureDropSlot = ({ stageName, taskId, procedureId }: Props) => {
  const [addingProcedure, setAddingProcedure] = useState(!procedureId);

  return (
    <div className="col-span-2">
      <div className="p-2 self-start">
        <DropSlot
          id={`${taskId}-${stageName}-${procedureId}`}
          className="w-full border-2 border-dashed border-neutral-600 hover:border-neutral-500 text-center rounded-full cursor-pointer"
          data={{ taskId, stageName, procedureId }}
          onClick={() => setAddingProcedure((d: boolean) => !d)}
        >
          +
        </DropSlot>
      </div>
      {addingProcedure && (
        <ProcedureInputGrid
          taskId={taskId}
          stageName={stageName}
          procedureId={procedureId}
        />
      )}
    </div>
  );
};

export default TaskProcedureDropSlot;
