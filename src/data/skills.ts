export interface Skill {
	name: string;
	level?: 'learning' | 'proficient' | 'advanced';
}

export interface SkillCategory {
	title: string;
	icon: string;
	color: string;
	skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
	{
		title: "Programming Languages",
		icon: "💻",
		color: "var(--primary-color)",
		skills: [
			{ name: "Python",     level: "advanced"   },
			{ name: "JavaScript", level: "proficient" },
			{ name: "TypeScript", level: "proficient" },
			{ name: "SQL",        level: "proficient" },
			{ name: "R",          level: "learning"   },
			{ name: "Java",       level: "learning"   },
		]
	},
	{
		title: "Data Science & ML",
		icon: "📊",
		color: "var(--secondary-color)",
		skills: [
			{ name: "Pandas",       level: "advanced"   },
			{ name: "NumPy",        level: "proficient" },
			{ name: "Scikit-learn", level: "proficient" },
			{ name: "Matplotlib",   level: "proficient" },
			{ name: "Seaborn",      level: "proficient" },
			{ name: "LLMs",         level: "learning"   },
			{ name: "Deep Learning",level: "learning"   },
		]
	},
	{
		title: "Web Development",
		icon: "🌐",
		color: "var(--accent-color)",
		skills: [
			{ name: "React.js",  level: "proficient" },
			{ name: "Node.js",   level: "proficient" },
			{ name: "Express",   level: "proficient" },
			{ name: "REST APIs", level: "advanced"   },
			{ name: "HTML/CSS",  level: "advanced"   },
		]
	},
	{
		title: "Databases",
		icon: "🗄️",
		color: "var(--highlight-color)",
		skills: [
			{ name: "MongoDB Atlas", level: "proficient" },
			{ name: "MySQL",         level: "proficient" },
		]
	},
	{
		title: "Tools & Platforms",
		icon: "🛠️",
		color: "var(--primary-light)",
		skills: [
			{ name: "Git",            level: "advanced"   },
			{ name: "GitHub",         level: "advanced"   },
			{ name: "VSCode",         level: "advanced"   },
			{ name: "Vercel",         level: "proficient" },
			{ name: "Render",         level: "proficient" },
			{ name: "AWS",            level: "learning"   },
			{ name: "Figma",          level: "learning"   },
		]
	}
];
