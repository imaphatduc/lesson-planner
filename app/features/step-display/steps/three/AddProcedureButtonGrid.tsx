import { Plus } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const AddProcedureButtonGrid = ({ ...props }: Props) => {
  return (
    <>
      <div className=""></div>
      <button
        className="flex justify-center items-center p-1 text-white bg-teal-700 hover:bg-teal-800 transition w-full rounded-b-sm cursor-pointer"
        {...props}
      >
        <Plus size={15} />
      </button>
    </>
  );
};

export default AddProcedureButtonGrid;
