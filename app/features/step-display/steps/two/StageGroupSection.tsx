import {
  usePPPProcedures,
  type PPPStageGroup,
} from "~/contexts/usePPPProcedures";
import StageDropSlot from "./StageDropSlot";
import TaskDragItemsSection from "./TaskDragItemsSection";

interface Props {
  group: PPPStageGroup;
}

const StageGroupSection = ({ group }: Props) => {
  const { getStagesInGroup } = usePPPProcedures();

  return (
    <div className="space-y-2">
      <h3 className={group.color}>{group.name}</h3>
      <TaskDragItemsSection groupName={group.name} />
      {getStagesInGroup(group.name).map((stage) => (
        <StageDropSlot key={stage.name} stage={stage} />
      ))}
    </div>
  );
};

export default StageGroupSection;
