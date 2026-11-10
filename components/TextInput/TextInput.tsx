import type { InputHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';
import { Field, describedBy } from '@/components/Field/Field';
import { Icon, type IconName } from '@/components/Icon/Icon';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onChange' | 'size'> {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Ikon i højre side af feltet, fx `input-calendar` på datofelter. */
  icon?: IconName;
  help?: string;
  error?: string;
}

export function TextInput({ id, label, value, onChange, icon, help, error, required, type = 'text', className, ...rest }: TextInputProps) {
  return (
    <Field id={id} label={label} help={help} error={error} required={required}>
      <div className={cx('text-input', icon && 'has-icon', className)}>
        <input
          id={id}
          type={type}
          className="text-input__field text-md"
          value={value}
          required={required}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, help, error)}
          {...rest}
        />
        {icon && <Icon name={icon} size="small" className="text-input__icon" />}
      </div>
    </Field>
  );
}
