export interface RadioOption<T extends string> {
  value: T;
  label: string;
}

export interface RadioGroupProps<T extends string> {
  /** Bruges som `name` og som præfiks til hver valgmuligheds id. */
  name: string;
  legend: string;
  value: T;
  options: ReadonlyArray<RadioOption<T>>;
  onChange: (value: T) => void;
}

export function RadioGroup<T extends string>({ name, legend, value, options, onChange }: RadioGroupProps<T>) {
  return (
    <fieldset className="radio-group">
      <legend className="radio-group__legend text-sm">{legend}</legend>
      {options.map((option) => (
        <label key={option.value} className="radio-group__option text-md" htmlFor={`${name}-${option.value}`}>
          <input
            id={`${name}-${option.value}`}
            className="radio-group__input"
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
}
