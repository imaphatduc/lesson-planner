import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Setter = (_: string) => void;

export const getEditors = (
  setActivities: Setter,
  setContent: Setter,
  defaultValues?: { activities: string; content: string }
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

  const activitiesEditor = editorFactory(
    setActivities,
    defaultValues?.activities
  );

  const contentEditor = editorFactory(setContent, defaultValues?.content);

  return { activitiesEditor, contentEditor };
};
