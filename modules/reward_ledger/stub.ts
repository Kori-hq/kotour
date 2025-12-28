/**
 * Reward Ledger (v1)
 * -----------------
 * Closed-loop ledger for non-cash rewards (C-tokens).
 */

export type RewardEventType =
  | "referral_click"
  | "page_like"
  | "engagement";

/**
 * A verifiable action that may trigger a reward.
 */
export type RewardEvent = {
  id: string;
  type: RewardEventType;
  actorUserId: string;
  targetId?: string; // e.g. businessPageId
  timestamp: number;
  metadata?: Record<string, any>;
};

/**
 * A receipt records why a reward was issued.
 */
export type RewardReceipt = {
  receiptId: string;
  eventId: string;
  userId: string;
  amount: number;
  issuedAt: number;
};

export interface RewardLedgerConfig {
  maxRewardsPerDay: number;
  referralRewardAmount: number;
  engagementRewardAmount: number;
}

export class RewardLedger {
  private balances: Map<string, number> = new Map();
  private receipts: RewardReceipt[] = [];
  private dailyCounters: Map<string, number> = new Map();
  private config: RewardLedgerConfig;

  constructor(config: RewardLedgerConfig) {
    this.config = config;
  }

  /**
   * Attempt to issue a reward for an event.
   * Returns a receipt if successful, null otherwise.
   */
  issueReward(event: RewardEvent): RewardReceipt | null {
    const todayKey = `${event.actorUserId}:${this.dayBucket(
      event.timestamp
    )}`;

    const usedToday = this.dailyCounters.get(todayKey) ?? 0;
    if (usedToday >= this.config.maxRewardsPerDay) {
      return null; // rate limit hit
    }

    const amount = this.rewardAmountFor(event.type);
    if (amount <= 0) return null;

    const current = this.balances.get(event.actorUserId) ?? 0;
    this.balances.set(event.actorUserId, current + amount);
    this.dailyCounters.set(todayKey, usedToday + amount);

    const receipt: RewardReceipt = {
      receiptId: `r_${Date.now()}_${event.id}`,
      eventId: event.id,
      userId: event.actorUserId,
      amount,
      issuedAt: Date.now(),
    };

    this.receipts.push(receipt);
    return receipt;
  }

  getBalance(userId: string): number {
    return this.balances.get(userId) ?? 0;
  }

  getReceipts(): RewardReceipt[] {
    return this.receipts;
  }

  private rewardAmountFor(type: RewardEventType): number {
    switch (type) {
      case "referral_click":
        return this.config.referralRewardAmount;
      case "page_like":
      case "engagement":
        return this.config.engagementRewardAmount;
      default:
        return 0;
    }
  }

  private dayBucket(timestamp: number): string {
    const d = new Date(timestamp);
    return `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
  }
}
