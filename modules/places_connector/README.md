# Places Connector

The Places Connector provides an abstraction layer over external place search
providers (e.g. Google Places, Naver, Kakao).

It allows Kori to:
- remain provider-agnostic
- switch APIs without touching core logic
- test locally using mock data
- respect regional differences (Korea vs global)

This module is intentionally simple in v1.

## Responsibilities
- Accept a free-text query (usually from hashtag extraction)
- Return normalized place candidates
- Do NOT decide which place is correct (user confirmation does that)

## Non-responsibilities
- No ranking beyond provider order
- No caching (handled upstream later)
- No write access to business pages
- No enrichment (photos, hours, menus come later)

## Why this abstraction exists
External APIs change frequently and have regional bias.
By isolating them here, Kori protects its core system logic.

## Expected Consumers
- hashtag_engine
- business_page creation flow
- future search & discovery features

## Implementations
- MockPlacesConnector (v1)
- GooglePlacesConnector (v1.5)
- Naver/Kakao (planned, Korea-specific)

See also:
- modules/hashtag_engine
- docs/01_ai_asset_engine.md
