import SelectBox from "./SelectBox";
import SelectedOptions from "./SelectedOptions";

interface Props {
  sectionId: string;
  options: number[] | string[];
  selectedOptions: number[] | string[];
  setSelectedOption: (sectionId: string, option: number | string) => void;
  removeSelectedOption: (option: number | string) => void;
  display: (option: number | string) => string;
}

const MultipleSelection = ({
  sectionId,
  options,
  selectedOptions,
  setSelectedOption,
  removeSelectedOption,
  display,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const selectedOption = parseInt(e.target.value);
    setSelectedOption(sectionId, selectedOption);
    e.target.value = "Pick some";
  };

  return (
    <>
      <SelectBox
        options={options.filter((i) => !selectedOptions.includes(i))}
        defaultValue="Pick some"
        handleChange={handleChange}
        display={display}
      />
      <SelectedOptions
        selectedOptions={selectedOptions}
        removeSelectedOption={removeSelectedOption}
        display={display}
      />
    </>
  );
};

export default MultipleSelection;
