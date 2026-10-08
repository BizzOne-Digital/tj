import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "public");
const IMG = /\.(jpg|jpeg|png|webp|gif|avif|bmp)$/i;

function countImages(folderPath) {
  const abs = path.join(root, folderPath);
  if (!fs.existsSync(abs)) return { exists: false, count: 0 };
  let count = 0;
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (IMG.test(e.name)) count++;
    }
  };
  walk(abs);
  return { exists: true, count };
}

const paths = [
  ["about", "About Tab -20260831T131427Z-1-001/About Tab"],
  ["littleDribblers", "LITTLE DRIBBLERS TAB-20260831T131443Z-1-001/LITTLE DRIBBLERS TAB"],
  ["elementaryAction", "P-O Elementary Leagues Folder-20260831T131419Z-1-001/P-O Elementary Leagues Folder/Action Pictures"],
  ["scholarship.campers", "Scholarship Day-20260831T131455Z-1-001/Competition-Scholarship Day/PO Campers picture"],
  ["scholarship.poster", "Scholarship Day-20260831T131455Z-1-001/Competition-Scholarship Day/BIG DREAMS START HERE POSTER"],
  ["scholarship.winners", "Scholarship Day-20260831T131455Z-1-001/Competition-Scholarship Day/AWARD WINNERS FOLDER/Scholarship Winners"],
  ["scholarship.5v5", "Scholarship Day-20260831T131455Z-1-001/Competition-Scholarship Day/AWARD WINNERS FOLDER/5-ON-5 Folder"],
  ["scholarship.3v3", "Scholarship Day-20260831T131455Z-1-001/Competition-Scholarship Day/AWARD WINNERS FOLDER/3-ON-3 Folder"],
  ["scholarship.mvp", "Scholarship Day-20260831T131455Z-1-001/Competition-Scholarship Day/AWARD WINNERS FOLDER/CAMP MVP"],
  ["awards.1-2", "League Player Awards -20260831T131453Z-1-001/League Player Awards/2025-26 Season/1-2nd Grade"],
  ["awards.3-4", "League Player Awards -20260831T131453Z-1-001/League Player Awards/2025-26 Season/3-4th Grade"],
  ["awards.5-6", "League Player Awards -20260831T131453Z-1-001/League Player Awards/2025-26 Season/5-6th Grade"],
  ["champ.2425.12", "Team League Championships -20260831T131441Z-1-001/Team League Championships/2024-25 Season (First Year)/1-2nd Grade"],
  ["champ.2425.56", "Team League Championships -20260831T131441Z-1-001/Team League Championships/2024-25 Season (First Year)/5-6th Grade"],
  ["champ.2526.12", "Team League Championships -20260831T131441Z-1-001/Team League Championships/2025-26 Season/1-2nd Grade"],
  ["champ.2526.56", "Team League Championships -20260831T131441Z-1-001/Team League Championships/2025-26 Season/5-6th Grade"],
  ["allstars.34", "League All-stars  -20260831T131500Z-1-001/League All-stars/2025-26 Season (First Year)/3-4th Grade"],
  ["allstars.56", "League All-stars  -20260831T131500Z-1-001/League All-stars/2025-26 Season (First Year)/5-6th Grade"],
  ["banquet.2526", "Special Events -20260831T131458Z-1-001/Special Events/End Of The Year Banquet/2025-26 Season"],
  ["youthcamp.2526", "Special Events -20260831T131458Z-1-001/Special Events/Youth PO Baskethall Camp/2025-26 Season"],
  ["summer.2526", "Special Events -20260831T131458Z-1-001/Special Events/Elementary Summer League/2025-26 Season"],
  ["summer.2425", "Special Events -20260831T131458Z-1-001/Special Events/Elementary Summer League/2024-25 Season (First Year)"],
  ["select.team.2526", "The Select Teams -20260831T131418Z-1-001/The Select Teams/2025-26 Team/Team Pictures"],
  ["golden.2526", "Golden Ticket Winning Teams-20260831T131503Z-1-001/Championships-Golden Ticket Winning Teams/2025-26 Season"],
  ["meet", "MEET THE MOUNTIES -20260831T131434Z-1-001/MEET THE MOUNTIES"],
  ["state", "Elementary State Championship Program -20260831T131447Z-1-001/Elementary State Championship Program"],
];

const critical = new Set(["meet", "select.team.2526", "elementaryAction"]);
let hasCriticalFailure = false;

for (const [name, p] of paths) {
  const r = countImages(p);
  const status = !r.exists ? "MISSING" : r.count === 0 ? "EMPTY" : "OK";
  console.log(`${status.padEnd(7)} ${String(r.count).padStart(3)}  ${name}: ${p}`);
  if (critical.has(name) && status !== "OK") {
    hasCriticalFailure = true;
  }
}

if (hasCriticalFailure && process.env.SKIP_MEDIA_VALIDATION !== "1") {
  console.error("\nBuild blocked: required photo folders are missing from public/.");
  console.error("Download the Google Drive zip exports and copy them into public/ (see src/config/public-media.ts).");
  console.error("To skip this check temporarily, set SKIP_MEDIA_VALIDATION=1.");
  process.exit(1);
}
