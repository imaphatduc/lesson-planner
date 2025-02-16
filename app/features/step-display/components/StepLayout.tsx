import { use, type PropsWithChildren } from "react";
import StepIndicator from "../StepIndicator";
import { LessonContext } from "~/contexts";
import SetCurrentStepButton from "./SetCurrentStepButton";
import { steps } from "../steps";
import TogglePreviewButton from "./TogglePreviewButton";

interface Props {
  name: string;
}

const StepLayout = ({ name, children }: PropsWithChildren<Props>) => {
  const { metadata } = use(LessonContext);

  return (
    <>
      <div className="shadow-xl pb-4">
        <StepIndicator currentStep={metadata.currentStep} />

        <h2>{name}</h2>
        <div className="mb-4"></div>

        <div className="flex gap-3">
          {metadata.currentStep > 0 && <SetCurrentStepButton axis={-1} />}
          {metadata.currentStep < steps.length - 1 ? (
            <SetCurrentStepButton axis={1} />
          ) : (
            <TogglePreviewButton />
          )}
        </div>
      </div>

      <div className="mb-4"></div>

      {children}
      <div className="mb-4"></div>
    </>
  );
};

export default StepLayout;
