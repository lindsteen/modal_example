export interface InfoListItem {
  term: string;
  /** Tom værdi vises som "-". */
  value: string | null;
}

/** Skrivebeskyttede oplysninger i en sandfarvet boks (beskrivelsesliste). */
export function InfoList({ items }: { items: ReadonlyArray<InfoListItem> }) {
  return (
    <dl className="info-list text-md">
      {items.map((item) => (
        <div key={item.term} className="info-list__row">
          <dt className="info-list__term">{item.term}</dt>
          <dd className="info-list__value">{item.value || '-'}</dd>
        </div>
      ))}
    </dl>
  );
}
