import type { InputHTMLAttributes, PropsWithChildren } from "react";

const FileUploader = ({
  children,
  ...props
}: PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>) => {
  return (
    <>
      <label
        htmlFor="file-upload"
        className="cursor-pointer p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
      >
        {children}
      </label>
      <input id="file-upload" type="file" {...props} />
    </>
  );
};

export default FileUploader;
