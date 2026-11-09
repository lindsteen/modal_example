import { useEffect, useState } from 'react';
import { Showcase } from './Showcase';
import { ShowcaseFrame } from './ShowcaseFrame';

/**
 * Samme side bruges både som komponentvisning og som indhold i preview-vinduerne:
 * #frame=<komponent> viser kun komponenten. Det virker ens i Next.js og i preview.html.
 */
export function ShowcaseRoot() {
  const [frame, setFrame] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    setFrame(window.location.hash.match(/^#frame=(\w+)/)?.[1] ?? null);
  }, []);

  if (frame === undefined) return null;
  if (frame) return <ShowcaseFrame id={frame} />;

  const page = window.location.href.split('#')[0];
  return <Showcase frameUrl={(id) => `${page}#frame=${id}`} />;
}
