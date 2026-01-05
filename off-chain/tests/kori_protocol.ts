/**
 * Settlement Simulation (v1)
 * --------------------------
 * Models escrow-based settlement without real blockchain dependency.
 */

export type SettlementState =
  | "initialized"
  | "escrowed"
  | "verified"
  | "settled"
  | "refunded";

export type Settlement = {
  id: string;
  payerUserId: string;
  payeeUserId: string;
  amount: number;
  currency: "USD" | "USDC" | "KRW";
  state: SettlementState;
  createdAt: number;
  verifiedAt?: number;
  settledAt?: number;
};

export interface SettlementSimConfig {
  verificationWindowMs: number;
}

export class SettlementSimulator {
  private settlements: Map<string, Settlement> = new Map();
  private config: SettlementSimConfig;

  constructor(config: SettlementSimConfig) {
    this.config = config;
  }

  /**
   * Step 1: Initialize settlement intent
   */
  createSettlement(
    payerUserId: string,
    payeeUserId: string,
    amount: number,
    currency: Settlement["currency"]
  ): Settlement {
    const settlement: Settlement = {
      id: `stl_${Date.now()}_${Math.random()}`,
      payerUserId,
      payeeUserId,
      amount,
      currency,
      state: "initialized",
      createdAt: Date.now(),
    };

    this.settlements.set(settlement.id, settlement);
    return settlement;
  }

  /**
   * Step 2: Lock funds into escrow
   */
  escrow(settlementId: string): Settlement | null {
    const s = this.settlements.get(settlementId);
    if (!s || s.state !== "initialized") return null;

    s.state = "escrowed";
    return s;
  }

  /**
   * Step 3: Verification handshake (simulated)
   */
  verify(settlementId: string): Settlement | null {
    const s = this.settlements.get(settlementId);
    if (!s || s.state !== "escrowed") return null;

    const now = Date.now();
    if (now - s.createdAt > this.config.verificationWindowMs) {
      return this.refund(settlementId);
    }

    s.state = "verified";
    s.verifiedAt = now;
    return s;
  }

  /**
   * Step 4: Release escrow and settle
   */
  settle(settlementId: string): Settlement | null {
    const s = this.settlements.get(settlementId);
    if (!s || s.state !== "verified") return null;

    s.state = "settled";
    s.settledAt = Date.now();
    return s;
  }

  /**
   * Failure path: refund payer
   */
  refund(settlementId: string): Settlement | null {
    const s = this.settlements.get(settlementId);
    if (!s) return null;

    s.state = "refunded";
    return s;
  }

  /**
   * Read-only access (for demos / audits)
   */
  getSettlement(settlementId: string): Settlement | null {
    return this.settlements.get(settlementId) ?? null;
  }
}
