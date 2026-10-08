# Mounties Youth Basketball — Migration Checklist

## Migration Priority (when sources conflict)

1. Current client brief
2. Part 3 PDF
3. Part 2 PDF
4. Part 1 PDF
5. Existing website (https://www.mountiesyouthbasketball.com/)

---

## Page Migration Status

| Current Site Page | PDF Request | New Route | Text Status | Image Status | Video Status | Notes |
|---|---|---|---|---|---|---|
| Home | Home | `/` | Migrated | Pending client upload | Pending hero video | Core copy migrated from live site |
| About & Programs | About | `/about`, `/programs` | Migrated | Pending | N/A | |
| Camps & Clinics | Camps & Clinics | `/programs/camps-clinics` | Migrated | Pending | N/A | Dates archived by season |
| Little Dribblers | Little Dribblers | `/programs/little-dribblers` | Migrated | Pending | N/A | 2026/2027 separated |
| AAU Travel / Central PA Lions | Central PA Lions | `/programs/central-pa-lions` | Migrated | Pending | N/A | External link to centralpalions.com |
| P-O Elementary League | Elementary League | `/leagues/elementary` | Migrated | Pending | N/A | PDF content in accordions |
| Elementary Schedule | Schedule | `/leagues/elementary/schedule` | Placeholder | N/A | N/A | Awaiting verified schedule data |
| P-O Select Program | Select Program | `/select-program` | Migrated | Pending | N/A | 77–19 record labeled 2025–26 |
| State Championship | State Championship | `/state-championship` | Migrated | Pending | N/A | |
| Staff & Teams | Staff & Teams | `/team` | Partial | Pending | N/A | Coach names verified; rosters pending |
| Teams / Meet the Mounties | Meet the Mounties | `/meet-the-mounties` | Partial | Pending | N/A | Season tabs 2020–21 through 2025–26 |
| Championships / Awards | Awards & Records | `/awards-records` | Structure only | Pending | N/A | No fabricated player data |
| P-O Cash Bash | Cash Bash | `/events/cash-bash` | Migrated | Pending | N/A | |
| Elks Hoop Shoot | Elks Hoop Shoot | `/events/elks-hoop-shoot` | Migrated | Pending | N/A | |
| Sponsors | Sponsors | `/sponsors` | Placeholder | Pending | N/A | Awaiting sponsor logos |
| Join | Join | `/join` | Migrated | N/A | N/A | |
| Gear Store | Gear Store | `/shop` | Migrated | Logo only | N/A | External Game One store link |
| Donate | Donate | `/donate` | Migrated | N/A | N/A | |
| Contact | Contact | `/contact` | Migrated | N/A | N/A | Forms via Nodemailer SMTP |
| Training / Services | Training Services | `/services`, `/booking` | Migrated | Pending | N/A | $65/60min/twice weekly |
| Pricing | Pricing | `/pricing` | Partial | N/A | N/A | Select fees verified; elementary fees TBD |
| Testimonials | Testimonials | `/testimonials` | Empty | N/A | N/A | Honest "coming soon" state |
| FAQ | FAQ | `/faq` | Migrated | N/A | N/A | |
| News | News | `/news`, `/news/[slug]` | Migrated | N/A | N/A | 3 articles from live site copy |

---

## Google Drive Media Folders

| Content Area | Expected Folder | Local Destination | Status |
|---|---|---|---|
| Home hero video | Drive / live site | `public/videos/hero-basketball.mp4` | **Missing** — add client video |
| Home photos | Drive | `public/images/home/` | **Missing** — client will provide |
| About photos | Drive | `public/images/about/` | **Missing** |
| Program photos | Drive | `public/images/programs/` | **Missing** |
| Camp photos/videos | Drive | `public/images/camps/` | **Missing** |
| Little Dribblers | Drive | `public/images/little-dribblers/` | **Missing** |
| Central PA Lions | Drive | `public/images/central-pa-lions/` | **Missing** |
| Elementary League | Drive | `public/images/elementary-league/` | **Missing** |
| Select Program | Drive | `public/images/select-program/` | **Missing** |
| Team photos | Drive | `public/images/teams/` | **Missing** — 3 filenames referenced from live site |
| Season archives | Drive | `public/images/seasons/` | **Missing** |
| Awards | Drive | `public/images/awards/` | **Missing** |
| Events | Drive | `public/images/events/` | **Missing** |
| Sponsor logos | Drive | `public/images/sponsors/` | **Missing** |
| Brand / logo | Client provided | `public/brand/` | **Done** — original logo copied |

---

## Known Conflicts & Flags

| Issue | Sources | Resolution |
|---|---|---|
| Multiple summer camp dates (June 2025, 2026, 2027) | PDFs | Separated into archives; no active 2025 registration promoted |
| 2025 camp copy mixed with 2027 "coming soon" | PDFs | Split by season on camp and Little Dribblers pages |
| Primary contact email vs program email | Brief vs live site | Both listed: tjandersty@gmail.com (primary), mountiesyouthbasketball@gmail.com (program) |
| Mailing address vs game venue | Brief | Both displayed with clear labels |
| "Marble and Granted" vs "Marble and Granite" | PDFs | **Unresolved** — awaiting client confirmation |
| Team championship Drive paths referencing wrong season | PDFs | **Flagged** — verify before publishing |
| Award folder paths referencing wrong grade | PDFs | **Flagged** — verify before publishing |
| Facebook URL | Live site | Using facebook.com/MountiesYouthBasketball — verify exact URL |
| Player names / rosters / statistics | PDFs | **Not published** without client approval |
| Testimonials | Live site | None found — honest empty state displayed |
| 2025 registration links | Live site | **Not promoted** as active |

---

## Brand Assets

| Asset | Path | Status |
|---|---|---|
| Original logo | `public/brand/little-mounties-logo.png` | Done |
| Nav logo (transparent) | `public/brand/little-mounties-logo-nav.png` | Pending — create from original |
| Footer mono logo | Uses CSS invert on original | Done |
| Favicon | `public/brand/favicon.png` | Pending — create square crop |
| Apple touch icon | `public/brand/apple-touch-icon.png` | Pending — create square crop |

---

## Final Migration Status

- **Routes:** All 27+ required routes created
- **Text content:** Core program copy migrated; detailed PDF tables/rosters pending client data
- **Images:** Folder structure ready; awaiting client uploads ("pics mn du gi khud")
- **Video:** Hero video slot ready at `public/videos/hero-basketball.mp4`
- **Forms:** Contact + Booking API routes with Zod validation and Nodemailer
- **Database:** Not used (per brief — static data files only)
- **Build:** Pending production build verification

---

*Last updated: August 28, 2026*
