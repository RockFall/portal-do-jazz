import { BaseScraper, ScrapedEvent } from "./index";
import { classifyJazz } from "./classifier";

const SEARCH_QUERIES = [
  "show jazz belo horizonte",
  "jazz ao vivo BH próximo show",
  "jazz BH agenda semana",
  "blues bossa nova show BH",
  "jam session belo horizonte",
];

interface SerpApiResult {
  organic_results?: Array<{
    title: string;
    snippet: string;
    link: string;
    date?: string;
  }>;
}

export class GoogleSearchScraper extends BaseScraper {
  name = "GoogleSearch";

  private apiKey = process.env.SERPAPI_KEY ?? "";

  async scrape(): Promise<ScrapedEvent[]> {
    if (!this.apiKey) {
      console.warn("[GoogleSearch] SERPAPI_KEY not set, skipping.");
      return [];
    }

    const events: ScrapedEvent[] = [];

    for (const query of SEARCH_QUERIES) {
      try {
        const url = new URL("https://serpapi.com/search");
        url.searchParams.set("q", query);
        url.searchParams.set("hl", "pt");
        url.searchParams.set("gl", "br");
        url.searchParams.set("api_key", this.apiKey);

        const res = await fetch(url.toString(), { signal: AbortSignal.timeout(15000) });
        if (!res.ok) continue;

        const data = (await res.json()) as SerpApiResult;
        const results = data.organic_results ?? [];

        for (const result of results) {
          const text = `${result.title} ${result.snippet}`;
          const classification = classifyJazz(text);

          if (classification.isJazz) {
            events.push({
              title: result.title,
              description: result.snippet,
              startsAt: new Date(),
              venueName: "A confirmar",
              sourceUrl: result.link,
              sourceType: "news",
              confidence: classification.confidence,
              rawText: text,
            });
          }
        }
      } catch {
        // Skip failed queries
      }
    }

    return events;
  }
}
