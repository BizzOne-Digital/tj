# Media Folder Guide — PDF Part 1

Copy each Google Drive folder **exactly as named** into `public/images/`.

Example: If Drive has `ABOUT TAB FOLDER/PICTURES/photo1.jpg`, place it at:
```
public/images/ABOUT TAB FOLDER/PICTURES/photo1.jpg
```

---

## Tab → Drive Folder Mapping

| # | Website Tab | Route | Drive Folder to Copy |
|---|-------------|-------|----------------------|
| **Main** | Homepage Hero Video | `/` | Download from old site → `public/videos/hero-basketball.mp4` |
| **1** | About | `/about` | `ABOUT TAB FOLDER/PICTURES` |
| **2** | Camps & Clinics | `/programs/camps-clinics` | *(no folder in PDF Part 1)* |
| **3a** | P-O Youth Basketball Camp | `/programs/youth-basketball-camp` | `Competition/Scholarship Day TAB FOLDER/PO Campers picture/ Picture` |
| **3b** | Competition/Scholarship Day | `/programs/youth-basketball-camp/scholarship-day` | `Competition/Scholarship Day TAB FOLDER/BIG DREAMS START HERE POSTER` |
| **3c** | Scholarship Winners | `/programs/youth-basketball-camp/scholarship-winners` | `Competition/Scholarship Day TAB FOLDER/AWARD WINNERS FOLDER/ Scholarship Winners Folder/PICTURES` |
| **3d** | 5-on-5 Winners | `/programs/youth-basketball-camp/5-on-5` | `Competition/Scholarship Day TAB FOLDER/AWARD WINNERS FOLDER/5-ON-5 Folder/PICTURES` |
| **3e** | 3-on-3 Winners | `/programs/youth-basketball-camp/3-on-3` | `Competition/Scholarship Day TAB FOLDER/AWARD WINNERS FOLDER/3-ON-3 Folder/PICTURES` |
| **3f** | Camp MVP | `/programs/youth-basketball-camp/camp-mvp` | `Competition/Scholarship Day TAB FOLDER/AWARD WINNERS FOLDER/CAMP MVP Folder/PICTURES` |
| **4** | Little Dribblers | `/programs/little-dribblers` | `LITTLE DRIBBLERS TAB FOLDER/PICTURES` |
| **5** | Central PA Lions AAU | `/programs/central-pa-lions` | `(OLD DRIVE NEW WEBSITE DRIVE) CENTRAL PA LIONS AAU PROGRAM FOLDER` |
| **6** | P-O Elementary League | `/leagues/elementary` | `P-O Elementary Leagues FOLDER/Action Shots/PICTURES And Video` |
| **7** | Elementary Schedule | `/leagues/elementary/schedule` | *(text only — no separate folder)* |
| **8** | Game Results | `/leagues/elementary/results` | *(updated weekly — no folder)* |
| **9** | 3rd–6th Grade Teams | `/leagues/elementary/teams?division=3rd-6th` | See team folders below |
| **10** | 1st–2nd Grade Teams | `/leagues/elementary/teams?division=1st-2nd` | See team folders below |
| **11** | Pre-K/K Teams | `/leagues/elementary/teams?division=pre-k-k` | See team folders below |
| **12** | Sponsors | `/sponsors` | Copy from old website *(no Drive folder in PDF)* |
| **13** | Staff, Teams & Boosters | `/team` | Copy from old website *(no Drive folder in PDF)* |
| **14** | State Championship | `/state-championship` | `P-O Elementary Leagues FOLDER/Elementary Team Pictures/ PA Warhawks PICTURES` *(verify with client)* |

---

## Elementary Team Photo Folders

Place inside: `public/images/P-O Elementary Leagues FOLDER/Elementary Team Pictures/`

| Team | Sub-Folder Name |
|------|-----------------|
| Lee Industries | `Lee Industries PICTURES` |
| Nittany Energy | `Nittany Energy PICTURES` |
| Philipsburg Marble and Granite | `PHILIPSBURGMARBLE AND GRANITE PICTURES` |
| Under Pressure Pro Cleaners | `UNDER PRESSURE PRO CLEANERS PICTURES` |
| Central PA Lions (1st–2nd & Pre-K) | `CENTRAL PA LIONS PICTURES` |
| Glenn O. Hawbaker, Inc. | `Glenn O. Hawbaker, Inc. PICTURES` |
| PA Warhawks (1st–2nd) | `PA Warhawks/PICTURES` |
| PA Warhawks (Pre-K/K) | `PA Warhawks PICTURES` |

