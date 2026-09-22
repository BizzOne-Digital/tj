/**
 * Scans public/ at build time so galleries work on Vercel (no runtime fs on public/).
 */
import fs from "fs";
import path from "path";

const PUBLIC_ROOT = path.join(process.cwd(), "public");
const OUT_FILE = path.join(process.cwd(), "src", "generated", "media-manifest.json");
const IMG = /\.(jpg|jpeg|png|webp|gif|avif|bmp)$/i;

/** folder path (posix) -> recursive image URLs under that folder */
const recursiveImages = {};
/** folder path -> images in this folder only (not nested) */
const directImages = {};
/** folder path -> immediate subfolder names */
const subfolders = {};

function ensureList(key) {
  if (!recursiveImages[key]) recursiveImages[key] = [];
}

function ensureDirect(key) {
  if (!directImages[key]) directImages[key] = [];
}

function addImageToAncestors(dirPath, url) {
  let current = dirPath;
  while (current) {
    ensureList(current);
    recursiveImages[current].push(url);
    const idx = current.lastIndexOf("/");
    if (idx === -1) break;
    current = current.slice(0, idx);
  }
}

function walk(absDir, relDir) {
  let entries;
  try {
    entries = fs.readdirSync(absDir, { withFileTypes: true });
  } catch {
    return;
  }

  const childDirs = [];
  for (const entry of entries) {
    const abs = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      childDirs.push(entry.name);
      const nextRel = relDir ? `${relDir}/${entry.name}` : entry.name;
      walk(abs, nextRel);
    } else if (entry.isFile() && IMG.test(entry.name)) {
      const relFile = relDir ? `${relDir}/${entry.name}` : entry.name;
      const url = `/${relFile.split(path.sep).join("/")}`;
      ensureDirect(relDir);
      directImages[relDir].push(url);
      addImageToAncestors(relDir, url);
    }
  }

  if (relDir) {
    subfolders[relDir] = childDirs.sort();
  }
}

if (!fs.existsSync(PUBLIC_ROOT)) {
  console.error("public/ not found — skipping media manifest.");
  process.exit(0);
}

walk(PUBLIC_ROOT, "");

for (const key of Object.keys(recursiveImages)) {
  recursiveImages[key] = [...new Set(recursiveImages[key])].sort();
}
for (const key of Object.keys(directImages)) {
  directImages[key] = [...new Set(directImages[key])].sort();
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
const manifest = {
  generatedAt: new Date().toISOString(),
  recursiveImages,
  directImages,
  subfolders,
};

fs.writeFileSync(OUT_FILE, JSON.stringify(manifest));
const folderCount = Object.keys(recursiveImages).length;
const imageCount = Object.values(recursiveImages).reduce((n, arr) => n + arr.length, 0);
console.log(`Media manifest: ${folderCount} folders, ${imageCount} image entries -> ${OUT_FILE}`);
