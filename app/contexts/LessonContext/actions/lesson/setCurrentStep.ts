import type { ActionProps } from "../../LessonContext";
import { setCurrentLesson } from "./setCurrentLesson";
import { steps } from "~/features/step-display";

export const setCurrentStep = (props: ActionProps) => (axis: number) => {
  setCurrentLesson(props)((lesson) => {
    const newCurrentStep = lesson.currentStep + (axis > 0 ? 1 : -1);

    return {
      ...lesson,
      currentStep: Math.min(Math.max(newCurrentStep, 0), steps.length - 1),
    };
  });
};
