# Settlement Simulation

The Settlement Simulation module models Kori’s "Digital Handshake" flow:
commitment → escrow → verification → settlement.

This module is intentionally chain-agnostic and off-chain by default.
Its purpose is to:
- validate settlement logic
- simulate escrow behavior
- test dispute and verification flows
- demonstrate how blockchain is used as an invisible backend rail

## Design Philosophy
- Users never interact with blockchain directly
- Blockchain acts as a neutral settlement ledger
- UI actions map to state transitions, not transactions
- Funds are released only after verifiable completion

## What This Module Simulates (v1)
- Escrow creation (locked funds)
- Verification handshake (GPS + confirmation)
- Settlement release
- Failure / timeout paths

## What This Module Does NOT Do (v1)
- No real smart contracts
- No private key management
- No custody of user funds
- No chain-specific logic

## Intended Use
- Grant demonstrations
- Architecture validation
- Local testing without real money
- Basis for later on-chain implementation

## Lifecycle States
- `initialized`
- `escrowed`
- `verified`
- `settled`
- `refunded`

See also:
- docs/diagrams/settlement_handshake.mmd
- docs/03_settlement_rails.md
