import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { usePPPProcedures, type PPPStage } from "~/contexts/usePPPProcedures";
import { use } from "react";
import StageGroupSection from "./StageGroupSection";
import { LessonContext } from "~/contexts";
import { Tabs } from "~/features/tabs";

const StepTwo = () => {
  const { pppStageGroups } = usePPPProcedures();

  const {
    targetLanguageItems,
    getCurrentTargetLanguageItem,
    setCurrentTargetLanguageItem,
    setStageForTask,
  } = use(LessonContext);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    const activeId = active.id;
    const overData = over?.data as PPPStage | undefined;

    if (overData && typeof activeId === "number") {
      setStageForTask(overData, activeId);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="space-y-5">
        <StageGroupSection
          group={pppStageGroups.find((d) => d.name === "Lead-in")!}
        />
        <div className="border border-neutral-600 pb-5 shadow-2xl p-3 rounded-2xl">
          <Tabs
            tabs={targetLanguageItems}
            activeId={getCurrentTargetLanguageItem().id}
            setActiveId={setCurrentTargetLanguageItem}
          >
            {targetLanguageItems.map((targetLanguageItem) => (
              <div key={targetLanguageItem.id} className="space-y-5">
                {targetLanguageItem.id === getCurrentTargetLanguageItem().id &&
                  pppStageGroups
                    .filter(
                      (d) => d.name !== "Lead-in" && d.name !== "Production"
                    )
                    .map((group) => (
                      <StageGroupSection key={group.name} group={group} />
                    ))}
              </div>
            ))}
          </Tabs>
        </div>
        <StageGroupSection
          group={pppStageGroups.find((d) => d.name === "Production")!}
        />
      </div>
    </DndContext>
  );
};

export default StepTwo;
