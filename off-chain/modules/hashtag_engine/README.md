# Hashtag Engine

The Hashtag Engine converts unstructured chat messages into structured place entities
at the moment of conversation.

It implements Kori’s core insight:
> creation happens at the point of intent, not after the fact.

## What it does (v1)
1. Detects hashtag usage in chat messages (e.g. #kkanbujongno)
2. Extracts the candidate place token
3. Calls a Places text-search provider (Google / Naver / Kakao – abstracted)
4. Presents top match to the user for confirmation
5. Emits a creation event when confirmed

## Why this matters
- Zero manual onboarding for businesses
- Infinite long-tail coverage via user behavior
- Structured data is born from human context
- Creates SEO-ready, reward-linked business pages

## Inputs
- chatMessage: string
- authorId: string
- conversationId: string

## Outputs
- HashtagDetected event
- PlaceCandidateSuggested event
- PlaceConfirmed event (on user approval)

## Non-goals (v1)
- No auto-publish without user confirmation
- No fuzzy disambiguation beyond top-N results
- No write access to Business Page schema (handled downstream)

## Dependencies
- Text parser (regex-based)
- Places Connector (abstracted interface)
- Event bus / receipt engine (external)

See: docs/01_ai_asset_engine.md
