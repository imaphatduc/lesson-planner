import type { TextareaHTMLAttributes } from "react";

const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...props}
      className="w-full p-1 bg-neutral-200 dark:bg-neutral-600 rounded-t-md field-sizing-content"
    />
  );
};

export default TextArea;
