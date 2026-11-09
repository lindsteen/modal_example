import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '@/lib/cx';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  items: ReadonlyArray<TabItem>;
  activeId: string;
  onChange: (id: string) => void;
  /** Præfiks til id'er, så fanerne kan kobles til deres TabPanel. */
  idPrefix?: string;
  label: string;
  className?: string;
}

export const tabId = (prefix: string, id: string) => `${prefix}-tab-${id}`;
export const panelId = (prefix: string, id: string) => `${prefix}-panel-${id}`;

/** Faner, der skifter indhold på samme side (role="tablist"). Piletasterne flytter mellem fanerne. */
export function Tabs({ items, activeId, onChange, idPrefix = 'tabs', label, className }: TabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const next =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : -1;
    if (next < 0) return;
    event.preventDefault();
    onChange(items[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={cx('tabs', className)} role="tablist" aria-label={label}>
      {items.map((item, index) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={tabId(idPrefix, item.id)}
            aria-selected={active}
            aria-controls={panelId(idPrefix, item.id)}
            tabIndex={active ? 0 : -1}
            className={cx('tabs__tab', 'text-md', active && 'is-active')}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export interface TabPanelProps {
  id: string;
  activeId: string;
  idPrefix?: string;
  children: ReactNode;
}

/** Indholdet til én fane. Skjulte faner bliver i DOM'en, så udfyldte felter bevares. */
export function TabPanel({ id, activeId, idPrefix = 'tabs', children }: TabPanelProps) {
  return (
    <section
      role="tabpanel"
      id={panelId(idPrefix, id)}
      aria-labelledby={tabId(idPrefix, id)}
      hidden={id !== activeId}
      className="tab-panel"
    >
      {children}
    </section>
  );
}
