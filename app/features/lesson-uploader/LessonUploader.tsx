import React, { useState } from "react";
import type { Lesson } from "~/contexts";

interface Props {
  pendingLesson: Lesson;
  setPendingLesson: (d: Lesson) => void;
}

const LessonUploader = ({ pendingLesson, setPendingLesson }: Props) => {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPendingLesson({ ...pendingLesson, image: base64String });
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPendingLesson({ ...pendingLesson, image: "" });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <label
        htmlFor="file-upload"
        className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
      >
        Choose Image
      </label>
      <input
        id="file-upload"
        required
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Image Preview */}
      {pendingLesson.image.length > 0 && (
        <div className="relative">
          <img
            src={pendingLesson.image}
            alt="Preview"
            className="w-full h-full rounded-md"
          />
          <button
            onClick={removeImage}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
          >
            x
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonUploader;
