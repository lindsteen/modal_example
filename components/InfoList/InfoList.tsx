import type { ReactNode } from 'react';
import { Heading } from '@/components/Heading/Heading';
import { cx } from '@/lib/cx';

export interface InfoListItem {
  term: string;
  /** Tom værdi vises som "-". */
  value: string | null;
}

export interface InfoListProps {
  items?: ReadonlyArray<InfoListItem>;
  /** Overskrift inde i boksen, fx "Frivilligoplysninger". */
  title?: string;
  titleLevel?: 2 | 3 | 4;
  /** Indhold under rækkerne (eller i stedet for dem), fx en tekst og en knap. */
  children?: ReactNode;
  className?: string;
}

/** Sandfarvet boks med skrivebeskyttede oplysninger (beskrivelsesliste) og/eller andet indhold. */
export function InfoList({ items = [], title, titleLevel = 3, children, className }: InfoListProps) {
  return (
    <div className={cx('info-list', 'text-md', className)}>
      {title && (
        <Heading level={titleLevel} size="lg" className="info-list__title">
          {title}
        </Heading>
      )}
      {items.length > 0 && (
        <dl className="info-list__rows">
          {items.map((item) => (
            <div key={item.term} className="info-list__row">
              <dt className="info-list__term">{item.term}</dt>
              <dd className="info-list__value">{item.value || '-'}</dd>
            </div>
          ))}
        </dl>
      )}
      {children && <div className="info-list__content">{children}</div>}
    </div>
  );
}
