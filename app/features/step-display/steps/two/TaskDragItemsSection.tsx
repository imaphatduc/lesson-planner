import { use } from "react";
import { LessonContext } from "~/contexts";
import type { PPPStageGroup } from "~/contexts/usePPPProcedures";
import { DragItem } from "~/features/dnd";

interface Props {
  groupName: PPPStageGroup["name"];
}

const TaskDragItemsSection = ({ groupName }: Props) => {
  const { getTasksByStageGroup } = use(LessonContext);

  return (
    <div className="flex gap-3">
      {getTasksByStageGroup(groupName).map((task) => (
        <DragItem
          key={task.id}
          id={task.id}
          className="relative w-20 bg-neutral-300 dark:bg-neutral-500 rounded-sm text-center"
        >
          {`${task.id + 1}`}
        </DragItem>
      ))}
    </div>
  );
};

export default TaskDragItemsSection;
