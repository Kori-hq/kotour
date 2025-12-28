# Pseudo Run — Kori Core Loop (Readable Simulation)

This file simulates a single end-to-end loop without executing code.
It is meant for grant reviewers and early diligence.

Scenario:
- Tourist asks for late-night BBQ
- Local suggests a place with hashtag
- Kori creates a Business Page
- Tourist clicks an outbound link
- Local earns C-token reward
- Optional: tourist books an in-person guide with escrow deposit

---

## Step 1) Chat input

Message:
- author: u_local_01
- text: "Try #kkanbujongno. Great after 10pm."

Expected module:
- `hashtag_engine.detectHashtag()`

Receipt:
- `HASHTAG_DETECTED`
```json
{
  "type": "HASHTAG_DETECTED",
  "actorUserId": "u_local_01",
  "timestamp": 1766900060000,
  "payload": {
    "hashtag": "kkanbujongno",
    "conversationId": "conv_001"
  },
  "sourceEventId": "m_002"
}
