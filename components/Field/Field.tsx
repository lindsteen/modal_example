import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

export interface FieldProps {
  id: string;
  label: string;
  help?: string;
  error?: string;
  children: ReactNode;
}

/** Fælles ramme for formularfelter: synlig label, evt. hjælpetekst og fejlbesked. */
export function Field({ id, label, help, error, children }: FieldProps) {
  return (
    <div className={cx('form-field', error && 'has-error')}>
      <label className="form-label text-sm" htmlFor={id}>
        {label}
      </label>
      {help && (
        <p id={`${id}-help`} className="form-help text text-sm style-normal">
          {help}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="form-error text text-sm style-normal">
          {error}
        </p>
      )}
    </div>
  );
}

/** Kobler hjælpetekst og fejlbesked til feltet for skærmlæsere. */
export function describedBy(id: string, help?: string, error?: string) {
  return [help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
}
