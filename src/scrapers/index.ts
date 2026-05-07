import { classifyJazz, scoreEventData } from "./classifier";

export interface ScrapedEvent {
  title: string;
  description?: string;
  startsAt: Date;
  endsAt?: Date;
  venueName: string;
  venueAddress?: string;
  neighborhood?: string;
  priceMin?: number;
  priceMax?: number;
  ticketUrl?: string;
  sourceUrl: string;
  sourceType: "website" | "instagram" | "news" | "manual" | "api";
  confidence: number;
  rawText?: string;
}

export interface ScraperResult {
  scraperName: string;
  events: ScrapedEvent[];
  errors: string[];
  scrapedAt: Date;
}

export abstract class BaseScraper {
  abstract name: string;

  abstract scrape(): Promise<ScrapedEvent[]>;

  protected calculateConfidence(
    event: Partial<ScrapedEvent> & { rawText?: string }
  ): number {
    const jazzResult = classifyJazz(
      `${event.title ?? ""} ${event.description ?? ""} ${event.rawText ?? ""}`
    );

    return scoreEventData({
      hasDate: !!event.startsAt,
      hasVenue: !!event.venueName,
      hasArtist: false,
      hasPrice: event.priceMin !== undefined,
      isKnownVenue: false,
      jazzConfidence: jazzResult.confidence,
    });
  }

  async run(): Promise<ScraperResult> {
    const errors: string[] = [];
    let events: ScrapedEvent[] = [];

    try {
      events = await this.scrape();
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }

    return {
      scraperName: this.name,
      events,
      errors,
      scrapedAt: new Date(),
    };
  }
}

export { classifyJazz, scoreEventData };
