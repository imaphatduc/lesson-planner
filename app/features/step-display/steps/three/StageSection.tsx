import TaskProcedureGrid from "./TaskProcedureGrid";
import { LessonContext } from "~/contexts";
import { Input, TextArea } from "~/features/input";
import { Fragment, use, useState } from "react";
import type { PPPStage } from "~/contexts/usePPPProcedures";
import TaskProcedureDropSlot from "./TaskProcedureDropSlot";
import type { TaskInStage } from "~/contexts/Task.type";

interface Props {
  stage: PPPStage;
  color: string;
  tasks: TaskInStage[];
  firstTaskInDuplicateSequence: { id: number; stageName: PPPStage["name"] }[];
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
      (d) => d.id === task.id && task.stage && d.stageName === task.stage.name
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
              <div className="h-full flex flex-col items-end text-right pt-4 pb-10">
                <p className={color}>{stage.name}</p>
                <div className="flex items-center gap-1">
                  <p>(</p>
                  <Input
                    type="number"
                    defaultValue={task.stage?.timing ?? 0}
                    onChange={(e) =>
                      editTaskStageTiming(
                        task.id,
                        stage.name,
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
                    ? "px-2 pt-4 pb-16 font-bold hover:bg-gray-700 cursor-pointer"
                    : "px-2 py-2 font-bold"
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
                      className="font-normal text-white px-3 py-1 rounded-b-sm bg-green-700 hover:bg-green-800 transition cursor-pointer"
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
                      className="mx-2 font-normal transition bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-700 p-1 rounded-sm cursor-pointer"
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
              stageName={stage.name}
              procedure={procedure}
            />
          ))}
          {!preview ? (
            <div className="pt-4 pb-16 col-span-2">
              <TaskProcedureDropSlot stageName={stage.name} taskId={task.id} />
            </div>
          ) : (
            <div className="col-span-2"></div>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default StageSection;
