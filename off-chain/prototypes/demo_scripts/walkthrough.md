# Kori Core — 3-Minute Walkthrough (Prototype)

This walkthrough demonstrates Kori’s core loop:

Chat → Hashtag → Place Confirmation → Business Page → Referral Click → Reward Receipt

No UI is required to understand the system. This is intentionally a "logic walkthrough"
for grant reviewers and early technical diligence.

---

## 0) Inputs (Mock Data)

- `prototypes/mock_data/sample_chat.json`
- `prototypes/mock_data/sample_places_response.json`

---

## 1) Hashtag Detection (Hashtag Engine)

**Input message**
> "If you want something local, try #kkanbujongno. It's great after 10pm."

Expected behavior:
- Detect `#kkanbujongno`
- Extract token `kkanbujongno`
- Pass `kkanbujongno` to Places Connector

Module:
- `modules/hashtag_engine`

---

## 2) Place Candidates (Places Connector)

Given the query `kkanbujongno`, the connector returns normalized candidates.

In v1 demos, we use the mock connector:
- `modules/places_connector/MockPlacesConnector`

Expected output:
- candidate[0] is shown to the user for confirmation
- user selects **Yes** (human confirmation is the source of truth)

---

## 3) Business Page Creation (Business Page)

When the user confirms the place:
- Create a Business Page object using `modules/business_page/schema.json`

Minimum required fields:
- name
- provider
- providerPlaceId
- location
- createdBy
- sourceConversationId

Result:
- a durable, SEO-ready travel asset is born from the chat itself

---

## 4) Referral Link Generation (Referral Clicks)

The referrer (local guide) can now share a referral link associated with:
- businessPageId
- referrerUserId

Module:
- `modules/referral_clicks`

Expected behavior:
- a referral link is generated
- outbound clicks can be tracked with basic anti-spam checks

---

## 5) Reward Issuance (Reward Ledger)

A validated referral click emits an event that can be rewarded.

Module:
- `modules/reward_ledger`

Expected behavior:
- ledger issues a C-token reward
- ledger returns a RewardReceipt
- balance increases for the referrer

This demonstrates the closed-loop, non-cash reward model.

---

## 6) Optional: Settlement Simulation (Future / Appendix)

If/when Kori supports escrow-protected bookings:
- the "Digital Handshake" can be modeled using `modules/settlement_sim`

This is separate from the core referral loop and is intentionally optional.

---

## Summary

Kori’s innovation is not "chat" or "maps".
It is the moment where **human context becomes a structured asset**, and value is
measured and rewarded without requiring users to understand crypto.

Modules involved:
- hashtag_engine
- places_connector
- business_page
- referral_clicks
- reward_ledger
- (optional) settlement_sim
