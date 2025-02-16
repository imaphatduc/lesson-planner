import type { GrammarStageGroup } from "~/contexts/useGrammarProcedures";
import StageDropSlot from "./StageDropSlot";
import TaskDragItemsSection from "./TaskDragItemsSection";

interface Props {
  group: GrammarStageGroup;
}

const StageGroupSection = ({ group }: Props) => {
  return (
    <div className="space-y-2">
      <h3 className={group.color}>{group.name}</h3>
      <TaskDragItemsSection groupId={group.id} />
      {group.stages.map((stageId) => (
        <StageDropSlot key={stageId} stageId={stageId} />
      ))}
    </div>
  );
};

export default StageGroupSection;
