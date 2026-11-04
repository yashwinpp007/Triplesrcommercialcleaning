import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Crawler policy: welcome search engines and AI assistants so the business can be found and cited.
// Private/utility paths stay off-limits to everyone.
const disallow = ["/api/", "/thank-you"];

const searchEngines = ["Googlebot", "Googlebot-Image", "Bingbot", "Applebot", "DuckDuckBot", "YandexBot", "Baiduspider", "Slurp"];

const aiCrawlers = [
  // OpenAI (ChatGPT training, search and user-initiated browsing)
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  // Anthropic (Claude)
  "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai", "Claude-Web",
  // Perplexity
  "PerplexityBot", "Perplexity-User",
  // Google (Gemini / AI training controls) and Apple (Apple Intelligence)
  "Google-Extended", "Applebot-Extended",
  // Microsoft, Amazon, Meta, DuckDuckGo, You.com, Mistral, Cohere, Common Crawl and others
  "Bingbot", "Amazonbot", "Meta-ExternalAgent", "Meta-ExternalFetcher", "FacebookBot",
  "DuckAssistBot", "YouBot", "MistralAI-User", "cohere-ai", "cohere-training-data-crawler",
  "CCBot", "Diffbot", "Timpibot", "Bytespider", "PetalBot", "ImagesiftBot", "Omgilibot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: Array.from(new Set([...searchEngines, ...aiCrawlers])), allow: "/", disallow },
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
