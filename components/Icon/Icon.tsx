import { cx } from '@/lib/cx';
import { icons } from './icons';

export type IconName = keyof typeof icons;
/** xsmall 14 px, small 18 px, medium 20 px, large 24 px. */
export type IconSize = 'xsmall' | 'small' | 'medium' | 'large';
export type IconColor = 'currentColor' | 'primary';

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  /** Kun når ikonet står alene og skal læses op. Ellers skjules det for skærmlæsere. */
  label?: string;
  className?: string;
}

/** Inline SVG med klasserne `icon icon-<størrelse> <farve>`, som i MRK. */
export function Icon({ name, size = 'medium', color = 'currentColor', label, className }: IconProps) {
  const { viewBox, body } = icons[name];
  return (
    <svg
      className={cx('icon', `icon-${size}`, color, className)}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {body}
    </svg>
  );
}
