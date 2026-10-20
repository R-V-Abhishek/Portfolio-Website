export const SITE = {
  owner: "R V Abhishek",
  shortName: "RVA",
  email: "rvabhi2504@gmail.com",
  github: "https://github.com/R-V-Abhishek",
  linkedin: "https://www.linkedin.com/in/r-v-abhishek",
  location: "Bengaluru, India",
  role: "Data Science Intern",
  organization: "Amagi",
  education: [
    {
      name: "BMS College of Engineering",
      dates: "2023–2027",
      qualification: "Computer Science Engineering & Data Science",
      result: "CGPA · 9.67",
    },
    {
      name: "SKCH PU College",
      dates: "2021–2023",
      qualification: "Pre-University · PCMC",
      result: "99%",
    },
  ],
} as const;
/** Resolve every internal link against the configured GitHub Pages base. */
export const url = (path = "") =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
