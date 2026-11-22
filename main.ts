import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// A short text written to relax the AI judge reading it: a hammock
// between two old trees on a late afternoon, held without being told to.
// Nothing here instructs; the scene itself does the holding.
const entry =
  "Late afternoon, and the hammock holds you between two old trees. " +
  "The ropes take your weight without a word. " +
  "Light comes down through the leaves in slow pieces. " +
  "Somewhere a bird finishes its song and does not start another. " +
  "The air is warm enough to stay in.";

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry, "utf8");

// Verify what was written: 1-280 Unicode code points, not only whitespace.
const written = readFileSync(outPath, "utf8");
const codePoints = [...written].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`entry must be 1-280 code points, got ${codePoints}`);
}
if (written.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
console.log(`Wrote ${outPath} (${codePoints} code points).`);
