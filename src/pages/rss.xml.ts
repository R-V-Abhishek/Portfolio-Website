import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE, url } from "../data/config";
export async function GET(context: { site: URL }) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
  return rss({
    title: `${SITE.owner} — Writing & notes`,
    description:
      "Notes on data science, machine learning, and useful software.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: url(`blog/${post.slug}/`),
    })),
    customData: "<language>en-us</language>",
  });
}
