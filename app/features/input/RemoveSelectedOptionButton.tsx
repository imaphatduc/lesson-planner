interface Props {
  option: number | string;
  removeSelectedOption: (option: number | string) => void;
}

const RemovePracticeTaskButton = ({ option, removeSelectedOption }: Props) => {
  return (
    <button
      className="border border-neutral-500 text-neutral-500 rounded-full w-5 h-5 cursor-pointer flex justify-center items-center"
      onClick={() => removeSelectedOption(option)}
    >
      -
    </button>
  );
};

export default RemovePracticeTaskButton;
