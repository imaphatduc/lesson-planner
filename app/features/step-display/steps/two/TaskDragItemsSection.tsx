import { use } from "react";
import { LessonContext } from "~/contexts";
import { DragItem } from "~/features/dnd";

interface Props {
  groupId: string;
}

const TaskDragItemsSection = ({ groupId }: Props) => {
  const { getTasksByStageGroup } = use(LessonContext);

  return (
    <div className="flex gap-3">
      {getTasksByStageGroup(groupId).map((task) => (
        <DragItem
          key={task.id}
          id={task.id}
          className="relative w-20 bg-neutral-500 rounded-sm text-center"
        >
          {`${task.id + 1}`}
        </DragItem>
      ))}
    </div>
  );
};

export default TaskDragItemsSection;
