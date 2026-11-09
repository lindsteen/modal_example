import type { HTMLAttributes } from 'react';
import { cx } from '@/lib/cx';

/** xs 12, sm 14, md 16, lg 18, xl 22, 2xl 28, 3xl 44 px (32 px på mobil). */
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type TextStyle = 'normal' | 'bold' | 'italic';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div';
  size?: TextSize;
  textStyle?: TextStyle;
}

/** Brødtekst med klasserne `text text-<størrelse> style-<stil>`, som i MRK. */
export function Text({ as: Tag = 'p', size = 'md', textStyle = 'normal', className, ...rest }: TextProps) {
  return <Tag className={cx('text', `text-${size}`, `style-${textStyle}`, className)} {...rest} />;
}
