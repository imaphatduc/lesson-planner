import { useState } from "react";
import { DropSlot } from "~/features/dnd";
import ProcedureInputGrid from "./ProcedureInputGrid";
import type { PPPStage } from "~/contexts/usePPPProcedures";
import { Plus } from "lucide-react";

interface Props {
  stageName: PPPStage["name"];
  taskId: number;
  procedureId?: number;
}

const TaskProcedureDropSlot = ({ stageName, taskId, procedureId }: Props) => {
  const [addingProcedure, setAddingProcedure] = useState(false);

  return (
    <div className="col-span-2">
      <div className="p-2 self-start">
        <DropSlot
          id={`${taskId}-${stageName}-${procedureId}`}
          className="flex justify-center items-center w-full p-2 border-2 border-dashed border-neutral-600 hover:border-neutral-500 rounded-full cursor-pointer"
          data={{ taskId, stageName, procedureId }}
          onClick={() => setAddingProcedure((d: boolean) => !d)}
        >
          <Plus size={15} />
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
