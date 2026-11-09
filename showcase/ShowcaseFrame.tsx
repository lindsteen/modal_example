import { findExample } from './examples';

/** Indholdet i et preview-vindue (iframe): én komponent alene, så modaler ikke dækker resten af siden. */
export function ShowcaseFrame({ id }: { id: string }) {
  const example = findExample(id);

  if (!example) return <p className="frame-canvas">Ukendt komponent: {id}</p>;
  if (example.fullFrame) return <>{example.variants[0].render()}</>;

  return (
    <div className="frame-canvas">
      <div className="frame-card">
        {example.variants.map((variant, index) => (
          <section key={variant.label ?? index} className="frame-variant">
            {variant.label && <p className="frame-variant__label">{variant.label}</p>}
            {variant.render()}
          </section>
        ))}
      </div>
    </div>
  );
}
