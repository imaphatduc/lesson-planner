import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const AddProcedureButtonGrid = ({ ...props }: Props) => {
  return (
    <>
      <div className=""></div>
      <button
        className="bg-teal-700 hover:bg-teal-800 transition w-full rounded-b-sm cursor-pointer"
        {...props}
      >
        +
      </button>
    </>
  );
};

export default AddProcedureButtonGrid;
