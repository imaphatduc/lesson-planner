import { Minus } from "lucide-react";

interface Props {
  option: number | string;
  removeSelectedOption: (option: number | string) => void;
}

const RemovePracticeTaskButton = ({ option, removeSelectedOption }: Props) => {
  return (
    <button
      className="border border-neutral-500 text-neutral-500 hover:text-neutral-400 rounded-full w-5 h-5 p-1 cursor-pointer flex justify-center items-center"
      onClick={() => removeSelectedOption(option)}
    >
      <Minus />
    </button>
  );
};

export default RemovePracticeTaskButton;
