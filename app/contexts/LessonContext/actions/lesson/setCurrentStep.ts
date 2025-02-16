import type { LessonMetadata } from "~/contexts/Lesson.type";
import { setCurrentLesson } from "./setCurrentLesson";
import { steps } from "~/features/step-display";

export const setCurrentStep = (metadata: LessonMetadata) => (axis: number) => {
  setCurrentLesson(metadata)((lesson) => {
    const newCurrentStep = lesson.currentStep + (axis > 0 ? 1 : -1);

    return {
      ...lesson,
      currentStep: Math.min(Math.max(newCurrentStep, 0), steps.length - 1),
    };
  });
};
