import type { ReactNode } from "react";

interface Props {
  Left: ReactNode;
  Right: ReactNode;
}

const NestedGridLayout = ({ Left, Right }: Props) => {
  return (
    <>
      <td className="p-2 align-top">{Left}</td>
      <td className="p-2 align-top">{Right}</td>
    </>
  );
};

export default NestedGridLayout;
