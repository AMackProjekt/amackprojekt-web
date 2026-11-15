import { readFileSync } from "node:fs";
import path from "node:path";

const previewPath = path.join(
  process.cwd(),
  "site",
  "mackprojekt-homepage.html",
);
const previewHtml = readFileSync(previewPath, "utf8");
const head = previewHtml.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
const body = previewHtml.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1];

if (!head || !body) {
  throw new Error(`Homepage preview is missing its head or body: ${previewPath}`);
}

const headAssets =
  head.match(/<(?:style|script)\b[\s\S]*?<\/(?:style|script)>/gi)?.join("\n") ??
  "";
const homepageMarkup = `${headAssets}\n${body}`;

export default function Home() {
  return (
    <main id="main-content" dangerouslySetInnerHTML={{ __html: homepageMarkup }} />
  );
}
