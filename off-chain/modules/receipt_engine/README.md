# Receipt Engine

The Receipt Engine is Kori’s event → receipt unification layer.

It accepts raw events emitted by modules (hashtag detection, place confirmation,
referral clicks, rewards, settlement) and converts them into canonical receipts
that are:

- auditable (who/what/when/why)
- replay-safe (idempotent)
- composable (downstream modules can trust the format)
- chain-agnostic (optional anchoring later)

This is the backbone that turns Kori from “features” into a coherent system.

## Responsibilities
- Normalize events into canonical receipt format
- Enforce required fields per event type
- Create stable receipt IDs
- Provide idempotency guarantees (same event -> same receipt)
- Record receipts to an append-only log (in-memory in v1)

## Non-goals (v1)
- No database implementation
- No cryptographic signatures
- No on-chain anchoring (planned later)
- No dispute resolution (separate module later)

## Receipt Types (v1)
- `HASHTAG_DETECTED`
- `PLACE_CONFIRMED`
- `BUSINESS_PAGE_CREATED`
- `REFERRAL_CLICK_VALIDATED`
- `REWARD_ISSUED`
- `SETTLEMENT_ESCROWED` (optional)
- `SETTLEMENT_VERIFIED` (optional)
- `SETTLEMENT_SETTLED` (optional)

## Why it matters
Kori’s loop relies on trust. Receipts make that trust inspectable.
