import { use } from "react";
import { LessonContext } from "~/contexts";
import { MyLessonsContext } from "~/contexts/MyLessonsContext";

const TogglePreviewButton = () => {
  const { setDarkMode } = use(MyLessonsContext);

  const { preview, togglePreview } = use(LessonContext);

  return (
    <button
      className={
        preview
          ? "p-2 text-white bg-red-700 rounded-sm hover:bg-red-800 cursor-pointer transition"
          : "p-2 text-white bg-teal-700 rounded-sm hover:bg-teal-800 cursor-pointer transition"
      }
      onClick={() => {
        setDarkMode(false);
        togglePreview();
      }}
    >
      Preview
    </button>
  );
};

export default TogglePreviewButton;
