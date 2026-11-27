// Bricht ab, solange in den Rechtstexten noch {{…}}-Platzhalter stehen.
// Vor dem Merge nach main ausführen: npm run check:legal
import { readFileSync } from 'node:fs';

const file = new URL('../src/legal/operator.ts', import.meta.url);
const left = readFileSync(file, 'utf8').match(/\{\{[A-Z_]+\}\}/g) ?? [];
if (left.length > 0) {
  console.error(`Offene Platzhalter in src/legal/operator.ts: ${[...new Set(left)].join(', ')}`);
  process.exit(1);
}
console.log('Keine offenen Platzhalter.');
