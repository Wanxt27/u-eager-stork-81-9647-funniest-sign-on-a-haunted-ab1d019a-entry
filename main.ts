// Funniest Sign on a Haunted Server Room Door.
// Writes exactly one line — the sign — to /output/entry.txt.
// Node 22, standard library only. No network, no arguments.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SIGN =
  "PLEASE DO NOT DISTURB DAVE. HE DIED IN 2003, STILL WORKS THE NIGHT SHIFT, AND HATES MEETINGS.";

const outDir = "/output";
const outFile = join(outDir, "entry.txt");

function gate(text: string): void {
  if (text.length < 1 || text.length > 120) {
    throw new Error(`sign must be 1-120 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("sign must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("sign must be exactly one line");
  }
  if (text.endsWith(" ") || text.startsWith(" ")) {
    throw new Error("sign must not start or end with a space");
  }
  // No control characters: a printed sign is plain readable text.
  for (const ch of text) {
    if (ch.charCodeAt(0) < 0x20) {
      throw new Error("sign must not contain control characters");
    }
  }
}

gate(SIGN);
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, SIGN, "utf8");
// Read it back: the file on disk must be exactly the gated line,
// with no trailing newline and no extra bytes.
const written = readFileSync(outFile, "utf8");
if (written !== SIGN) {
  throw new Error("entry.txt on disk does not match the gated sign");
}
const words = SIGN.split(" ").length;
console.log(`wrote ${SIGN.length} characters (${words} words) to ${outFile}`);
