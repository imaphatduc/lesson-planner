import type { InputHTMLAttributes, PropsWithChildren } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputId: string;
}

const FileUploader = ({
  inputId,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <>
      <label
        htmlFor={inputId}
        className="cursor-pointer p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
      >
        {children}
      </label>
      <input id={inputId} type="file" {...props} />
    </>
  );
};

export default FileUploader;
