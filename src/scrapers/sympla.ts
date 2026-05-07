import { BaseScraper, ScrapedEvent } from "./index";

const JAZZ_QUERY_TERMS = [
  "jazz belo horizonte",
  "jazz BH",
  "blues BH",
  "bossa nova BH",
  "big band BH",
  "jam session BH",
];

export class SympLaScraper extends BaseScraper {
  name = "Sympla";

  async scrape(): Promise<ScrapedEvent[]> {
    const events: ScrapedEvent[] = [];

    for (const term of JAZZ_QUERY_TERMS) {
      try {
        const encoded = encodeURIComponent(term);
        const url = `https://www.sympla.com.br/busca?q=${encoded}&state=MG&city=Belo+Horizonte`;

        const res = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; JazzBHBot/1.0; +https://jazzem.bh)",
            Accept: "text/html",
          },
          signal: AbortSignal.timeout(10000),
        });

        if (!res.ok) continue;

        // In a real implementation, parse the HTML with cheerio
        // For now, this is a structural placeholder
        // const html = await res.text()
        // const $ = cheerio.load(html)
        // Parse event cards...

      } catch {
        // Silently skip failed queries
      }
    }

    return events;
  }
}
