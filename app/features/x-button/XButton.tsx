import type { ButtonHTMLAttributes } from "react";

const XButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white flex justify-center items-center w-4 h-4 text-xs cursor-pointer"
      {...props}
    >
      x
    </button>
  );
};

export default XButton;
