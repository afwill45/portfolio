interface WorkListItem {
  title: string;
  description: string;
  blurb: string;
  year: string;
  category: string;
  url: string;
  new: boolean;
  wip: boolean;
}

export const works: WorkListItem[] = [
  {
    title: "battleship",
    description: "Battleship AI program",
    blurb: "Battleship AI gameplay",
    year: "2024",
    category: "code ",
    url: "works/battleship",
    new: false,
    wip: true,
  },
  {
    title: "ai",
    description: "AI Comparison Tool",
    blurb: "AI eval heuristic",
    year: "2024",
    category: "code ",
    url: "",
    new: false,
    wip: true,
  },
  {
    title: "tetris",
    description: "Tetris AI program",
    blurb: "Tetris machine learning",
    year: "2024",
    category: "code ",
    url: "",
    new: false,
    wip: true,
  },
  {
    title: "poll",
    description: "Hackathon proof of concept",
    blurb: "Voter wait time program",
    year: "2023",
    category: "code ",
    url: "",
    new: false,
    wip: true,
  },
  {
    title: "3ds",
    description: "Hacking 3ds",
    blurb: "Hacking 3ds",
    year: "2024",
    category: "code personal ",
    url: "",
    new: true,
    wip: true,
  },
  {
    title: "concert",
    description: "Concerts Attended",
    blurb: "Concerts in Boston",
    year: "2022-",
    category: "personal ",
    url: "",
    new: false,
    wip: true,
  },
  {
    title: "genius",
    description: "Genius shortcut for ios",
    blurb: "Genius music shortcut",
    year: "2021",
    category: "code personal",
    url: "",
    new: false,
    wip: true,
  },
  {
    title: "duolingo",
    description: "Duolingo Thrive Figma Design",
    blurb: "Duolingo figma",
    year: "2023",
    category: "design",
    url: "https://www.figma.com/proto/9CS259QWD3IQ12MSGcsOZI/INTERN_THRIVE-Duolingo-Product-Design-Challenge-2023-%5BWORKING-FILE%5D?node-id=6-103&starting-point-node-id=6%3A103",
    new: false,
    wip: false,
  },
  {
    title: "personas",
    description: "collection of my in-game characters",
    blurb: "in-game personas",
    year: "2024",
    category: "design art",
    url: "/personas",
    new: false,
    wip: false,
  },
  // {
  //  title: "misc.",
  //  description: "miscellaneous design / art pieces",
  //  blurb: "misc. design / art",
  //  year: "2016–",
  //  category: "design art",
  //  url: "/works/misc",
  //  new: false,
  //  wip: false,
  // },
];
