import { useDroppable } from "@dnd-kit/core";
import type { HTMLAttributes, PropsWithChildren } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  id: number | string;
  data?: any;
};

const DropSlot = ({
  id,
  data,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data,
  });

  return (
    <div
      {...props}
      ref={setNodeRef}
      style={{
        opacity: isOver ? 0.5 : 1,
        animation: isOver ? "dash-blink 1.5s linear infinite" : "",
      }}
    >
      {children}
    </div>
  );
};

export default DropSlot;
