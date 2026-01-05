/**
 * Hashtag Engine (v1)
 * ------------------
 * Purpose:
 * Detect hashtag usage in chat and initiate place creation flow.
 */

export type HashtagDetectionResult = {
  hashtag: string;
  startIndex: number;
  endIndex: number;
};

export type PlaceCandidate = {
  provider: "google" | "naver" | "kakao" | "mock";
  placeId: string;
  name: string;
  address?: string;
  lat?: number;
  lng?: number;
};

export interface PlacesConnector {
  textSearch(query: string): Promise<PlaceCandidate[]>;
}

export interface HashtagEngineConfig {
  maxCandidates: number;
  allowedPrefix: string; // default "#"
}

export class HashtagEngine {
  private config: HashtagEngineConfig;
  private places: PlacesConnector;

  constructor(config: HashtagEngineConfig, placesConnector: PlacesConnector) {
    this.config = config;
    this.places = placesConnector;
  }

  /**
   * Step 1: Detect hashtag in a chat message
   */
  detectHashtag(message: string): HashtagDetectionResult | null {
    const prefix = this.config.allowedPrefix;
    const regex = new RegExp(`${prefix}([a-zA-Z0-9_\\-]+)`);
    const match = message.match(regex);

    if (!match || !match.index) return null;

    return {
      hashtag: match[1],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    };
  }

  /**
   * Step 2: Resolve hashtag into place candidates
   */
  async resolveHashtag(hashtag: string): Promise<PlaceCandidate[]> {
    const results = await this.places.textSearch(hashtag);
    return results.slice(0, this.config.maxCandidates);
  }

  /**
   * Step 3: Entry point — process a chat message
   */
  async processMessage(message: string): Promise<{
    detected: boolean;
    candidates?: PlaceCandidate[];
  }> {
    const detection = this.detectHashtag(message);

    if (!detection) {
      return { detected: false };
    }

    const candidates = await this.resolveHashtag(detection.hashtag);

    return {
      detected: true,
      candidates,
    };
  }
}

/**
 * Example usage:
 *
 * const engine = new HashtagEngine(
 *   { maxCandidates: 3, allowedPrefix: "#" },
 *   new GooglePlacesConnector()
 * );
 *
 * const result = await engine.processMessage(
 *   "Try #kkanbujongno tonight"
 * );
 */
