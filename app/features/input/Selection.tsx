import SelectBox from "./SelectBox";

interface Props {
  name?: string;
  sectionId: string;
  options: number[] | string[];
  selectedOption: number | string;
  setSelectedOption: (sectionId: string, option: number | string) => void;
  display: (option: number | string) => string;
  required: boolean;
}

const Selection = ({
  name,
  sectionId,
  options,
  selectedOption,
  setSelectedOption,
  display,
  required = false,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const selectedOption =
      typeof options[0] === "string"
        ? e.target.value
        : parseInt(e.target.value);
    setSelectedOption(sectionId, selectedOption);
  };

  return (
    <SelectBox
      name={name}
      options={options}
      defaultValue={selectedOption ?? "Pick one"}
      handleChange={handleChange}
      display={display}
      required={required}
    />
  );
};

export default Selection;
