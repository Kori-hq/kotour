# Reward Ledger

The Reward Ledger records and manages all non-cash rewards inside Kori.
It is a closed-loop system designed to incentivize high-quality contribution
without introducing speculative or regulatory risk.

In v1, the ledger tracks **C-tokens** only.

## Design Principles
- Closed-loop: C-tokens cannot be cashed out directly
- Event-driven: rewards are issued based on verifiable actions
- Quality-preserving: rewards decay through rate limits and caps
- Transparent: every reward has an auditable source event

## What the Ledger Does
- Issues C-tokens for verified actions (referrals, engagement)
- Maintains per-user balances
- Prevents double-spend and click-gaming
- Emits receipts for downstream systems (visibility boosts, ranking)

## What the Ledger Does NOT Do (v1)
- No fiat or crypto custody
- No price speculation
- No conversion to cash
- No external transfers

## Rewardable Events (v1)
- Referral click (unique visitor)
- Page like / upvote (rate-limited)
- Community engagement (future)

## Why This Matters
Traditional platforms reward volume.
Kori rewards **useful impact**.

By separating rewards from cash, Kori maintains:
- regulatory simplicity
- long-term user trust
- incentive alignment across the platform

See also:
- modules/business_page
- docs/02_token_ledger.md
