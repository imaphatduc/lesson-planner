import type { PropsWithChildren } from "react";
import type { Task } from "~/lessons";

interface Props {
  task: Task;
}

const TaskLayout = ({ task, children }: PropsWithChildren<Props>) => {
  return (
    <div>
      <div className="grid grid-cols-[20px_1fr]">
        <p className="text-purple-400 font-bold">{task.id}</p>
        <div>
          <p className="text-green-400 font-bold uppercase">{task.field}</p>
          <div className="font-bold">{task.instructions}</div>
          <div className="my-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskLayout;
