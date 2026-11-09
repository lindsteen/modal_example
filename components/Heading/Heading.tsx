import type { HTMLAttributes } from 'react';
import { cx } from '@/lib/cx';
import type { TextSize } from '@/components/Text/Text';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const defaultSize: Record<Level, TextSize> = { 1: '3xl', 2: '2xl', 3: 'xl', 4: 'lg', 5: 'md', 6: 'sm' };

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Overskriftsniveauet (h1–h6). Følg rækkefølgen på siden. */
  level: Level;
  /** Størrelsen kan vælges uafhængigt af niveauet. */
  size?: TextSize;
}

/** Overskrift med klasserne `heading text-<størrelse>`, som i MRK. */
export function Heading({ level, size, className, ...rest }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cx('heading', `text-${size ?? defaultSize[level]}`, className)} {...rest} />;
}
