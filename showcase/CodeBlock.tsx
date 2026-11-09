import { useMemo } from 'react';
import hljs from 'highlight.js/lib/core';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('xml', xml);

/** Kildekode med linjenumre og farvelægning (highlight.js). */
export function CodeBlock({ path, source }: { path: string; source: string }) {
  const language = path.endsWith('.scss') ? 'scss' : 'typescript';
  // highlight.js escaper selv koden, og den kommer kun fra projektets egne filer
  const html = useMemo(() => hljs.highlight(source, { language }).value, [source, language]);
  const lineCount = source.replace(/\n$/, '').split('\n').length;

  return (
    <div className="code-block" tabIndex={0} aria-label={`Kode i ${path}`}>
      <pre className="code-block__gutter" aria-hidden="true">
        {Array.from({ length: lineCount }, (_, index) => index + 1).join('\n')}
      </pre>
      <pre className="code-block__code">
        <code className="hljs" dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}
