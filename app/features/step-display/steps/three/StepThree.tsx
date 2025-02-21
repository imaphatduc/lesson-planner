import {
  LessonContext,
  lessonReference,
  usePPPProcedures,
  type LessonCode,
  type TaskProcedure,
} from "~/contexts";
import ColumnTitle from "./ColumnTitle";
import StageGroupSection from "./StageGroupSection";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  Fragment,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import type { PPPStage, PPPStageGroup } from "~/contexts/usePPPProcedures";
import { XButton } from "~/features/x-button";
import { useLocation } from "react-router";
import { getEditors } from "~/features/rich-text";
import ProcedureInput from "./ProcedureInput";

import { jsPDF } from "jspdf";
import "./fonts/EBGaramond";

const HEADING_MARGINB_PX = 5 * 5; // tailwind pb-5
const OBJECTIVES_MARGINB_PX = 5 * 3; // tailwind mb-3
const A4_PAGE_WIDTH_MM = 210; // A4 page height in mm
const A4_PAGE_HEIGHT_MM = 297; // A4 page height in mm
const MM_PER_PX = 0.264583; // Convert px to mm (1px ≈ 0.264583mm)
const MAX_PAGE_HEIGHT_PX = A4_PAGE_HEIGHT_MM / MM_PER_PX; // Max A4 page height in pixels
const PAGE_PADDING_PX = (2 * 10) / MM_PER_PX;

const Columns = () => {
  return (
    <>
      <colgroup>
        <col className="min-w-32 border-r" />
        <col className="w-1/2 border-r" />
        <col className="w-1/2" />
      </colgroup>
      <thead>
        <tr className="border-b">
          <th className="border-r">
            <ColumnTitle title="STAGES" />
          </th>
          <th className="border-r">
            <ColumnTitle title="TEACHER & STUDENTS' ACTIVITIES" />
          </th>
          <th>
            <ColumnTitle title="CONTENT" />
          </th>
        </tr>
      </thead>
    </>
  );
};

const EditedTable = ({ ref }: { ref?: RefObject<HTMLTableElement | null> }) => {
  const { pppStageGroups } = usePPPProcedures();

  const { preview, getTasksByStageGroup, targetLanguageItems, moveProcedure } =
    use(LessonContext);

  const _ = (groupName: PPPStageGroup["name"], targetLanguageItemId?: number) =>
    !preview ||
    (preview &&
      getTasksByStageGroup(groupName, targetLanguageItemId).length > 0);

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
          procedureId?: number;
        }
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <table ref={ref} className="border">
        <Columns />
        <tbody>
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
        </tbody>
      </table>
    </DndContext>
  );
};

const Heading = ({ ref }: { ref?: RefObject<HTMLDivElement | null> }) => {
  const { metadata } = use(LessonContext);

  return (
    <div ref={ref} className="w-full text-center pb-5">
      <h1 className="mb-6">LESSON PLAN</h1>
      <h2 className="mb-2 uppercase">
        <span className="underline">UNIT {metadata.unit}</span>:{" "}
        {metadata.unitName}
      </h2>
      <h3 className="italic">
        Part {metadata.code} – {lessonReference[metadata.code as LessonCode]}:{" "}
        {metadata.name}
      </h3>
      <p className="italic">(page {metadata.page})</p>
    </div>
  );
};

const Objectives = ({ ref }: { ref?: RefObject<HTMLDivElement | null> }) => {
  const {
    preview,
    metadata: {
      objectives: { knowledge, ability, behavior },
    },
    setObjectives,
  } = use(LessonContext);

  const info = [
    {
      defaultValue: knowledge,
      setter: (d: string) => setObjectives(d, "", ""),
    },
    {
      defaultValue: ability,
      setter: (d: string) => setObjectives("", d, ""),
    },
    {
      defaultValue: behavior,
      setter: (d: string) => setObjectives("", "", d),
    },
  ];

  const editors = getEditors(info);

  const labels = ["Knowledge", "Ability", "Behavior"];

  return (
    <div ref={ref} className="space-y-3 mb-3 ml-5">
      <div>
        <p className="font-bold">
          I. <span className="underline">OBJECTIVES</span>
        </p>
        <div className="ml-5">
          <p>By the end of this lesson, the students will be able to:</p>
          {editors.map(
            (editor, i) =>
              editor && (
                <div key={i} className="my-2">
                  <div className="mb-1 italic">
                    <span>{i + 1}.</span>{" "}
                    <span className="font-bold">{labels[i]}</span>
                  </div>
                  {!preview ? (
                    <ProcedureInput editor={editor} />
                  ) : (
                    <div
                      className="prose"
                      dangerouslySetInnerHTML={{
                        __html: info[i].defaultValue,
                      }}
                    />
                  )}
                </div>
              )
          )}
        </div>
      </div>
      <div>
        <p className="font-bold">
          II. <span className="underline">TEACHING PROCEDURES</span>
        </p>
      </div>
    </div>
  );
};

type CellsData = string[];

type RowsData = {
  className: string;
  height: number;
  cells: CellsData;
};

type PaginatedData = RowsData[];

