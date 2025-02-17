import { use } from "react";
import { DragItem, DropSlot } from "~/features/dnd";
import { usePPPProcedures, type PPPStage } from "~/contexts/usePPPProcedures";
import { LessonContext } from "~/contexts";
import { XButton } from "~/features/x-button";

interface Props {
  stage: PPPStage;
}

const StageDropSlot = ({ stage }: Props) => {
  const { getTasksByStage, removeTaskFromStage } = use(LessonContext);

  const { getStage } = usePPPProcedures();

  return (
    <DropSlot
      className="border-2 border-dashed border-neutral-500 rounded-md p-1"
      id={stage.name}
      data={stage}
    >
      <div className="flex gap-3">
        {getTasksByStage(stage.name)
          .sort((a, b) => a.id - b.id)
          .map((task) => (
            <DragItem
              key={`${stage.name}-${task.id}`}
              id={`${stage.name}-${task.id}`}
              disabled
              className="relative w-20 bg-neutral-300 dark:bg-neutral-500 rounded-sm text-center"
              buttonWhenDisabled={
                <XButton
                  onClick={() =>
                    removeTaskFromStage(getStage(stage.name), task.id)
                  }
                />
              }
            >
              {`${task.id + 1}`}
            </DragItem>
          ))}
        <p>{stage.name}</p>
      </div>
    </DropSlot>
  );
};

export default StageDropSlot;
