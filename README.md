## Kori Protocol: The Social Settlement Layer

🌐 Website: https://www.kori.now

**Kori Protocol is a dual-token "social settlement layer" that converts trusted social discovery into compliant, real-world commerce and payouts.**  
It separates **coordination and reputation** from **financial settlement**, enabling Web2-friendly onboarding while leveraging on-chain escrow and verifiable settlement behind the scenes.

### Kotour (Consumer Application)

**Kotour** is the consumer-facing travel application built on **Kori Protocol**.  
It allows travelers and locals to chat, share recommendations, verify information, and complete offline interactions (e.g. meetups, guidance, tips), while Kori Protocol handles verification, escrow, and settlement behind the scenes.

Kotour is designed as a **Web2-first consumer app** with crypto-invisible onboarding, while selectively leveraging on-chain primitives for trust, escrow, and final settlement.


## Repository Structure

- `programs/kori_protocol/`  
  On-chain program(s) implementing escrow, settlement, and receipt primitives.

- `off-chain/`  
  Off-chain services and utilities supporting protocol flows (e.g. interaction handling, confirmations, integrations).

- `docs/`  
  Protocol documentation and specifications.

---

### 1) Dual-Token Model 

#### C Token (Coordination / Reputation Layer)
- Non-cash, non-withdrawable reputation & attention currency
- Used to coordinate intent, unlock higher-trust interactions, and reward contribution
- Designed with **no cash-out path**, reducing regulatory and speculative risk

#### K Token (Fiat-Pegged Settlement Abstraction Layer)
- Fiat-pegged, non-crypto user-facing currency purchased via credit card
- Used for tipping, purchasing C tokens, and participating in escrow-based interactions
- Internally bridged to stablecoins for settlement while keeping the end-user experience "crypto-invisible"

### Settlement Rail (On-Chain Finality)

Kori uses a chain-based settlement rail to provide escrow custody, verifiable finality, and programmable release conditions, while keeping end-user interactions crypto-invisible.

#### Settlement Flow
1. User acquires **K tokens** via standard Web2 payment rails (e.g., credit card).
2. **K tokens** are used in-app for tipping, rewards, and escrow commitments.
3. Upon a verified social interaction ("digital handshake"), **K tokens are internally converted into a chain-native settlement asset(Stablecoin)**.
4. The settlement asset is finalized on-chain and routed through compliant protocol-controlled accounts.
5. Funds are paid out to local banks and user bank accounts via regulated off-ramps.

This design allows Kori to leverage blockchain finality and transparency without requiring end users to directly handle crypto assets.

---

### 2) System Architecture (Off-chain UX → On-chain Finality)

Kori uses a hybrid architecture:
- **Off-chain** for high-frequency user interactions (chat, discovery, confirmations, UI flows)
- **On-chain** for escrow custody, settlement receipts, and tamper-resistant event finality

This supports consumer-grade UX while providing verifiable settlement and dispute primitives.

---

### 3) Core Loops & Usage

#### Loop V1: The "Discovery" Rail (Chat → Asset → Reward)
- **Trigger:** Users chat in group discussions (e.g., "Where is the best chicken?").
- **Action:** A user references a place using a hashtag (e.g., `#kkanbujongno`).
- **Extraction:** The system detects `#`, pulls place metadata via a Places API, and prompts: "Is this the place?"
- **Asset Creation:** On confirmation ("Yes"), a **Business Page** is created as a structured on-platform asset.
- **Closed-Loop Reward:** When visitors click outbound links on this page, the referrer earns **C Tokens** (internal reputation/attention ledger).

**Outcome:** Social discovery becomes structured, searchable assets, while contributors earn C through measurable downstream actions.

#### Loop V2: The "Settlement" Rail (Private Interaction → Offline → Payout)
- **Invite:** Conversation moves to 1:1 chat (optionally gated by C Tokens to signal intent and reduce spam).
- **Commitment:** Visitor requests an offline interaction (meal, walk, styling, guidance).
- **Escrow:** Visitor deposits funds into a **Kori Escrow Vault** (stablecoin-backed settlement rail).
- **Execution:** Parties meet offline; **GPS + time verification** confirms completion ("digital handshake").
- **Settlement:** Funds are released to the Local; Visitor optionally tips via the Kori app.

**Outcome:** Kori converts social trust into real-world transactions with escrow safety, verifiable completion, and compliant payout pathways.

---

### 4) Trust Primitive ("Digital Handshake")
A completed interaction is verified by a compact proof such as:

- **Handshake proof = (both parties’ confirmation) + (time/location attestation) + (dispute window)**

This enables automated settlement while preserving a clear path for disputes.

---

### 5) Why This Matters (Ecosystem Impact)
Kori drives stablecoin and on-chain settlement demand through consumer UX:
- **Crypto-invisible onboarding** (credit card → K token → USDC settlement internally)
- **On-chain escrow + receipt anchoring** for verifiable finality
- **Repeatable transaction loop** rooted in real-world commerce (tourism/local services)
- **Compliance-forward design** by separating reputation (C) from settlement value (K/USDC)

---
