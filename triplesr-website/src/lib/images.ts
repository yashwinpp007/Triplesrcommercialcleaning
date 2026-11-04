import manifest from "@/content/images.json";

type Img = { slug: string; width: number; height: number; alt: string };
const bySlug = new Map((manifest as Img[]).map((i) => [i.slug, i]));

export function img(slug: string) {
  const i = bySlug.get(slug);
  if (!i) throw new Error(`Unknown image slug: ${slug}`);
  return { src: `/images/${i.slug}.webp`, width: i.width, height: i.height, alt: i.alt };
}

export const allImages = manifest as Img[];
