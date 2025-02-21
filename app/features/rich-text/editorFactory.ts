import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Setter = (_: string) => void;

export const getEditors = (
  info: {
    defaultValue?: string;
    setter: Setter;
  }[]
) => {
  const editorFactory = (setContent: Setter, defaultValue?: string) =>
    useEditor({
      extensions: [
        StarterKit,
        // Bold,
        // Italic,
        Underline,
      ],
      content: defaultValue,
      onUpdate: ({ editor }) => setContent(editor.getHTML()),
    });

  const editors = info.map((d) => editorFactory(d.setter, d.defaultValue));

  return editors;
};
