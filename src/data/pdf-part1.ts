import { mediaFolders } from "@/config/media-folders";

export const youthCampTabs = [
  { id: "overview", label: "Summer Camp" },
  { id: "scholarship-day", label: "Competition/Scholarship Day" },
  { id: "scholarship-winners", label: "Scholarship Winners" },
  { id: "five-on-five", label: "5-on-5 Winners" },
  { id: "three-on-three", label: "3-on-3 Winners" },
  { id: "camp-mvp", label: "Camp MVP" },
] as const;

export const youthCampContent = {
  season2027: {
    title: "PO Summer Basketball Camp",
    dates: "June, 2027",
    status: "More information coming soon.",
  },
  archive2025: {
    title: "2025 Summer Camp (Archive)",
    note: "The content below is from the 2025 camp season and is archived. Early-bird registration for 2025 is no longer active.",
    dates: "June 2nd–6th @ 8am–12pm",
    altDates: "June 9–12 & June 16–19, 8 AM – 4 PM",
    location: "Philipsburg-Osceola HS School",
    eligibility: "Athletes entering grades 2nd – 12th, Boys & Girls",
    pricing: [
      "$60.00 (1 student-athlete before May 9th, 2025)",
      "$80.00 (1 student-athlete after May 9th, 2025)",
      "$120.00 (2 student-athletes)",
      "$150.00 (3 student-athletes)",
    ],
    features: [
      "Skills & drills",
      "Weekly games & tournaments",
      "MVP & awards",
      "Team challenges & prizes",
      "High-energy vibes all summer long",
    ],
    dailyAwards: [
      "Camper of the Day from each age group",
      "Campers of the Week earn medals, $10 Meadows Gift Card, FREE Gym Rat Training Pass, and social shoutout",
    ],
    themedDays: [
      "Day 1 – Wear your favorite Jersey",
      "Day 2 – Mismatch Shoes & Socks Day",
      "Day 3 – Twin Day (find a buddy and match up!)",
      "Day 4 – Camp T-Shirt Day (shirts will be provided)",
    ],
    registrationNote: "2025 registration links archived — contact mountiesyouthbasketball@gmail.com for current camp information.",
  },
  scholarshipDay: {
    title: "Competition/Scholarship Day Recap",
    content: `Competition/Scholarship Day — one of the absolute best theme days of our camp — did not disappoint. A huge thank‑you to Coach Tyler Bardo of Central Mountain and Juniata College for providing our players with the opportunity to attend their basketball day camp. Coach Bardo was generous enough to allow us to use their Scholarship Day event format, and it made a tremendous impact on our kids.

Three campers earned a full scholarship to a hoops camp of their choice by consistently demonstrating our program's pillars throughout the week. Their example allowed us to pay it forward and expand our reach in a meaningful way.

In addition, our program awarded several donated gifts to campers who also embodied our pillars all week long. Congratulations to all of our winners — your effort, attitude, and consistency stood out.

The P‑O Youth Camp was a tremendous success. Thank you to our Booster Club and our Administration for the support that makes weeks like this possible. Thank you to my coaching staff — you are truly amazing. Thank you to trainer Chelsea for keeping our athletes safe and ready, and to our Varsity players who stepped up and served as leaders all week.

And finally, thank you to all the parents for trusting us with your children. We genuinely enjoyed coaching them and watching them grow.`,
    mediaFolders: {
      campers: mediaFolders.youthCamp.campers,
      poster: mediaFolders.scholarshipDay.poster,
    },
  },
  awardFolders: mediaFolders.awardWinners,
};

export const scholarshipWinnersPdf = {
  intro:
    "Three campers earned a full scholarship to a hoops camp of their choice by consistently demonstrating our program's pillars — Attitude & Effort — throughout the week. Congratulations to our scholarship winners!",
};

export const campsClinicsPdf = {
  camps: `Structured training program to improve a players skills, learn game strategies and develop teamwork. PO Little Mounties has a one week camp each summer (The 1st Week in June). Typically Monday through Friday from 8:00am until Noon.`,
  clinics: `A short, focused training session to help players develop skills, techniques and/or concepts. To focus on specific skill sets to develop a player for seasonal competition. PO Little Mounties offers a clinic in the fall and it's approximately 4 hours in length.`,
};

