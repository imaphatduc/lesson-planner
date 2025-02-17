import { use } from "react";
import { LessonContext } from "~/contexts";

const TogglePreviewButton = () => {
  const { preview, togglePreview } = use(LessonContext);

  return (
    <button
      className={
        preview
          ? "p-2 text-white bg-red-700 rounded-sm hover:bg-red-800 cursor-pointer transition"
          : "p-2 text-white bg-teal-700 rounded-sm hover:bg-teal-800 cursor-pointer transition"
      }
      onClick={togglePreview}
    >
      Preview
    </button>
  );
};

export default TogglePreviewButton;
