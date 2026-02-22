export interface SkillCategory {
	title: string;
	icon: string;
	color: string;
	skills: string[];
}

export const skillCategories: SkillCategory[] = [
	{
		title: "Programming Languages",
		icon: "💻",
		color: "#a78bfa",
		skills: ["Python", "JavaScript", "SQL", "R", "Java"]
	},
	{
		title: "Data Science & ML",
		icon: "📊",
		color: "#22d3ee",
		skills: ["Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "LLMs", "Deep Learning"]
	},
	{
		title: "Web Development",
		icon: "🌐",
		color: "#f472b6",
		skills: ["React.js", "Node.js", "Express", "REST APIs", "HTML/CSS"]
	},
	{
		title: "Databases",
		icon: "🗄️",
		color: "#818cf8",
		skills: ["MongoDB Atlas", "MySQL"]
	},
	{
		title: "Tools & Platforms",
		icon: "🛠️",
		color: "#c4b5fd",
		skills: ["Git", "GitHub", "VSCode", "Vercel", "Render", "Figma", "Android Studio"]
	}
];