export const littleDribblersPdf = {
  season2027: "2027 Information coming soon.",
  season2026: {
    dates: "September: 5th, 12th, October: 3rd, 17th, 24th",
    time: "11:30am - 12:30pm",
    location: "Philipsburg-Osceola Middle School",
    description: `Five Saturdays beginning in September until the start of the Mounties Youth Basketball season in November. Student-athletes in grades K-2nd will be able to work on the fundamentals of basketball. Instruction will be provided by coaches from the Mounties Youth Basketball program. The open gyms are FREE to participate in but the necessary paperwork needs to be completed for insurance purposes.`,
    disclaimer: `Please note that by signing up here for the open gyms DOES NOT sign you up for the regular Mounties Youth Basketball Season that begins in November.`,
    registrationLink: "https://forms.gle/gFW3ubhkzXA1A5ia6",
  },
};

export const centralPaLionsPdf = {
  about: `TJ Anderson's Central PA Lions Academy is a youth basketball program designed for student-athletes in grades K-12 to develop skills on and off of the court, and to take their game to the next level. The academy offers various opportunities for development through camps, shooting clinics, AAU and Travel teams, and programs designed specifically for student-athletes in grades K-2nd and 3rd-6th.

The academy has served student-athletes since 2011 when the program first began as the Huntingdon Cats Youth Basketball. In 2014 the academy was renamed the JV Stingers Basketball Academy Program, and finally in 2020, the academy reorganized and became TJ Anderson's Central PA Lions Academy.

Rich in coaching experiences, knowledge of the game, and community involvement, the academy is a premiere program designed to improve the student-athletes' experience and skill set.`,
  mission: `For the season, we will put a team of confident and mentally tough student-athletes on the floor of every game, that finishes the season with a .500 winning pct. or higher, that defeats opponents through superior skill and teamwork in execution of our offense and defense.`,
  travelProgram: `The Central PA Lions organization is a travel basketball program coached by USAB Gold Certified Coaching Staff. The travel teams within this program participate in high level tournaments and college showcases within Pennsylvania and surrounding states.

Student-athletes and families should expect to practice bi-weekly, have weekend workouts (optional), and participate in 5-7 high level tournaments.`,
  tryouts: {
    fall2026: {
      date: "Saturday, October 17th, 2026",
      sessions: [
        "8:00am—9:00am, Grades 3-6 (Boys)",
        "9:00am—10:30am, Grades 7-12 (Boys)",
        "11:00am—12:00pm, Grades 7-12 (Girls)",
        "12:00pm-1:00pm, Grades 3-6 (Girls)",
      ],
    },
    spring2027: {
      date: "Sunday, February 14th, 2027",
      sessions: [
        "8:00am—9:00am, Grades 3-6 (Boys)",
        "9:00am—10:30am, Grades 7-12 (Boys)",
        "11:00am—12:00pm, Grades 7-12 (Girls)",
        "12:00pm-1:00pm, Grades 3-6 (Girls)",
      ],
    },
    location: "Philipsburg-Osceola Middle School, 200 Short Street, Philipsburg, PA 16866",
    note: "Location, dates, and times are subject to change. Check website and Facebook for updates.",
  },
  payment: "Make check or money order payable to: Central PA Lions Basketball or submit payment at https://centralpalions.square.site/",
};

export const aboutPdf = `Mounties Youth Basketball is here to put in the hard work, on and off of the court and in the classroom; learn; work on our game; encourage our teammates; and to have fun! We live by our motto of "Attitude & Effort." And at the end of the day, we're FAMILY as we believe in supporting one another wholeheartedly. We're excited to have you and explore all that we have to offer for youth basketball in Central PA.

Our league is now an OFFICIAL STATE QUALIFIER LEAGUE FOR THE PENNSYLVANIA MIDDLE SCHOOL BASKETBALL CHAMPIONSHIP. We are looking for teams to join our PO SELECT LEAGUE.

If you have any questions at any time, please do not hesitate to reach out via email at mountiesyouthbasketball@gmail.com`;

export const stateChampionshipPdf = `STATE CHAMPIONSHIP GAMES

Both teams play Friday at two different locations. Game times and locations are updated on the Band Calendar. Please download the SportsEngine Tourney App to follow scores, times, and brackets.

This tournament runs like AAU. Every team gets four games, but losing early eliminates any chance at the Championship. We will coach to win, which may mean limited minutes for some players. These are the top teams in Pennsylvania.

Friday Games (One game each):
• 6th Grade vs Armstrong – 5:30 PM at Nittany Valley Sports Centre, Court 3
• 4th Grade vs Riverview – 6:35 PM at Lock Haven Zimmerli Hall, Court 2

Tickets must be purchased online before the event via EventConnect Tickets.

Coaches: Two coaches enter free. Coach TJ will coach 6th grade with Coach Kelly. Tim Mills will coach 4th grade with Caleb and Nick.

Travel: Meet at C3 in State College on Saturday. Arrive 30 minutes early.`;

