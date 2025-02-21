import React, { useState } from "react";
import type { Lesson } from "~/contexts";
import { XButton } from "../x-button";
import { FileUploader } from "../file-uploader";

interface Props {
  pendingLesson: Lesson;
  setPendingLesson: (d: Lesson) => void;
}

const LessonUploader = ({ pendingLesson, setPendingLesson }: Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const src = URL.createObjectURL(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setPendingLesson({ ...pendingLesson, image: src });
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPendingLesson({ ...pendingLesson, image: "" });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <FileUploader
        inputId="lesson-upload"
        required
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      >
        Choose Image
      </FileUploader>

      {/* Image Preview */}
      {pendingLesson.image.length > 0 && (
        <div className="relative">
          <img
            src={pendingLesson.image}
            alt="Preview"
            className="w-full h-full rounded-md"
          />
          <XButton onClick={removeImage} />
        </div>
      )}
    </div>
  );
};

export default LessonUploader;
