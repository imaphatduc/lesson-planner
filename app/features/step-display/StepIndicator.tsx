import { steps } from "./steps";

interface Props {
  currentStep: number;
}

const StepIndicator = ({ currentStep }: Props) => {
  const pastCellStyles =
    "w-4 h-4 bg-green-400 rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-black lg:w-8 lg:h-8";
  const currentCellStyles =
    "w-4 h-4 bg-neutral-800 rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-black lg:w-8 lg:h-8 border-2 border-green-400 text-green-400";
  const nextCellStyles =
    "w-4 h-4 bg-neutral-900 rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white lg:w-8 lg:h-8";
  const pastProgressStyles =
    "flex w-full relative after:content-[''] after:w-full after:h-2 after:bg-green-500 after:inline-block after:absolute lg:after:top-3 after:top-2 after:left-3";
  const nextProgressStyles =
    "flex w-full relative after:content-[''] after:w-full after:h-2 after:bg-neutral-900 after:inline-block after:absolute lg:after:top-3 after:top-2 after:left-3";
  const maxProgressStyles = "flex w-full relative";

  const numSteps = steps.length;

  const incremental = [...Array(numSteps).keys()];

  const getLastStepStyles = (step: number) => {
    return [
      maxProgressStyles,
      step === currentStep ? currentCellStyles : nextCellStyles,
    ];
  };

  const getStepStyles = (step: number) => {
    if (step === numSteps - 1) {
      return getLastStepStyles(step);
    }

    if (step < currentStep) {
      return [pastProgressStyles, pastCellStyles];
    } else if (step === currentStep) {
      return [nextProgressStyles, currentCellStyles];
    } else {
      return [nextProgressStyles, nextCellStyles];
    }
  };

  return (
    <ol className="flex items-center w-full text-xs text-gray-900 font-medium sm:text-base">
      {incremental.map((i) => (
        <li key={i} className={getStepStyles(i)[0]}>
          <div className="block whitespace-nowrap z-10">
            <span className={getStepStyles(i)[1]}>{i + 1}</span>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default StepIndicator;
