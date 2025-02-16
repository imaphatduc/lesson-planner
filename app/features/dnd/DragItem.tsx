import { useDraggable } from "@dnd-kit/core";
import type { PropsWithChildren, ReactNode, HTMLAttributes } from "react";

type Props = Omit<HTMLAttributes<HTMLDivElement>, "id"> & {
  id: number | string;
  disabled?: boolean;
  buttonWhenDisabled?: ReactNode;
  data?: any;
};

const DragItem = ({
  id,
  disabled,
  buttonWhenDisabled,
  children,
  data,
  ...props
}: PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: 0.5,
        cursor: "pointer",
      }
    : {
        cursor: !disabled ? "pointer" : "default",
      };

  return !disabled ? (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      {...props}
      style={style}
    >
      {children}
    </div>
  ) : (
    <div {...props}>
      {children}
      {buttonWhenDisabled}
    </div>
  );
};

export default DragItem;
