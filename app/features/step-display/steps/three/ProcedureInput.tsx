import type { PropsWithChildren } from "react";
import { RichTextEditor } from "~/features/rich-text";
import { Editor } from "@tiptap/react";

interface Props {
  editor: Editor;
}

const ProcedureInput = ({ editor, children }: PropsWithChildren<Props>) => {
  return (
    <div>
      <RichTextEditor
        editor={editor}
        className="break-words p-2 field-sizing-content w-full h-full bg-neutral-700 rounded-t-sm"
      />
      {children}
    </div>
  );
};

export default ProcedureInput;
