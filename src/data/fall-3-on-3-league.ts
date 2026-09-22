export type Fall3On3Team = {
  id: string;
  name: string;
  color: string;
  players: string[];
};

export type Fall3On3Game = {
  id: string;
  label: string;
  matchup: string;
  court: string;
  time: string;
};

export const fall3On3League = {
  title: "3-on-3 P-O Fall Basketball League",
  heroSubtitle:
    "6-week Sunday league at Philipsburg-Osceola Middle School — grades 3rd–12th, boys & girls.",
  flyerImage: "/images/leagues/3-on-3-fall-league-flyer.jpg",
  /** Set when league video is uploaded to public/videos/ */
  videoSrc: null as string | null,

  parentMessage: `Tomorrow will start our 3-on-3 League. Please be there at 11:45am to pick up your T-shirt to play at the MS. We will pull the bleachers out for parents to sit. There will be a small door fee to pay to help with the custodial costs the school requires us to have.

We will have a food booth with cool drinks, candy, chips and toys for sale. We will have something for everyone to eat and drink.

Here is a look at the teams.`,

  teams: [
    { id: "red", name: "Team #1", color: "Red Team", players: ["Grayson", "Oliver", "Jace", "Joey"] },
    { id: "blue", name: "Team #2", color: "Blue Team", players: ["Sebastian", "Aiden", "Colton"] },
    { id: "white", name: "Team #3", color: "White Team", players: ["Leo", "Santino", "Tristan"] },
    { id: "pink", name: "Team #4", color: "Pink Team", players: ["Willow", "Gunnar", "Samai"] },
  ] satisfies Fall3On3Team[],

  dates: "September 5th – October 10th",
  location: {
    name: "Philipsburg-Osceola Middle School (Indoor)",
    address: "200 Short St, Philipsburg, PA 16866",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=200+Short+Street,+Philipsburg,+PA+16866",
  },

  scheduleHighlights: [
    { label: "Games start", time: "12:00 PM" },
    { label: "Team check-in", time: "12:00 PM (arrive by 11:45 AM for T-shirts)" },
    { label: "Games per week", time: "4 game guarantee" },
  ],

  games: [
    {
      id: "g1-c1",
      label: "Game #1",
      matchup: "Team Red vs Team Blue",
      court: "Court 1",
      time: "12:00 PM – 12:20 PM",
    },
    {
      id: "g1-c2",
      label: "Game #1",
      matchup: "Team White vs Team Pink",
      court: "Court 2",
      time: "12:00 PM – 12:20 PM",
    },
    {
      id: "g2-c2",
      label: "Game #2",
      matchup: "Team Blue vs Team Pink",
      court: "Court 2",
      time: "12:25 PM – 12:45 PM",
    },
    {
      id: "g2-c1",
      label: "Game #2",
      matchup: "Team Red vs Team White",
      court: "Court 1",
      time: "12:25 PM – 12:45 PM",
    },
    {
      id: "g3-c2",
      label: "Game #3",
      matchup: "Team Red vs Team Blue",
      court: "Court 2",
      time: "12:50 PM – 1:10 PM",
    },
    {
      id: "g3-c1",
      label: "Game #3",
      matchup: "Team White vs Team Pink",
      court: "Court 1",
      time: "12:50 PM – 1:10 PM",
    },
    {
      id: "g4-c1",
      label: "Game #4",
      matchup: "Team Blue vs Team Pink",
      court: "Court 1",
      time: "1:15 PM – 1:35 PM",
    },
    {
      id: "g4-c2",
      label: "Game #4",
      matchup: "Team Red vs Team White",
      court: "Court 2",
      time: "1:15 PM – 1:35 PM",
    },
  ] satisfies Fall3On3Game[],

  rules: [
    "Age Groups: All will play in one division",
    "Boys & girls",
    "4 players max per team",
    "Standard 10' basket height",
    "20-minute running games — first to 20 points wins",
    "2 points inside the arc, 3 points outside",
    "Fouls = 1 free throw (worth 2–3 points depending on shot)",
    "Sudden death or shoot-off for ties",
    "2 timeouts per game",
    "Intentional stalling = technical foul + possession",
    "PIAA & NFHS rules apply (no fouling out); shoot 2 free throws at 7 fouls",
  ],

  band: {
    title: "3 On 3 Band Page",
    description:
      "All pictures and information will be posted on the 3 on 3 Band page. Please join using the link below on your smartphone or desktop.",
    url: "https://band.us/n/a6aeb0A8ucG6s",
  },

  liveStream: {
    title: "NFHS Network — Live Stream",
    description: "All games will be live-streamed. Watch online using the link below.",
    url: "https://www.nfhsnetwork.com",
  },

  flyerDetails: {
    weeks: "6-week league",
    when: "Sundays at the MS, 12 PM – 4 PM",
    grades: "Girls & boys, 3rd – 12th grade",
    divisions: "Elementary • Jr High • High School (if numbers allow)",
    earlyBird: "Early bird: $20/player • $80/team (ends Aug 1)",
    regular: "Regular: $30/player • $120/team (deadline Aug 15)",
    shirts: "Each team receives a 3-on-3 league T-shirt",
    takeaway:
      "3-on-3 accelerates skill development because every player gets more touches, more decisions, and more responsibility.",
  },
};
