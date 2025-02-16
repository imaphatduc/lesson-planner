import {
  LessonContext,
  useGrammarProcedures,
  type TaskProcedure,
} from "~/contexts";
import ColumnTitle from "./ColumnTitle";
import StageGroupSection from "./StageGroupSection";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Fragment, use } from "react";

const StepThree = () => {
  const { preview, targetLanguageItems, getTasksByStageGroup, moveProcedure } =
    use(LessonContext);

  const { grammarStageGroups } = useGrammarProcedures();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.data.current && over?.data.current) {
      moveProcedure(
        active.data.current as {
          stageId: string;
          taskId: number;
          procedure: TaskProcedure;
        },
        over.data.current as {
          stageId: string;
          taskId: number;
          procedureId: number;
        }
      );
    }
  };

  const _ = (groupId: string, targetLanguageItemId?: number) =>
    !preview ||
    (preview && getTasksByStageGroup(groupId, targetLanguageItemId).length > 0);

  return (
    <div className="border-l border-t grid grid-cols-[1fr_2fr_2fr] divide-x">
      <ColumnTitle title="STAGES" />
      <ColumnTitle title="TEACHER & STUDENTS' ACTIVITIES" />
      <ColumnTitle title="CONTENT" />
      <DndContext onDragEnd={handleDragEnd}>
        {_("0") && (
          <StageGroupSection
            group={grammarStageGroups.find((group) => group.id === "0")!}
          />
        )}
        {targetLanguageItems.map((targetLanguageItem) => (
          <Fragment key={targetLanguageItem.id}>
            {grammarStageGroups
              .filter((group) => group.id !== "0" && group.id !== "4")
              .map((group) =>
                _(group.id, targetLanguageItem.id) ? (
                  <StageGroupSection
                    key={group.id}
                    group={group}
                    targetLanguageItem={targetLanguageItem}
                  />
                ) : (
                  <></>
                )
              )}
          </Fragment>
        ))}
        {_("4") && (
          <StageGroupSection
            group={grammarStageGroups.find((group) => group.id === "4")!}
          />
        )}
      </DndContext>
      <div></div>
    </div>
  );
};

export default StepThree;
