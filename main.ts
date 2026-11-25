// The Battery's Last Text to Its Charger — one line, at most 200
// characters: the phone battery's final message to the charger it waited
// for all day. Setup earns the punch; no filler. Writes /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

function makeText(): string {
  const parts = [
    "I held 1% all day, saving my last breath for you.",
    "You came home and charged the toaster first.",
    "Goodbye — tell the alarm I tried.",
  ];
  return parts.join(" ");
}

function main(): void {
  const text = makeText();
  const length = [...text].length;
  if (length < 1 || length > LIMIT) {
    throw new Error(`entry must be 1-${LIMIT} chars, got ${length}`);
  }
  if (/\n|\r/.test(text)) {
    throw new Error("entry must be a single line");
  }
  // The battery speaks to its charger: the farewell only works addressed.
  if (!/you/i.test(text)) {
    throw new Error("entry must address the charger");
  }
  // A last text earns its pathos by naming the wait: the 1% is the setup.
  if (!/1%/.test(text)) {
    throw new Error("entry must name the battery's last percent");
  }
  const target = join(OUTPUT_DIR, "entry.txt");
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(target, text + "\n", "utf8");
  console.log(`${length} chars -> ${target}`);
  console.log(text);
}

main();
