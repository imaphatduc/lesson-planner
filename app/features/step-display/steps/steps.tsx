import StepOne from "./one/StepOne";
import StepTwo from "./two/StepTwo";
import StepThree from "./three/StepThree";

export const steps = [
  {
    name: "Analyze the objectives",
    element: <StepOne />,
  },
  {
    name: "Analyze the procedures",
    element: <StepTwo />,
  },
  {
    name: "Complete the lesson plan",
    element: <StepThree />,
  },
];
