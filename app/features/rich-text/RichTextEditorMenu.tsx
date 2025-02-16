import { Editor } from "@tiptap/react";
import "@tiptap/extension-underline";

interface Props {
  editor: Editor;
}

const RichTextEditorMenu = ({ editor }: Props) => {
  const buttonClassName = (b: boolean) =>
    b
      ? "text-sm p-2 w-8 h-8 rounded transition cursor-pointer hover:bg-neutral-600 bg-teal-800 text-white"
      : "text-sm p-2 w-8 h-8 rounded transition cursor-pointer hover:bg-neutral-600 bg-neutral-500";

  return (
    <div className="toolbar mb-4 flex gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClassName(editor.isActive("bold"))}
        style={{
          fontWeight: "bold",
        }}
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClassName(editor.isActive("italic"))}
        style={{
          fontStyle: "italic",
        }}
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonClassName(editor.isActive("underline"))}
        style={{
          textDecoration: "underline",
        }}
      >
        U
      </button>
    </div>
  );
};

export default RichTextEditorMenu;
