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
    <>
      {!procedureId && <tr className="mt-4"></tr>}
      <tr>
        <td colSpan={2} className="p-2">
          <DropSlot
            id={`${taskId}-${stageName}-${procedureId}`}
            className="flex justify-center items-center w-full p-2 border-2 border-dashed border-neutral-600 hover:border-neutral-500 rounded-full cursor-pointer"
            data={{ taskId, stageName, procedureId }}
            onClick={() => setAddingProcedure((d: boolean) => !d)}
          >
            <Plus size={15} />
          </DropSlot>
        </td>
      </tr>
      <tr>
        {addingProcedure && (
          <ProcedureInputGrid
            taskId={taskId}
            stageName={stageName}
            procedureId={procedureId}
          />
        )}
      </tr>
      {!procedureId && <tr className="mb-16"></tr>}
    </>
  );
};

export default TaskProcedureDropSlot;
