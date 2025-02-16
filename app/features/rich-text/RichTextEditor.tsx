import { Editor, EditorContent } from "@tiptap/react";
import RichTextEditorMenu from "./RichTextEditorMenu";

interface Props {
  editor: Editor;
  defaultValue?: string;
  className: string;
}

const RichTextEditor = ({ editor, className }: Props) => {
  return (
    editor && (
      <div className={className}>
        <RichTextEditorMenu editor={editor} />

        <EditorContent editor={editor} className="prose" />
      </div>
    )
  );
};

export default RichTextEditor;
