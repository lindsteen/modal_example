// Bygger preview.html: én fil med React, komponenterne og den kompilerede SCSS indbygget.
// Kør: npm run preview
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import * as sass from 'sass';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const css = [join(root, 'styles', 'globals.scss'), join(root, 'showcase', 'showcase.scss')]
  .map((file) => sass.compile(file, { style: 'compressed' }).css)
  .join('');

const result = await build({
  entryPoints: [join(root, 'preview', 'main.tsx')],
  bundle: true,
  minify: true,
  write: false,
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  tsconfig: join(root, 'tsconfig.json'),
  define: { 'process.env.NODE_ENV': '"production"' },
  alias: {
    'next/head': join(root, 'preview', 'shims', 'head.tsx'),
  },
  legalComments: 'eof',
});

// "</script" i den indbyggede kode ville afslutte script-tagget for tidligt
const js = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');

const html = `<!DOCTYPE html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Oplysninger om frivillig – komponent</title>
<style>${css}</style>
</head>
<body>
<div id="__next"></div>
<script>${js}</script>
</body>
</html>
`;

writeFileSync(join(root, 'preview.html'), html);
console.log(`preview.html: ${(html.length / 1024).toFixed(0)} KB`);
