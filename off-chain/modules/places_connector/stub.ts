/**
 * Places Connector (v1)
 * --------------------
 * Abstracts external place search providers.
 */

export type PlaceCandidate = {
  provider: "google" | "naver" | "kakao" | "mock";
  placeId: string;
  name: string;
  address?: string;
  lat?: number;
  lng?: number;
};

export interface PlacesConnector {
  /**
   * Perform a free-text place search.
   * The query typically originates from hashtag extraction.
   */
  textSearch(query: string): Promise<PlaceCandidate[]>;
}

/**
 * Mock implementation for local testing and demos.
 */
export class MockPlacesConnector implements PlacesConnector {
  async textSearch(query: string): Promise<PlaceCandidate[]> {
    return [
      {
        provider: "mock",
        placeId: `mock-${query.toLowerCase()}`,
        name: `${query} (Mock Place)`,
        address: "Seoul, South Korea",
        lat: 37.5665,
        lng: 126.9780,
      },
    ];
  }
}

/**
 * Placeholder for Google Places API implementation.
 * Real implementation should live in a separate file
 * and handle API keys, quotas, and error normalization.
 */
export class GooglePlacesConnector implements PlacesConnector {
  async textSearch(_query: string): Promise<PlaceCandidate[]> {
    throw new Error("GooglePlacesConnector not implemented yet.");
  }
}
