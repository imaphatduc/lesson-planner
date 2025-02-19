import { useDraggable } from "@dnd-kit/core";
import {
  type JSX,
  type PropsWithChildren,
  type ReactNode,
  type HTMLAttributes,
  createElement,
} from "react";

type Props = Omit<HTMLAttributes<HTMLDivElement>, "id"> & {
  as?: keyof JSX.IntrinsicElements;
  id: number | string;
  disabled?: boolean;
  buttonWhenDisabled?: ReactNode;
  data?: any;
};

const DragItem = ({
  as = "div",
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

  return !disabled
    ? createElement(
        as,
        { ref: setNodeRef, ...attributes, ...listeners, ...props, style },
        children
      )
    : createElement(
        as,
        props,
        <>
          {children}
          {buttonWhenDisabled}
        </>
      );
};

export default DragItem;
