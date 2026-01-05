/**
 * Receipt Engine (v1)
 * -------------------
 * Normalizes events into canonical receipts with idempotency.
 */

export type ReceiptType =
  | "HASHTAG_DETECTED"
  | "PLACE_CONFIRMED"
  | "BUSINESS_PAGE_CREATED"
  | "REFERRAL_CLICK_VALIDATED"
  | "REWARD_ISSUED"
  | "SETTLEMENT_ESCROWED"
  | "SETTLEMENT_VERIFIED"
  | "SETTLEMENT_SETTLED";

export type CanonicalReceipt = {
  receiptId: string;
  type: ReceiptType;
  actorUserId?: string; // who caused it (if applicable)
  subjectId?: string;   // businessPageId / referralLinkId / settlementId etc.
  timestamp: number;
  payload: Record<string, any>;
  sourceEventId?: string;
};

export interface ReceiptEngine {
  emit(type: ReceiptType, receipt: Omit<CanonicalReceipt, "receiptId" | "type">): CanonicalReceipt;
  getAll(): CanonicalReceipt[];
  getById(receiptId: string): CanonicalReceipt | null;
}

export class InMemoryReceiptEngine implements ReceiptEngine {
  private receipts: CanonicalReceipt[] = [];
  private index: Map<string, CanonicalReceipt> = new Map();

  /**
   * Deterministic-ish receiptId: stable for same (type + sourceEventId).
   * In production you may use a cryptographic hash.
   */
  private makeReceiptId(type: ReceiptType, sourceEventId?: string): string {
    const base = sourceEventId ? `${type}:${sourceEventId}` : `${type}:${Date.now()}:${Math.random()}`;
    // simple hash-ish
    let hash = 0;
    for (let i = 0; i < base.length; i++) hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
    return `rcpt_${hash.toString(16)}`;
  }

  emit(
    type: ReceiptType,
    receipt: Omit<CanonicalReceipt, "receiptId" | "type">
  ): CanonicalReceipt {
    const rid = this.makeReceiptId(type, receipt.sourceEventId);

    // Idempotency: if already exists, return existing
    const existing = this.index.get(rid);
    if (existing) return existing;

    const full: CanonicalReceipt = {
      receiptId: rid,
      type,
      ...receipt,
    };

    this.receipts.push(full);
    this.index.set(rid, full);
    return full;
  }

  getAll(): CanonicalReceipt[] {
    return this.receipts;
  }

  getById(receiptId: string): CanonicalReceipt | null {
    return this.index.get(receiptId) ?? null;
  }
}
