import {
  LessonContext,
  usePPPProcedures,
  type TaskProcedure,
} from "~/contexts";
import ColumnTitle from "./ColumnTitle";
import StageGroupSection from "./StageGroupSection";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Fragment, use, useRef } from "react";
import type { PPPStage, PPPStageGroup } from "~/contexts/usePPPProcedures";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";
import { MyLessonsContext } from "~/contexts/MyLessonsContext";

const StepThree = () => {
  const { setDarkMode } = use(MyLessonsContext);

  const { preview, targetLanguageItems, getTasksByStageGroup, moveProcedure } =
    use(LessonContext);

  const { pppStageGroups } = usePPPProcedures();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.data.current && over?.data.current) {
      moveProcedure(
        active.data.current as {
          stageName: PPPStage["name"];
          taskId: number;
          procedure: TaskProcedure;
        },
        over.data.current as {
          stageName: PPPStage["name"];
          taskId: number;
          procedureId: number;
        }
      );
    }
  };

  const _ = (groupName: PPPStageGroup["name"], targetLanguageItemId?: number) =>
    !preview ||
    (preview &&
      getTasksByStageGroup(groupName, targetLanguageItemId).length > 0);

  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    setDarkMode(false);
    const element = pdfRef.current!;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("document.pdf");
  };

  return (
    <>
      <button
        className="p-2 text-white bg-teal-700 rounded-sm hover:bg-teal-800 cursor-pointer transition mb-2"
        onClick={handleDownload}
      >
        Export PDF
      </button>
      <div
        ref={pdfRef}
        className="border-l border-t grid grid-cols-[1fr_2fr_2fr] divide-x"
      >
        <ColumnTitle title="STAGES" />
        <ColumnTitle title="TEACHER & STUDENTS' ACTIVITIES" />
        <ColumnTitle title="CONTENT" />
        <DndContext onDragEnd={handleDragEnd}>
          {_("Lead-in") && (
            <StageGroupSection
              group={pppStageGroups.find((group) => group.name === "Lead-in")!}
            />
          )}
          {targetLanguageItems.map((targetLanguageItem) => (
            <Fragment key={targetLanguageItem.id}>
              {pppStageGroups
                .filter(
                  (group) =>
                    group.name !== "Lead-in" && group.name !== "Production"
                )
                .map((group) =>
                  _(group.name, targetLanguageItem.id) ? (
                    <StageGroupSection
                      key={group.name}
                      group={group}
                      targetLanguageItem={targetLanguageItem}
                    />
                  ) : (
                    <></>
                  )
                )}
            </Fragment>
          ))}
          {_("Production") && (
            <StageGroupSection
              group={
                pppStageGroups.find((group) => group.name === "Production")!
              }
            />
          )}
        </DndContext>
        <div></div>
      </div>
    </>
  );
};

export default StepThree;
