/**
 * Scans src/app at build time and lists every static public page that renders a <PageHero>,
 * with its built-in eyebrow/title/subtitle when they are plain string literals.
 * The admin "Page Headings" screen uses this list (src is not available at runtime on Vercel).
 */
import fs from "fs";
import path from "path";

const APP_ROOT = path.join(process.cwd(), "src", "app");
const OUT_FILE = path.join(process.cwd(), "src", "generated", "page-registry.json");

const pages = [];

function routeFromDir(dir) {
  const rel = path.relative(APP_ROOT, dir).split(path.sep).filter(Boolean);
  const segments = rel.filter((segment) => !/^\(.*\)$/.test(segment));
  return "/" + segments.join("/");
}

function literal(attrs, name) {
  const match = attrs.match(new RegExp(`\\b${name}=(?:"([^"]*)"|\\{\\s*"([^"]*)"\\s*\\})`));
  return match ? (match[1] ?? match[2]) : null;
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "admin" || entry.name === "api" || entry.name.startsWith("[")) continue;
      walk(full);
    } else if (entry.name === "page.tsx") {
      const source = fs.readFileSync(full, "utf8");
      const start = source.indexOf("<PageHero");
      if (start === -1) continue;
      // Find the end of the opening tag, skipping over {...} expressions.
      let depth = 0;
      let end = start;
      for (let i = start; i < source.length; i += 1) {
        const ch = source[i];
        if (ch === "{") depth += 1;
        else if (ch === "}") depth -= 1;
        else if (ch === ">" && depth === 0 && source[i - 1] !== "=") {
          end = i;
          break;
        }
      }
      const attrs = source.slice(start + "<PageHero".length, end);
      pages.push({
        path: routeFromDir(dir),
        eyebrow: literal(attrs, "eyebrow"),
        title: literal(attrs, "title"),
        subtitle: literal(attrs, "subtitle"),
      });
    }
  }
}

walk(APP_ROOT);
pages.sort((a, b) => a.path.localeCompare(b.path));

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), pages }, null, 2));
console.log(`Page registry: ${pages.length} pages with a hero`);
