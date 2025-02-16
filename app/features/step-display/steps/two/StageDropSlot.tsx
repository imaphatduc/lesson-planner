import { use } from "react";
import { DragItem, DropSlot } from "~/features/dnd";
import { useGrammarProcedures } from "~/contexts/useGrammarProcedures";
import { LessonContext } from "~/contexts";
import { XButton } from "~/features/x-button";

interface Props {
  stageId: string;
}

const StageDropSlot = ({ stageId }: Props) => {
  const { getTasksByStage, removeTaskFromStage } = use(LessonContext);

  const { getStage } = useGrammarProcedures();

  return (
    <DropSlot
      className="border-2 border-dashed border-neutral-500 rounded-md p-1"
      id={stageId}
    >
      <div className="flex gap-3">
        {getTasksByStage(stageId)
          .sort((a, b) => a.id - b.id)
          .map((task) => (
            <DragItem
              key={`${stageId}-${task.id}`}
              id={`${stageId}-${task.id}`}
              disabled
              className="relative w-20 bg-neutral-500 rounded-sm text-center"
              buttonWhenDisabled={
                <XButton
                  onClick={() => removeTaskFromStage(stageId, task.id)}
                />
              }
            >
              {`${task.id + 1}`}
            </DragItem>
          ))}
        <p>{getStage(stageId).name}</p>
      </div>
    </DropSlot>
  );
};

export default StageDropSlot;
