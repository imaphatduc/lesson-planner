import { X } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

const XButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="absolute -top-2 -right-2 p-0.5 bg-red-500 hover:bg-red-400 rounded-full text-white flex justify-center items-center w-4 h-4 text-xs cursor-pointer"
      {...props}
    >
      <X />
    </button>
  );
};

export default XButton;
