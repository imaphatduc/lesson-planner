import { use } from "react";
import { LessonContext } from "~/contexts";

interface Props {
  axis: number;
}

const SetCurrentStepButton = ({ axis }: Props) => {
  const { setCurrentStep } = use(LessonContext);

  return (
    <button
      className={
        axis > 0
          ? "p-2 bg-teal-700 rounded-sm hover:bg-teal-800 cursor-pointer transition"
          : "p-2 bg-red-700 rounded-sm hover:bg-red-800 cursor-pointer transition"
      }
      onClick={() => setCurrentStep(axis)}
    >
      {axis > 0 ? "Next Step" : "Previous"}
    </button>
  );
};

export default SetCurrentStepButton;
