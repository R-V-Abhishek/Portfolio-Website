export type Collection = "ai" | "passion" | "coursework";
export interface Project {
  slug: string;
  title: string;
  summary: string;
  collection: Collection;
  topics: string[];
  technologies: string[];
  status?: string;
  order: number;
  homePlacement?: "featured" | "selected";
  repository?: string;
  demo?: string;
  detail?: string;
  figure: string;
}
const repo = (name: string) => `https://github.com/R-V-Abhishek/${name}`;
const entries: Project[] = [
  {
    slug: "expense-logger",
    title: "Expense Logger",
    summary:
      "A conversational expense tracker exploring explicit intent routing, thread memory, and a persistent ledger. Small graphs, understandable decisions.",
    collection: "ai",
    topics: ["Agentic AI", "NLP"],
    technologies: ["LangGraph", "Gemini", "Streamlit", "SQLite"],
    order: 1,
    homePlacement: "featured",
    repository: repo("Expense-Logger"),
    figure: "agent",
  },
  {
    slug: "network-intrusion-detection",
    title: "Network Intrusion Detection",
    summary:
      "A two-stage classification pipeline connecting streaming network records to attack detection and an interactive dashboard.",
    collection: "ai",
    topics: ["ML Systems"],
    technologies: ["Spark", "Kafka", "Cassandra", "Redis"],
    order: 2,
    homePlacement: "selected",
    repository: repo("network-intrusion-detection-nosql"),
    figure: "network",
  },
  {
    slug: "swarasync",
    title: "SwaraSync",
    summary:
      "A Carnatic music practice assistant that connects pitch tracking with a handcrafted raga grammar and finite-state validation.",
    collection: "ai",
    topics: ["Signal Processing"],
    technologies: ["Python", "Librosa", "pYIN", "Streamlit"],
    order: 3,
    homePlacement: "selected",
    figure: "music",
  },
  {
    slug: "plant-village",
    title: "Plant disease classification",
    summary:
      "Convolutional neural network experiments with the PlantVillage image dataset.",
    collection: "ai",
    topics: ["Computer Vision"],
    technologies: ["Python", "CNN"],
    order: 4,
    repository: repo("CNN_Plant_Village_dataset"),
    figure: "vision",
  },
  {
    slug: "rust-tokenizer",
    title: "Rust NLP tokenizer",
    summary:
      "Text cleaning, tokenization, and word counting in Rust, exposed to Python through PyO3.",
    collection: "ai",
    topics: ["NLP"],
    technologies: ["Rust", "Python", "PyO3"],
    order: 5,
    repository: repo("rust-nlp-tokenizer"),
    figure: "agent",
  },
  {
    slug: "artfolio",
    title: "ArtFolio",
    summary:
      "A place for creative people to build a professional story through portfolios, profiles, and community.",
    collection: "passion",
    topics: ["Creative software"],
    technologies: ["Flutter", "Dart", "Firebase"],
    order: 6,
    repository: repo("ArtFolio"),
    figure: "art",
  },
  {
    slug: "ca-study-companion",
    title: "CA Study Companion",
    summary:
      "A study workspace connecting syllabus coverage, revision, and historical exam intelligence. Collaborative publishing remains in development.",
    collection: "passion",
    topics: ["Learning tools"],
    technologies: ["Python", "PostgreSQL", "Auth0"],
    status: "In development",
    order: 7,
    repository: repo("CA_Study_Guide"),
    figure: "study",
  },
  {
    slug: "saffronspice",
    title: "SaffronSpice",
    summary:
      "A restaurant platform bringing menus, reservations, and ordering into one full-stack application.",
    collection: "passion",
    topics: ["Web applications"],
    technologies: ["React", "Node.js", "MongoDB"],
    order: 8,
    repository: repo("SaffronSpice"),
    figure: "spice",
  },
  {
    slug: "media-experiments",
    title: "Audio & video formatting",
    summary:
      "Image generation, audio synthesis, resampling, and command-line media experiments.",
    collection: "coursework",
    topics: ["Media systems"],
    technologies: ["Python", "JavaScript"],
    order: 9,
    repository: repo("AMAGI_Course-VideoAndAudioFormatting"),
    figure: "music",
  },
  {
    slug: "aqi",
    title: "Air quality prediction",
    summary:
      "Preprocessing, exploratory analysis, and regression and classification model comparisons.",
    collection: "coursework",
    topics: ["Machine learning"],
    technologies: ["Python"],
    order: 10,
    repository: repo("AQI-Prediction-and-Health-Classification"),
    figure: "network",
  },
  {
    slug: "titanic",
    title: "Titanic dataset EDA",
    summary:
      "Cleaning, visualization, and analysis of passenger survival patterns.",
    collection: "coursework",
    topics: ["Data analysis"],
    technologies: ["Pandas", "Seaborn"],
    order: 11,
    repository: repo("Titanic-Dataset-EDA"),
    figure: "network",
  },
  {
    slug: "restaking",
    title: "EigenLayer restaking API",
    summary:
      "An Express API for restaker delegations, validator information, and aggregated rewards.",
    collection: "coursework",
    topics: ["Backend systems"],
    technologies: ["Node.js", "Express", "MongoDB"],
    order: 12,
    repository: repo("eigen-restaking-api"),
    figure: "agent",
  },
  {
    slug: "atm",
    title: "An ATM, parsed",
    summary:
      "A Flex and Bison exercise in lexical analysis, parsing, and session management.",
    collection: "coursework",
    topics: ["Compilers"],
    technologies: ["Flex", "Bison"],
    order: 13,
    repository: repo("atm_project"),
    figure: "study",
  },
];
export const topics = [
  "All",
  "Computer Vision",
  "NLP",
  "Agentic AI",
  "ML Systems",
  "Signal Processing",
];
export const collectionNames = {
  ai: "AI & ML",
  passion: "Passion Projects",
  coursework: "Coursework & Explorations",
};

export const projects = entries.sort((a, b) => a.order - b.order);
