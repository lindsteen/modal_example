import { useEffect, useState } from 'react';
import { TabPanel, Tabs } from '@/components/Tabs/Tabs';
import { CodeView } from './CodeView';
import { examples, findExample } from './examples';

type View = 'preview' | 'code';

const VIEWS = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
] as const;

const MAIN_COMPONENT = examples[0].id;

/** Adressen husker visningen og den valgte komponent, fx #code/RoleItem. */
function readHash(): { view: View; selectedId: string } {
  const [view, id] = window.location.hash.replace(/^#/, '').split('/');
  return {
    view: view === 'code' ? 'code' : 'preview',
    selectedId: id && findExample(id) ? id : MAIN_COMPONENT,
  };
}

/** Siden med topmenuen "Preview" og "Code". */
export function Showcase({ frameUrl }: { frameUrl: (id: string) => string }) {
  const [{ view, selectedId }, setState] = useState(readHash);

  useEffect(() => {
    window.history.replaceState(null, '', view === 'code' ? `#code/${selectedId}` : '#preview');
  }, [view, selectedId]);

  // Følg med, hvis adressen ændres udefra (fx tilbage-knappen eller et indsat link)
  useEffect(() => {
    const handleHashChange = () => setState(readHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="showcase">
      <header className="showcase__topbar">
        <span className="showcase__title">Oplysninger om frivillig</span>
        <Tabs
          items={VIEWS}
          activeId={view}
          onChange={(id) => setState((current) => ({ ...current, view: id as View }))}
          idPrefix="showcase"
          label="Visning"
          className="showcase__menu"
        />
      </header>

      <TabPanel id="preview" activeId={view} idPrefix="showcase">
        <iframe className="showcase__full-frame" src={frameUrl(MAIN_COMPONENT)} title="Preview af modalen Oplysninger om frivillig" />
      </TabPanel>

      <TabPanel id="code" activeId={view} idPrefix="showcase">
        <CodeView
          selectedId={selectedId}
          onSelect={(id) => setState({ view: 'code', selectedId: id })}
          frameUrl={frameUrl}
        />
      </TabPanel>
    </div>
  );
}
