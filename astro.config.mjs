// @ts-check

import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://rvabhishek.dev',
	output: 'static',
	integrations: [
		react(),
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/404'),
		}),
	],
});
