export interface Experience {
	title: string;
	organization: string;
	location: string;
	description: string;
	duration: string;
	icon: string;
}

export interface Certification {
	name: string;
	issuer: string;
	date: string;
	icon: string;
	status?: 'completed' | 'in-progress';
	/** Paste your personal credential verification URL here (from Coursera/NPTEL profile) */
	credentialUrl?: string;
}

export const experiences: Experience[] = [
	{
		title: "Club Coordinator",
		organization: "Ninaad - Indian Music Club",
		location: "BMS College of Engineering",
		description: "Leading the Indian music club, organizing events and competitions, managing performances and coordinating with various stakeholders to promote Indian classical music culture on campus.",
		duration: "August 2025-Present",
		icon: "🎵"
	},
	{
		title: "Design Department Member",
		organization: "DSYNC - Data Science Club",
		location: "BMS College of Engineering",
		description: "Key member specializing in creation of digital assets and event branding for major BMSCE events, combining technical knowledge with creative design skills.",
		duration: "2024-2025",
		icon: "🎨"
	}
];

export const certifications: Certification[] = [
	{
		name: "IBM Exploratory Data Analysis Course",
		issuer: "Coursera",
		date: "July 2025",
		icon: "📊",
		status: "completed",
		// credentialUrl: "https://coursera.org/verify/YOUR_ID",
	},
	{
		name: "Introduction to Large Language Models",
		issuer: "NPTEL (IIT New Delhi)",
		date: "August 2025",
		icon: "🤖",
		status: "completed",
		// credentialUrl: "https://nptel.ac.in/noc/Ecertificate/?q=YOUR_ID",
	},
	{
		name: "HTML + CSS in Depth",
		issuer: "Meta (Coursera)",
		date: "July 2024",
		icon: "💻",
		status: "completed",
		// credentialUrl: "https://coursera.org/verify/YOUR_ID",
	}
];