const PreviewingTable = ({ page }: { page: PaginatedData }) => {
  return (
    <div className="border">
      <table border={1} width="100%">
        <Columns />
        <tbody>
          {page.map((row, rowIndex) => (
            <tr key={rowIndex} className={row.className}>
              {row.cells.map((cell, colIndex) => (
                <td
                  className="align-top p-2"
                  key={colIndex}
                  dangerouslySetInnerHTML={{
                    __html: cell,
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PreviewingForExport = () => {
  const { preview, togglePreview, getLabel } = use(LessonContext);

  const pdfRef = useRef<HTMLDivElement>(null);

  const headingRef = useRef<HTMLDivElement>(null);

  const objectivesRef = useRef<HTMLDivElement>(null);

  const previewingTableRef = useRef<HTMLTableElement>(null);

  const getTableData = () => {
    if (!previewingTableRef.current) return [];

    const rows = Array.from(
      previewingTableRef.current.getElementsByTagName("tr")
    ).slice(1);

    let rowspanTracker = 0;

    const data: RowsData[] = rows.map((row) => {
      const cells = Array.from(row.getElementsByTagName("td"));

      let rowData = new Array<string>(3).fill("");

      rowData[0] = rowspanTracker > 0 ? "" : cells.shift()?.innerHTML || "";
      rowspanTracker = Math.max(0, rowspanTracker - 1);
      const cellsInRow = row.getElementsByTagName("td");
      if (cellsInRow.length === 3) {
        const firstCell = row.getElementsByTagName("td")[0];
        rowspanTracker =
          parseInt(firstCell.getAttribute("rowspan") || "1", 10) - 1;
      }

      cells.forEach((cell, index) => {
        rowData[index + 1] = cell.innerHTML;
      });

      return {
        className: row.className,
        height: row.getBoundingClientRect().height,
        cells: rowData,
      };
    });

    return data.filter((d) => !d.cells.every((cell) => cell === ""));
  };

  const paginateByHeight = (data: RowsData[], pageHeight: number) => {
    const theadElement = previewingTableRef.current?.querySelector("thead");

    if (headingRef.current && objectivesRef.current && theadElement) {
      let pages: PaginatedData[] = [];
      let currentPage: PaginatedData = [];
      let currentHeight =
        headingRef.current.clientHeight +
        objectivesRef.current.clientHeight +
        theadElement.clientHeight;

      data.forEach((row) => {
        if (currentHeight + row.height > pageHeight && currentPage.length > 0) {
          pages.push(currentPage);
          currentPage = [];
          currentHeight = theadElement.clientHeight;
        }
        currentPage.push(row);
        currentHeight += row.height;
      });

      if (currentPage.length > 0) pages.push(currentPage);

      return pages;
    }

    return [];
  };

  const dataRef = useRef<RowsData[]>([]);
  const [data, setData] = useState<RowsData[]>([]);

  useEffect(() => {
    if (!dataRef.current.length) {
      // Fetch only once
      dataRef.current = getTableData();
      setData(dataRef.current);
    }
  }, [preview]);

  const paginatedData = useMemo(
    () =>
      paginateByHeight(
        dataRef.current,
        MAX_PAGE_HEIGHT_PX -
          PAGE_PADDING_PX -
          HEADING_MARGINB_PX -
          OBJECTIVES_MARGINB_PX
      ),
    [data, MAX_PAGE_HEIGHT_PX]
  );

  const [exporting, setExporting] = useState(false);

  const handleExportPDF = async () => {
    setExporting(true);
    if (pdfRef.current) {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      doc.setFont("EBGaramond", "normal");
      doc.setFont("EBGaramond", "bold");
      doc.setFont("EBGaramond", "italic");
      doc.setFont("EBGaramond", "bolditalic");

      doc.html(pdfRef.current!, {
        callback: async (pdf) => {
          await pdf.save(`${getLabel()}.pdf`, { returnPromise: true });
          setExporting(false);
        },
        width: A4_PAGE_WIDTH_MM,
        windowWidth: A4_PAGE_WIDTH_MM / MM_PER_PX,
      });
    }
  };

  return (
    <div className="fixed top-4 left-4 bottom-4 right-4 z-20 rounded-md bg-neutral-200 overflow-auto flex flex-col items-center">
      <XButton
        onClick={() => togglePreview()}
        style={{
          position: "fixed",
          zIndex: 50,
          top: 45,
          right: 60,
          width: 20,
          height: 20,
        }}
      />
      <div className="sticky top-0 z-30 w-full bg-neutral-200 flex justify-center items-center">
        <button
          disabled={exporting}
          className="my-5 p-2 text-white bg-teal-700 rounded-sm hover:bg-teal-800 cursor-pointer transition"
          onClick={handleExportPDF}
        >
          Export PDF
        </button>
      </div>
      <div ref={pdfRef} className="font-[EBGaramond-Regular] text-lg">
        <div className="a4-print">
          <Heading ref={headingRef} />
          <Objectives ref={objectivesRef} />
          {paginatedData.length > 0 && (
            <PreviewingTable page={paginatedData[0]} />
          )}
        </div>
        {!exporting && <div className="page-separator mb-5"></div>}
        {paginatedData.length > 1 &&
          paginatedData.slice(1).map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              <div className="a4-print">
                <PreviewingTable page={page} />
              </div>
              {!exporting && <div className="page-separator mb-5"></div>}
            </Fragment>
          ))}
      </div>
      <div className="mb-5">End of preview</div>
      {data.length === 0 && (
        <div className="a4-print opacity-0">
          <EditedTable ref={previewingTableRef} />
        </div>
      )}
    </div>
  );
};

const StepThree = () => {
  const { preview } = use(LessonContext);

  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && preview && <PreviewingForExport />}

      <div>
        <Heading />
        <Objectives />
        <EditedTable />
      </div>
    </>
  );
};

export default StepThree;
