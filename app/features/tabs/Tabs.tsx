import { motion } from "motion/react";
import type { PropsWithChildren } from "react";

interface Props {
  tabs: {
    id: number;
    name: string;
  }[];
  activeId: number;
  setActiveId: (d: number) => void;
  addTab?: () => void;
  removeTab?: (id: number) => void;
}

const Tabs = ({
  tabs,
  activeId,
  setActiveId,
  addTab,
  removeTab,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <>
      <div className="flex items-center space-x-2 dark:bg-neutral-800 rounded-lg -skew-x-16 border-b p-1 mb-5">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            className={`flex items-center space-x-2 px-4 py-1 rounded-lg cursor-pointer transition-all duration-300 shadow-sm border ${
              tab.id === activeId
                ? "bg-neutral-300 dark:bg-neutral-500 border-transparent"
                : "bg-neutral-200 dark:bg-neutral-700 border-transparent hover:bg-neutral-400 dark:hover:bg-neutral-600"
            }`}
            onClick={() => setActiveId(tab.id)}
            layout
          >
            <span className="skew-x-16">{tab.name}</span>
            {tabs.length > 1 && addTab && removeTab && (
              <div
                className="skew-x-16 w-4 h-4 text-xs hover:bg-neutral-500 hover:text-white dark:hover:bg-neutral-700 rounded-full flex justify-center items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
              >
                x
              </div>
            )}
          </motion.div>
        ))}
        {addTab && (
          <button
            className="skew-x-16 p-2 w-5 h-5 flex justify-center items-center rounded-full text-white bg-neutral-500 hover:bg-neutral-600"
            onClick={addTab}
          >
            +
          </button>
        )}
      </div>
      {children}
    </>
  );
};

export default Tabs;
