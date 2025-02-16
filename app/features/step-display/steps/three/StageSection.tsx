import TaskProcedureGrid from "./TaskProcedureGrid";
import { LessonContext } from "~/contexts";
import { Input, TextArea } from "~/features/input";
import { Fragment, use, useState } from "react";
import type { GrammarStage } from "~/contexts/useGrammarProcedures";
import TaskProcedureDropSlot from "./TaskProcedureDropSlot";
import type { TaskInStage } from "~/contexts/Task.type";

interface Props {
  stage: GrammarStage;
  color: string;
  tasks: TaskInStage[];
  firstTaskInDuplicateSequence: { id: number; stageId: string }[];
}

const StageSection = ({
  stage,
  color,
  tasks,
  firstTaskInDuplicateSequence,
}: Props) => {
  const { preview, editTaskStageTiming, editTaskInstructions } =
    use(LessonContext);

  const [editingTaskInstructions, setEditingTaskInstructions] = useState(false);

  const totalProceduresNum = tasks.reduce(
    (_, t) => _ + (t.stage?.procedures.length ?? 0),
    0
  );

  const isTaskDisplayed = (task: TaskInStage) =>
    firstTaskInDuplicateSequence.find(
      (d) => d.id === task.id && task.stage && d.stageId === task.stage.id
    );

  return (
    <>
      {tasks.map((task) => (
        <Fragment key={task.id}>
          <div
            className=" px-2 h-full space-y-2"
            style={{
              gridRow: `span ${
                2 * totalProceduresNum + (isTaskDisplayed(task) ? 2 : 1)
              } / span ${
                2 * totalProceduresNum + (isTaskDisplayed(task) ? 2 : 1)
              }`,
            }}
          >
            {!preview && (
              <div className="h-full flex flex-col items-end text-right">
                <p className={color}>{stage.name}</p>
                <div className="flex items-center gap-1">
                  <p>(</p>
                  <Input
                    type="number"
                    defaultValue={task.stage?.timing ?? 0}
                    onChange={(e) =>
                      editTaskStageTiming(
                        task.id,
                        stage.id,
                        parseInt(e.target.value)
                      )
                    }
                    style={{
                      textAlign: "right",
                      width: "2rem",
                    }}
                  />
                  <p> minutes)</p>
                </div>
              </div>
            )}
          </div>

          {isTaskDisplayed(task) ? (
            <>
              <div></div>
              <div
                className={
                  task.instructions && !editingTaskInstructions && !preview
                    ? "p-2 font-bold hover:bg-gray-700 cursor-pointer"
                    : "p-2 font-bold"
                }
                onClick={
                  !editingTaskInstructions && !preview
                    ? () => setEditingTaskInstructions(true)
                    : () => {}
                }
              >
                TASK {task.id + 1}
                {editingTaskInstructions && (
                  <div className="mt-2">
                    <TextArea
                      defaultValue={task.instructions}
                      onChange={(e) =>
                        editTaskInstructions(task.id, e.target.value)
                      }
                    />
                    <button
                      className="px-3 py-1 rounded-b-sm bg-green-700 hover:bg-green-800 transition cursor-pointer"
                      onClick={() => setEditingTaskInstructions(false)}
                    >
                      Done
                    </button>
                  </div>
                )}
                {!editingTaskInstructions &&
                  !preview &&
                  (task.instructions ? (
                    `: ${task.instructions}`
                  ) : (
                    <button
                      className="mx-2 font-normal bg-neutral-600 hover:bg-neutral-700 p-1 rounded-sm cursor-pointer"
                      onClick={() => setEditingTaskInstructions(true)}
                    >
                      Add instructions
                    </button>
                  ))}
                <p className="font-normal">
                  ({task.stages.reduce((acc, d) => acc + d.timing, 0)} minutes)
                </p>
              </div>
            </>
          ) : (
            <></>
          )}

          {task.stage?.procedures.map((procedure) => (
            <TaskProcedureGrid
              key={procedure.id}
              taskId={task.id}
              stageId={stage.id}
              procedure={procedure}
            />
          ))}
          {!preview ? (
            <TaskProcedureDropSlot stageId={stage.id} taskId={task.id} />
          ) : (
            <div className="col-span-2"></div>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default StageSection;
