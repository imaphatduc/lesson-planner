import type { ReactNode } from "react";

interface Props {
  Left: ReactNode;
  Right: ReactNode;
}

const NestedGridLayout = ({ Left, Right }: Props) => {
  return (
    <div className="grid grid-cols-2 col-span-2">
      <div className="p-2">{Left}</div>
      <div className="p-2 border-l">{Right}</div>
    </div>
  );
};

export default NestedGridLayout;