export const elementaryLeaguePdf = {
  welcome: `Welcome to the P-O Elementary League! Here you will find information regarding team and schedule information for the 2026-2027 season. The season will be an 11 week Game Season and run from Nov. 2026–Feb. 2027.`,
  sections: [
    {
      id: "pre-k-k",
      title: "Pre-K & K",
      content: `The Pre-K-K Program will be an 11 Week Program to introduce the concepts and fundamentals of basketball. All practices and games will be held at the Philipsburg Jr High School.`,
    },
    {
      id: "1st-2nd",
      title: "1st–2nd Grade",
      content: `Practices: Pre-K-2nd Grade (JR High) will mostly practice and play on Sundays at the Middle School. There maybe a few practices at PE but mostly they will be at the MS.

There was 6 teams last season. They will play each other once each week. The coaches will send out information on practice times and game times.

The games will be Live Streamed as well. You will need to buy a subscription for the NFHS System. If you already have an account with them from watching other HS Teams online, you will not need another one.

There will not be a Select Team for this age group and they will not travel to play other schools or teams. This is strictly for their development and for them to have fun.

Food Booth: The boosters will be running a good food booth with snacks and drinks each week. WORKING IN THE CONCESSION STAND IS A REQUIREMENT FOR EACH PLAYERS HOUSEHOLD. NOT DOING SO WILL AFFECT A PLAYERS PLAYING TIME OR ASKED TO LEAVE THE PROGRAM.`,
    },
    {
      id: "3rd-6th",
      title: "3rd–6th Grade",
      content: `Practices: Will mostly have practices at OME, PE or the MS twice a week and games will be at the MS. We will also have a Select Team which will play at the YMCA, Tyrone Armory, East Hills (Johnstown) and practice at PE or MS.

The Select Teams (2nd Grade through 6th Grade) will compete at the YMCA, Tyrone Armory, East Hills (Johnstown) and at the MS. The players will be selected by their Team Coaches the first week.

Practices: Saturdays and Sundays (Twice a week until the season starts then once a week). Games are on Saturdays at the MS.

3rd/6th will have a league and the same for the Pre-K/2nd Graders. 3/4th Graders will have a Select Team.

Live Streaming: The games will be Live Streamed at our school. All the games will be at the MS.

Food Booth: There will be a Food Booth and a small fee each week to watch the players play.`,
    },
    {
      id: "cash-bash",
      title: "P-O Cash Bash (Jan 2027)",
      content: `All parents will be asked to help with this major event each season. It is a requirement that you help support, work and promote the event. Players may lose playing time or asked to leave the program, if parents chose not to support this event each year.`,
    },
    {
      id: "fundraising",
      title: "Fundraising (Opt Out Fee $200)",
      content: `All parents will be asked to help with Fundraising each season. It is a requirement that you help support, work and promote the event. Players may lose playing time or asked to leave the program, if parents chose not to support this event each year.`,
    },
    {
      id: "playoffs",
      title: "End of Season Tournaments",
      content: `P-O Elementary (Playoffs) Feb. 2026 — At the end of the P-O season we will have an all day tournament (Playoffs and Championship) for 3-6th Grade.`,
    },
    {
      id: "registration",
      title: "Registration Fees",
      content: `Pre Registration FREE (7/6/26–8/6/26) for Pre-K-K, then $1.00 (8/6/26–9/1/26). Pre Registration $45.00 (7/6/26–8/6/26) for 1st–2nd, then $55.00 (8/6/26–9/1/26). Pre Registration $70.00 (7/6/26–8/6/26) for 3rd–6th, then $80.00 (8/6/26–9/1/26).

Registration fees are due by no later than Thursday, Oct. 1st, 2026. Make check payable to Mounties Youth Basketball. Mail to: Mounties Youth Basketball, 7410 Sportsman Road, Alexandria, PA 16611.

Each fee includes USA Basketball Gold Certified Coaching Staff instruction, skill development, uniform (jersey/short set), and backpack.`,
    },
  ],
};
