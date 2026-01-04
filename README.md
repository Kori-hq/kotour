# Kori Protocol: The Social Settlement Layer

## Status
🚧 **Early-Stage Scaffold**
*Modules are decoupled for phased implementation (Devnet V1).*

## 1. Abstract
Kori is a human-first travel infrastructure that turns real conversations between locals and visitors into trusted, incentive-aligned travel assets.

Unlike generic "data marketplaces," Kori acts as a **Social Settlement Layer**. It utilizes Solana’s high-throughput runtime to verify and tokenize "digital handshakes" (travel advice, local guidance, and concierge services) into atomic assets that can be rewarded, traded, or monetized.

## 2. System Architecture
The protocol is designed as a hybrid **Off-Chain Intelligence / On-Chain Settlement** system.

### 2.1 The AI Asset Generation Engine (Off-Chain)
* **Input:** Unstructured Group Chat / 1:1 DMs.
* **Process:** LLM Parser extracts entities (Merchant ID, GPS, Sentiment) and structured intent.
* **Output:** A standardized **Business Page** or **Travel Asset**.

### 2.2 The Settlement Rail (On-Chain)
* **Framework:** Anchor (Solana/Rust).
* **Mechanism:** Program Derived Addresses (PDAs) create deterministic escrow vaults for each trip session.
* **Trust Primitive:** Atomic swap execution. The `release_funds` instruction is only invoked upon cryptographic signature verification from both parties (Digital Handshake).

## 3. Core Loops & Usage

### Loop V1: The "Discovery" Rail (Chat → Asset → Reward)
1.  **Trigger:** Users chat in group discussions (e.g., "Where is the best chicken?").
2.  **Extraction:** User references a place (e.g., `#kkanbujongno`). The system calls the Places API and requests confirmation.
3.  **Asset Creation:** A structured **Business Page** is created and linked to the chat.
4.  **Closed-Loop Reward:** When visitors click outbound links, the referrer earns **C-Tokens** (internal ledger for reputation/visibility).

### Loop V2: The "Settlement" Rail (Private Interaction → Offline → Payout)
1.  **Invite:** Conversation moves to 1:1 chat (gated by C-Tokens to signal intent/anti-spam).
2.  **Commitment:** Visitor requests an offline interaction (meal, walk, styling).
3.  **Escrow:** Visitor deposits funds (USDC) into the **Kori Escrow Vault**.
4.  **Execution:** Parties meet. GPS + Time verification confirms the event.
5.  **Settlement:** Funds are released to the Local; Visitor optionally tips via the Kori App.

## 4. Data Standard (TAS)
The protocol defines the **Travel Asset Standard** for interoperability.

## 5. Repo Layout
- docs/ : system explanation + diagrams
- modules/ : implementation units (API-agnostic where possible)
- prototypes/ : mock data + demo scripts

## 6. Status
Early-stage scaffold. Modules are intentionally separated so we can implement in phases
while keeping the system auditable and extensible.

http://www.kori.now
