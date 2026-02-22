export interface Project {
	title: string;
	description: string;
	tech: string[];
	liveLink?: string;
	githubLink?: string;
	status: 'deployed' | 'completed' | 'in-progress';
	featured: boolean;
	category: 'full-stack' | 'data-science' | 'backend' | 'other';
}

export const projects: Project[] = [
	{
		title: "SaffronSpice",
		description: "A full-stack restaurant management application built with the MERN stack, featuring user authentication, reservations, cart functionality, and a complete ordering system.",
		tech: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
		liveLink: "https://saffron-spice-restaurant-git-main-r-v-abhisheks-projects.vercel.app/",
		githubLink: "https://github.com/R-V-Abhishek/SaffronSpice",
		status: "deployed",
		featured: true,
		category: "full-stack",
	},
	{
		title: "GST Automation",
		description: "Python automation toolkit for processing GST reports from Tally ERP exports with interactive directory selection, multi-rate GST handling, and B2B/B2C classification.",
		tech: ["Python", "Pandas", "Data Processing", "Automation"],
		githubLink: "https://github.com/R-V-Abhishek/GST-Automation",
		status: "completed",
		featured: true,
		category: "data-science",
	},
	{
		title: "EigenLayer Restaking API",
		description: "Backend API service that simulates/exposes restaking data related to EigenLayer protocol, providing endpoints for validator info, delegations, and aggregated rewards.",
		tech: ["Node.js", "Express", "REST APIs", "Blockchain"],
		githubLink: "https://github.com/R-V-Abhishek/eigen-restaking-api",
		status: "completed",
		featured: true,
		category: "backend",
	},
	{
		title: "Titanic Dataset EDA",
		description: "Comprehensive exploratory data analysis of the classic Titanic dataset, featuring data cleaning, visualization, and survival factor analysis using Python and statistical methods.",
		tech: ["Python", "Pandas", "Seaborn", "Matplotlib", "Data Analysis"],
		githubLink: "https://github.com/R-V-Abhishek/Titanic-Dataset-EDA",
		status: "completed",
		featured: false,
		category: "data-science",
	}
];

export const featuredProjects = projects.filter(p => p.featured);
