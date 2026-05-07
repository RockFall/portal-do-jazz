const JAZZ_KEYWORDS = [
  "jazz",
  "blues",
  "bossa nova",
  "bossanova",
  "swing",
  "bebop",
  "be-bop",
  "fusion",
  "improviso",
  "improvisação",
  "jam session",
  "big band",
  "quarteto",
  "quinteto",
  "trio de jazz",
  "piano trio",
  "contrabaixo",
  "sax",
  "saxofone",
  "trompete",
  "trombone",
  "clarinete",
  "música instrumental",
  "música ao vivo",
  "standard",
  "hard bop",
  "cool jazz",
  "free jazz",
  "latin jazz",
  "jazz brasileiro",
];

const STRONG_KEYWORDS = ["jazz", "blues", "bossa nova", "big band", "bebop", "jam session"];

export interface ClassificationResult {
  isJazz: boolean;
  confidence: number;
  foundKeywords: string[];
}

export function classifyJazz(text: string): ClassificationResult {
  const normalized = text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const foundKeywords: string[] = [];
  let score = 0;

  for (const kw of JAZZ_KEYWORDS) {
    const kwNorm = kw.normalize("NFD").replace(/[̀-ͯ]/g, "");
    if (normalized.includes(kwNorm)) {
      foundKeywords.push(kw);
      score += STRONG_KEYWORDS.includes(kw) ? 30 : 15;
    }
  }

  const confidence = Math.min(score, 100);
  const isJazz = confidence >= 20;

  return { isJazz, confidence, foundKeywords };
}

export function scoreEventData(data: {
  hasDate: boolean;
  hasVenue: boolean;
  hasArtist: boolean;
  hasPrice: boolean;
  isKnownVenue: boolean;
  jazzConfidence: number;
}): number {
  let score = data.jazzConfidence;

  if (data.hasDate) score += 30;
  else score -= 30;

  if (data.hasVenue) score += 20;
  else score -= 40;

  if (data.isKnownVenue) score += 10;
  if (data.hasArtist) score += 10;
  if (data.hasPrice) score += 10;

  return Math.max(0, Math.min(100, score));
}
