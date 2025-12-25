# Kori Core

Kori is a "social settlement layer" for global travel: real locals help real travelers before & after they land, and every helpful conversation becomes a trusted travel asset.

This repository contains the core system modules described in the Kori deck:
- The AI Asset Generation Engine (unstructured chat → structured business page)
- Closed-loop micro-rewards (C-token ledger and referral click rewards)
- Settlement rail abstractions (optional escrow / verification / payout)
- Trust & safety primitives (anti-click-game, verification, abuse controls)

## Core Loop (V1): Chat → Asset → Reward

1) Visitors and locals chat in group discussions.
2) A user references a place using a hashtag (e.g. #kkanbujongno).
3) The system extracts the entity, calls the Places API, and requests user confirmation.
4) A business page is created and linked back to the chat.
5) When visitors click outbound links, the referrer earns C-tokens (closed-loop).

## Core Loop (V2): Private Interaction → Offline Experience → Settlement

1) A conversation moves from group chat to 1:1 chat via an invite mechanism <br>
   (initiated with C-tokens to discourage spam and signal intent).

2) The visitor requests a casual offline interaction
   (e.g. a meal, neighborhood walk, or light local guidance).

3) The local proposes availability using an in-app scheduling flow.

4) Both parties agree on time and location.

5) The visitor covers the local's meal or experience cost.

6) After the interaction, the visitor optionally tips the local via Kori.

## Repo Layout
- docs/ : system explanation + diagrams
- modules/ : implementation units (API-agnostic where possible)
- prototypes/ : mock data + demo scripts

## Status
Early-stage scaffold. Modules are intentionally separated so we can implement in phases
while keeping the system auditable and extensible.
