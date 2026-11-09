import { Fragment, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Heading } from '@/components/Heading/Heading';
import { cx } from '@/lib/cx';
import { CodeBlock } from './CodeBlock';
import { EXAMPLE_GROUPS, examples, findExample, type Example } from './examples';
import { sources } from './kilder.generated';

export interface CodeViewProps {
  selectedId: string;
  onSelect: (id: string) => void;
  frameUrl: (id: string) => string;
}

/** Code-visningen: komponentliste til venstre, preview og kode til højre. */
export function CodeView({ selectedId, onSelect, frameUrl }: CodeViewProps) {
  const example = findExample(selectedId) ?? examples[0];

  return (
    <div className="code-view">
      <nav className="code-view__nav" aria-label="Komponenter">
        {EXAMPLE_GROUPS.map((group) => (
          <Fragment key={group}>
            <h2 className="code-view__group">{group}</h2>
            <ul className="code-view__list">
              {examples
                .filter((item) => item.group === group)
                .map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={cx('code-view__item', item.id === example.id && 'is-active')}
                      aria-current={item.id === example.id ? 'true' : undefined}
                      onClick={() => onSelect(item.id)}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
            </ul>
          </Fragment>
        ))}
      </nav>

      {/* key: preview, valgt fil og kopiér-knap starter forfra for hver komponent */}
      <ComponentDetails key={example.id} example={example} onSelect={onSelect} frameUrl={frameUrl} />
    </div>
  );
}

function ComponentDetails({ example, onSelect, frameUrl }: { example: Example } & Omit<CodeViewProps, 'selectedId'>) {
  const [fileIndex, setFileIndex] = useState(0);
  const [frameVersion, setFrameVersion] = useState(0);
  const [copied, setCopied] = useState(false);
  const file = example.files[fileIndex];
  const source = sources[file] ?? `// Filen ${file} findes ikke. Kør npm run dev, build eller preview for at opdatere kilderne.`;
  const uses = usedComponents(example);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
    } catch {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-view__main">
      <div className="code-view__header">
        <Heading level={1} size="2xl">
          {example.name}
        </Heading>
        <p className="text text-md code-view__description">{withInlineCode(example.description)}</p>
        {uses.length > 0 && (
          <div className="code-view__uses">
            <span className="text-sm">Bruger:</span>
            {uses.map((used) => (
              <button key={used.id} type="button" className="chip text-sm" onClick={() => onSelect(used.id)}>
                {used.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <section className="panel" aria-labelledby="panel-preview-titel">
        <div className="panel__bar">
          <h2 id="panel-preview-titel" className="panel__title">
            Preview
          </h2>
          <Button size="sm" bg="black" variant="inverted" onClick={() => setFrameVersion((version) => version + 1)}>
            Nulstil
          </Button>
        </div>
        <div className="panel__frame" style={{ height: example.height }}>
          <iframe key={frameVersion} src={frameUrl(example.id)} title={`Preview af ${example.name}`} />
        </div>
      </section>

      <section className="panel" aria-labelledby="panel-kode-titel">
        <div className="panel__bar">
          <h2 id="panel-kode-titel" className="panel__title">
            Kode
          </h2>
          <div className="panel__files" role="group" aria-label="Filer">
            {example.files.map((path, index) => (
              <button
                key={path}
                type="button"
                className={cx('file-tab', index === fileIndex && 'is-active')}
                aria-pressed={index === fileIndex}
                title={path}
                onClick={() => setFileIndex(index)}
              >
                {path.split('/').pop()}
              </button>
            ))}
          </div>
          <Button size="sm" bg="black" variant="inverted" onClick={copy}>
            {copied ? 'Kopieret' : 'Kopiér'}
          </Button>
        </div>
        <p className="panel__path">{file}</p>
        <CodeBlock path={file} source={source} />
      </section>
    </div>
  );
}

/** Finder de komponenter, som eksemplets egen fil importerer (ikke kun typer), så man kan klikke videre til dem. */
function usedComponents(example: Example) {
  const source = sources[example.files[0]] ?? '';
  const names = new Set(
    [...source.matchAll(/^import (?!type )[^;]*from '(?:@\/components\/\w+\/|\.\/)(\w+)'/gm)].map((match) => match[1]),
  );
  return examples.filter((item) => item.id !== example.id && names.has(item.id));
}

/** Viser tekst i `backticks` som kode. */
function withInlineCode(text: string) {
  return text.split('`').map((part, index) => (index % 2 === 1 ? <code key={index}>{part}</code> : part));
}
