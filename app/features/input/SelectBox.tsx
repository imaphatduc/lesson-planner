import type { ReactEventHandler } from "react";

interface Props {
  name?: string;
  options: number[] | string[];
  defaultValue: number | string;
  handleChange: ReactEventHandler<HTMLSelectElement>;
  display: (option: number | string) => string;
  required: boolean;
}

const SelectBox = ({
  name,
  options,
  defaultValue,
  handleChange,
  display,
  required = false,
}: Props) => {
  return (
    <div className="form-control w-full bg-neutral-600 rounded-t-md">
      <select
        name={name}
        className="select select-bordered w-full py-1"
        defaultValue={defaultValue}
        onChange={handleChange}
        required={required}
      >
        <option className="bg-neutral-600" disabled>
          {typeof defaultValue === "number"
            ? display(defaultValue)
            : defaultValue}
        </option>
        {options.map((option, i) => (
          <option key={i} className="bg-neutral-600" value={option}>
            {display(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
