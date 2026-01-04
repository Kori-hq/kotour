# Kori Protocol: The Social Settlement Layer
www.kori.now

## Status
🚧 **Early-Stage Scaffold**
*Modules are decoupled for phased implementation.*

## 1. Abstract
Kori is a human-first travel infrastructure that turns real conversations between locals and visitors into trusted, incentive-aligned travel assets.

Unlike generic "data marketplaces," Kori acts as a **Social Settlement Layer**. It utilizes Solana’s high-throughput runtime to verify and tokenize "digital handshakes" (travel advice, local guidance, and concierge services) into atomic assets that can be rewarded, traded, or monetized.

## 2. System Architecture
The protocol is designed as a hybrid **Off-Chain Intelligence / On-Chain Settlement** system.

### 2.1 The Asset Generation Engine (Off-Chain)
* **Trigger:** Deterministic Hashtag Listener (e.g., user types `#kkanbujongno`).
* **Process:** System captures the tag, queries **Google Places API** for metadata (GPS, Category, Hours), and prompts user for confirmation.
* **Output:** A standardized **Business Page** linked to the chat context.

### 2.2 The Settlement Rail (On-Chain)
* **Framework:** Anchor (Solana/Rust).
* **Mechanism:** Program Derived Addresses (PDAs) create deterministic escrow vaults for each trip session.
* **Trust Primitive:** Atomic swap execution. The `release_funds` instruction is only invoked upon cryptographic signature verification from both parties.

## 3. Core Loops & Usage

### Loop V1: The "Discovery" Rail (Chat → Asset → Reward)
1.  **Trigger:** Users chat in group discussions (e.g., "Where is the best chicken?").
2.  **Action:** User references a place using a hashtag (e.g., `#kkanbujongno`).
3.  **Extraction:** System detects the `#` symbol, pulls Google Places API data, and asks: *"Is this the place?"*
4.  **Asset Creation:** Upon "Yes" confirmation, a **Business Page** is created.
5.  **Closed-Loop Reward:** When visitors click outbound links on this page, the referrer earns **C-Tokens** (internal reputation ledger).

### Loop V2: The "Settlement" Rail (Private Interaction → Offline → Payout)
1.  **Invite:** Conversation moves to 1:1 chat (gated by C-Tokens to signal intent).
2.  **Commitment:** Visitor requests an offline interaction (meal, walk, styling).
3.  **Escrow:** Visitor deposits funds (USDC) into the **Kori Escrow Vault**.
4.  **Execution:** Parties meet. GPS + Time verification confirms the event.
5.  **Settlement:** Funds are released to the Local; Visitor optionally tips via the Kori App.

## 4. Data Standard (TAS)
The protocol defines the **Travel Asset Standard** for interoperability.
