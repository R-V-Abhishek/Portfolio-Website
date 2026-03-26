import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../data/config';

export async function GET(context: { site: URL }) {
	const posts = await getCollection('blog', ({ data }) => data.draft !== true);

	const sorted = posts.sort(
		(a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf()
	);

	return rss({
		title:       `${SITE.owner} — Blog`,
		description: 'Thoughts on data science, machine learning, web development, and building things.',
		site:        context.site,
		items: sorted.map(post => ({
			title:       post.data.title,
			pubDate:     post.data.publishDate,
			description: post.data.description,
			link:        `/blog/${post.slug}/`,
		})),
		customData: `<language>en-us</language>`,
	});
}
