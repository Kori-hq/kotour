/**
 * Referral Clicks (v1)
 * -------------------
 * Tracks and validates outbound referral clicks.
 */

export type ReferralLink = {
  id: string;
  businessPageId: string;
  referrerUserId: string;
  createdAt: number;
};

export type ReferralClickEvent = {
  id: string;
  referralLinkId: string;
  businessPageId: string;
  referrerUserId: string;
  visitorFingerprint: string;
  timestamp: number;
  userAgent?: string;
};

export interface ReferralClicksConfig {
  rewardWindowMs: number; // e.g. 24h
  maxClicksPerVisitor: number;
}

export class ReferralClicksTracker {
  private clicks: ReferralClickEvent[] = [];
  private lastClickByVisitor: Map<string, number> = new Map();
  private config: ReferralClicksConfig;

  constructor(config: ReferralClicksConfig) {
    this.config = config;
  }

  /**
   * Create a referral link tied to a user and business page.
   */
  createReferralLink(
    businessPageId: string,
    referrerUserId: string
  ): ReferralLink {
    return {
      id: `ref_${Date.now()}_${Math.random()}`,
      businessPageId,
      referrerUserId,
      createdAt: Date.now(),
    };
  }

  /**
   * Track an outbound click.
   * Returns a validated click event or null if rejected.
   */
  trackClick(
    referralLink: ReferralLink,
    visitorFingerprint: string,
    userAgent?: string
  ): ReferralClickEvent | null {
    const now = Date.now();
    const key = `${visitorFingerprint}:${referralLink.businessPageId}`;

    const last = this.lastClickByVisitor.get(key);
    if (last && now - last < this.config.rewardWindowMs) {
      return null; // duplicate or spam click
    }

    const event: ReferralClickEvent = {
      id: `clk_${now}_${Math.random()}`,
      referralLinkId: referralLink.id,
      businessPageId: referralLink.businessPageId,
      referrerUserId: referralLink.referrerUserId,
      visitorFingerprint,
      timestamp: now,
      userAgent,
    };

    this.lastClickByVisitor.set(key, now);
    this.clicks.push(event);
    return event;
  }

  /**
   * Return all recorded click events (for debugging / audits).
   */
  getClicks(): ReferralClickEvent[] {
    return this.clicks;
  }
}
