# Business Page

A Business Page is the structured asset created from real user conversation.
It is Kori’s core data object: human-generated, AI-assisted, and reward-linked.

Business Pages are not manually onboarded.
They are born at the moment of intent — when a user references a place in chat.

## Creation Flow (v1)
1. User references a place via hashtag (e.g. #kkanbujongno)
2. Hashtag Engine resolves candidates via Places Connector
3. User confirms the correct place
4. A Business Page is created (or updated if it already exists)
5. The page is linked back to the originating conversation

## Design Principles
- Source-of-truth is human confirmation, not scraped data
- Pages can be corrected and refined over time
- No business claims ownership at creation time
- Pages are reward-aware (referral clicks, visibility boosts)

## What a Business Page is
- A durable, SEO-ready travel asset
- A convergence point for reviews, tips, and referrals
- A node in Kori’s incentive graph

## What a Business Page is NOT (v1)
- Not a merchant dashboard
- Not a paid listing
- Not editable without provenance

## Relationships
- Originates from chat conversations
- Emits referral and engagement events
- Can later attach verified owners, menus, tours, or offers

See also:
- modules/hashtag_engine
- modules/places_connector
- docs/01_ai_asset_engine.md
