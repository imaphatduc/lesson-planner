import RemovePracticeTaskButton from "./RemoveSelectedOptionButton";

interface Props {
  selectedOptions: (number | string)[];
  removeSelectedOption: (option: number | string) => void;
  display: (option: number | string) => string;
}

const SelectedOptions = ({
  selectedOptions,
  removeSelectedOption,
  display,
}: Props) => {
  return (
    <div className="space-y-2">
      {selectedOptions.map((option) => (
        <div
          key={option}
          className="w-full p-1 border-b border-neutral-600 flex items-center gap-16"
        >
          <p>{display(option)}</p>
          <RemovePracticeTaskButton
            option={option}
            removeSelectedOption={removeSelectedOption}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectedOptions;
