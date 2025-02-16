import { use } from "react";
import StepLayout from "./StepLayout";
import { steps } from "../steps";
import { LessonContext } from "~/contexts";

const StepDisplay = () => {
  const { metadata } = use(LessonContext);

  const currentStepData = steps[metadata.currentStep];

  return (
    <StepLayout name={currentStepData.name}>
      {currentStepData.element}
    </StepLayout>
  );
};

export default StepDisplay;
