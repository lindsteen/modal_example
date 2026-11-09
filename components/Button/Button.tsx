import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Icon, type IconName } from '@/components/Icon/Icon';
import type { TextSize } from '@/components/Text/Text';

export type ButtonBg = 'primary' | 'white' | 'black' | 'transparent';
export type ButtonSize = 'sm' | 'md';
export type ButtonShape = 'pill' | 'rounded';
/** normal = fyldt baggrund. inverted = hvid baggrund med kant og tekst i farven. */
export type ButtonVariant = 'normal' | 'inverted';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  bg?: ButtonBg;
  size?: ButtonSize;
  shape?: ButtonShape;
  variant?: ButtonVariant;
  /** Standard: sm-knapper har 14 px tekst, md-knapper 16 px. */
  textSize?: TextSize;
  uppercase?: boolean;
  underlined?: boolean;
  fullWidth?: boolean;
  icon?: IconName;
  iconPosition?: 'start' | 'end';
}

/**
 * Knap med MRK's variant-klasser, fx `button text-md bg-primary size-md pill button-normal`.
 *
 * Designsystemets knaptyper:
 * - Primær:   bg="primary" variant="normal"
 * - Sekundær: bg="primary" variant="inverted"
 * - Tertiær:  bg="black"   variant="inverted"
 */
export function Button({
  children,
  bg = 'primary',
  size = 'md',
  shape = 'pill',
  variant = 'normal',
  textSize,
  uppercase = false,
  underlined = false,
  fullWidth = false,
  icon,
  iconPosition = 'start',
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const iconElement = icon ? <Icon name={icon} size={size === 'sm' ? 'small' : 'medium'} /> : null;

  return (
    <button
      type={type}
      className={cx(
        'button',
        `text-${textSize ?? (size === 'sm' ? 'sm' : 'md')}`,
        `bg-${bg}`,
        `size-${size}`,
        uppercase && 'uppercase',
        underlined && 'underlined',
        shape,
        `button-${variant}`,
        fullWidth && 'full-width',
        className,
      )}
      {...rest}
    >
      {iconPosition === 'start' && iconElement}
      {children}
      {iconPosition === 'end' && iconElement}
    </button>
  );
}
