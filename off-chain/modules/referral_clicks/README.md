# Referral Clicks

The Referral Clicks module tracks outbound link clicks originating from
Kori Business Pages and attributes them to the correct referrer.

Its purpose is to ensure:
- fair reward attribution
- protection against click farming
- transparent linkage between value created and value rewarded

Referral clicks are the primary input to the Reward Ledger for C-token issuance.

## Core Responsibilities
- Generate referral links tied to a business page and user
- Validate click events (basic uniqueness & rate limits)
- Emit verifiable referral events for the Reward Ledger

## Design Principles
- No cookies required
- Minimal PII
- Clicks must represent real visitor intent
- Abuse controls applied before rewards are issued

## What This Module Does NOT Do (v1)
- No affiliate payout logic
- No revenue settlement
- No cross-device identity resolution

## Click Validation (v1)
- One rewarded click per visitor per page per time window
- Simple IP / fingerprint throttling
- Deferred reward issuance (ledger decides final reward)

## Why This Matters
Kori’s economy rewards *outcomes*, not noise.
Referral clicks represent measurable value creation.

See also:
- modules/business_page
- modules/reward_ledger
