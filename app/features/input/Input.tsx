import type { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="w-full p-1 bg-neutral-600 rounded-md no-spinner"
    />
  );
};

export default Input;
