import { Field, describedBy } from '@/components/Field/Field';
import { Icon } from '@/components/Icon/Icon';

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

export interface SelectProps<T extends string> {
  id: string;
  label: string;
  value: T;
  options: ReadonlyArray<SelectOption<T>>;
  onChange: (value: T) => void;
  help?: string;
  error?: string;
}

export function Select<T extends string>({ id, label, value, options, onChange, help, error }: SelectProps<T>) {
  return (
    <Field id={id} label={label} help={help} error={error}>
      <div className="select">
        <select
          id={id}
          className="select__field text-md"
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, help, error)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon name="input-chevron-ned" size="small" className="select__icon" />
      </div>
    </Field>
  );
}
