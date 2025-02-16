import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useGrammarProcedures } from "~/contexts/useGrammarProcedures";
import { use } from "react";
import StageGroupSection from "./StageGroupSection";
import { LessonContext } from "~/contexts";
import { Tabs } from "~/features/tabs";

const StepTwo = () => {
  const { grammarStageGroups } = useGrammarProcedures();

  const {
    targetLanguageItems,
    getCurrentTargetLanguageItem,
    setCurrentTargetLanguageItem,
    setStage,
  } = use(LessonContext);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    const activeId = active.id;
    const overId = over?.id;

    if (typeof overId === "string" && typeof activeId === "number") {
      setStage(overId, activeId);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="space-y-5">
        <StageGroupSection
          group={grammarStageGroups.find((d) => d.id === "0")!}
        />
        <div className="border border-neutral-600 pb-5 shadow-2xl p-3 rounded-2xl">
          <Tabs
            tabs={targetLanguageItems}
            activeId={getCurrentTargetLanguageItem().id}
            setActiveId={setCurrentTargetLanguageItem}
          >
            {targetLanguageItems.map((targetLanguageItem) => (
              <div className="space-y-5">
                {targetLanguageItem.id === getCurrentTargetLanguageItem().id &&
                  grammarStageGroups
                    .filter((d) => d.id !== "0" && d.id !== "4")
                    .map((group) => (
                      <StageGroupSection key={group.id} group={group} />
                    ))}
              </div>
            ))}
          </Tabs>
        </div>
        <StageGroupSection
          group={grammarStageGroups.find((d) => d.id === "4")!}
        />
      </div>
    </DndContext>
  );
};

export default StepTwo;
