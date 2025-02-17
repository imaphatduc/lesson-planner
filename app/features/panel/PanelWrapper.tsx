import type { PropsWithChildren } from "react";
import { Panel } from "react-resizable-panels";

interface Props {
  type: "book" | "practice";
}

const PanelWrapper = ({ type, children }: PropsWithChildren<Props>) => {
  return (
    <Panel
      className={
        type === "book" ? "h-screen py-4 pl-4 pr-2" : "h-screen py-4 pr-4 pl-2"
      }
      defaultSize={type === "book" ? 40 : 60}
      minSize={30}
      autoFocus
    >
      <div className="bg-neutral-50 dark:bg-neutral-800 h-full overflow-auto rounded-md p-5">
        {children}
      </div>
    </Panel>
  );
};

export default PanelWrapper;