---

## Full Path Example

```
public/
  images/
    ABOUT TAB FOLDER/
      PICTURES/
        photo1.jpg
    LITTLE DRIBBLERS TAB FOLDER/
      PICTURES/
    Competition/
      Scholarship Day TAB FOLDER/
        PO Campers picture/
          Picture/
        BIG DREAMS START HERE POSTER/
        AWARD WINNERS FOLDER/
          Scholarship Winners Folder/
            PICTURES/
          5-ON-5 Folder/
            PICTURES/
          3-ON-3 Folder/
            PICTURES/
          CAMP MVP Folder/
            PICTURES/
    (OLD DRIVE NEW WEBSITE DRIVE) CENTRAL PA LIONS AAU PROGRAM FOLDER/
    P-O Elementary Leagues FOLDER/
      Action Shots/
        PICTURES And Video/
      Elementary Team Pictures/
        Lee Industries PICTURES/
        Nittany Energy PICTURES/
        ...
  videos/
    hero-basketball.mp4
```

Once folders are in place, photos will appear automatically on each tab.

---

# PDF Part 2 — Additional Tabs and Folders

See project root `MEDIA_FOLDER_GUIDE.md` sections for Awards, Special Events, Select Program tournaments/team photos, and State Championship folders. Key new routes:

- `/awards-records/league-player-awards`, `/team-championships`, `/league-all-stars`
- `/events/special-events/banquet`, `/youth-camp`, `/camps-clinic`
- `/select-program/*` (12 tabs including season-recap, tournaments, team-photos)

---

# PDF Part 3 — Elks Hoop Shoot, Meet the Mounties, Record Book

Copy each Google Drive folder **exactly as named** into `public/images/`.

| # | Website Tab | Route | Drive Folder to Copy |
|---|-------------|-------|----------------------|
| **1** | Elks Hoop Shoot (general) | `/events/elks-hoop-shoot` | `The Philipsburg Elks local Hoop Shoot contest Folder/ Picture Folder/ Pictures` |
| **1a** | Elks Hoop Shoot 2022–23 | `/events/elks-hoop-shoot` | `The Philipsburg Elks local Hoop Shoot contest Folder/ 2022-23 Folder/ Pictures` |
| **1b** | Elks Hoop Shoot 2023–24 | `/events/elks-hoop-shoot` | `The Philipsburg Elks local Hoop Shoot contest Folder/ 2023-24 Folder/ Pictures` |
| **1c** | Elks Hoop Shoot 2024–25 | `/events/elks-hoop-shoot` | `The Philipsburg Elks local Hoop Shoot contest Folder/ 2024-25 Folder/ Pictures` |
| **1d** | Elks Hoop Shoot 2025–26 | `/events/elks-hoop-shoot` | `The Philipsburg Elks local Hoop Shoot contest Folder/ 2025-26 Folder/ Pictures` |
| **2** | Meet the Mounties — Coaches | `/meet-the-mounties` | `MEET THE MOUNTIES Folder/ Coaches Folder/ Pictures` |
| **2a** | Meet the Mounties — Roster | `/meet-the-mounties` | `MEET THE MOUNTIES Folder/ Roster Folder/ Pictures` |
| **2b** | Meet the Mounties — by season | `/meet-the-mounties` | `MEET THE MOUNTIES Folder/ [SEASON] Folder/ ...` (see Drive structure per season) |
| **3** | Record Book | `/awards-records/record-book` | *(text only — statistics pending client verification)* |

## Meet the Mounties — Season Folders

Base path: `public/images/MEET THE MOUNTIES Folder/`

Each season tab on `/meet-the-mounties` uses subfolders from Drive. Examples:

| Season | Example Subfolder |
|--------|-------------------|
| 2020–21 | `2020-21 Folder/ Senior Spotlight Folder/ Pictures` |
| 2022–23 | `2022-23 Folder/ K/2nd Grade Team/ Glenn O. Hawbaker/ Team Pictures` |
| 2023–24 | `2023-24 Folder/ 3/6th Grade Team/ Nittany Energy / Team Pictures` |
| 2024–25 | `2024-25 Folder/ K/2nd Grade Team/ GLENN O. HAWBAKER/ Team Pictures` |
| 2025–26 | `2025-26 Folder/Pre-K/K Grade Team/ Central PA Lions/ Team Pictures` |

Copy the entire `MEET THE MOUNTIES Folder` from Drive into `public/images/` to populate all seasons at once.
