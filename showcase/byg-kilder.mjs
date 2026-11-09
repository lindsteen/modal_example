// Samler kildekoden fra components/, lib/ og styles/ i showcase/kilder.generated.ts,
// så Code-visningen kan vise den. Køres automatisk før dev, build og preview.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const folders = ['components', 'lib', 'styles'];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const sources = {};
for (const folder of folders) {
  for (const file of walk(join(root, folder)).filter((f) => /\.(tsx?|scss)$/.test(f)).sort()) {
    sources[relative(root, file).split('\\').join('/')] = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  }
}

const out = `// Genereret af showcase/byg-kilder.mjs – ret ikke i hånden.
export const sources: Record<string, string> = ${JSON.stringify(sources, null, 2)};
`;

writeFileSync(join(root, 'showcase', 'kilder.generated.ts'), out);
console.log(`kilder.generated.ts: ${Object.keys(sources).length} filer`);
