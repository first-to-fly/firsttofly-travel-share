import { Decimal } from "decimal.js";


export class ArithUtil {

  private static readonly DEF_DIV_SCALE = 10;

  static add(d1: number, d2: number): number {
    const b1 = new Decimal(d1);
    const b2 = new Decimal(d2);
    return b1.add(b2).toNumber();
  }

  static sub(d1: number, d2: number): number {
    const b1 = new Decimal(d1);
    const b2 = new Decimal(d2);
    return b1.sub(b2).toNumber();
  }

  static mul(d1: number, d2: number): number {
    const b1 = new Decimal(d1);
    const b2 = new Decimal(d2);
    return b1.mul(b2).toNumber();
  }

  static div(d1: number, d2: number, scale?: number): number {
    const actualScale = scale ?? ArithUtil.DEF_DIV_SCALE;

    if (actualScale < 0) {
      throw new Error("The scale must be a positive integer or zero");
    }

    if (d2 === 0) {
      return 0;
    }

    const b1 = new Decimal(d1);
    const b2 = new Decimal(d2);
    return b1.div(b2).toDecimalPlaces(actualScale, Decimal.ROUND_HALF_UP).toNumber();
  }

  /**
     * Provides precise decimal rounding.
     * @param v The number to be rounded
     * @param scale Number of decimal places to keep
     * @returns Rounded result
     */
  static round(v: number, scale: number): number {
    if (scale < 0) {
      throw new Error("The scale must be a positive integer or zero");
    }

    const b = new Decimal(v);
    return b.toDecimalPlaces(scale, Decimal.ROUND_HALF_UP).toNumber();
  }

  /**
     * Calculate rate: (current - previous) ÷ previous × 100%
     */
  static rate(now: number, before: number): number {
    if (before === 0 && now === 0) {
      return 0;
    } if (before === 0) {
      return 100;
    }
    return ArithUtil.round(
      ArithUtil.mul(
        ArithUtil.div(ArithUtil.sub(now, before), before),
        100,
      ),
      2,
    );

  }

  static percent(sum: number, completed: number): number {
    if (sum === 0 && completed === 0) {
      return 0;
    } if (sum === 0) {
      return 0;
    }
    return ArithUtil.round(
      ArithUtil.mul(
        ArithUtil.div(completed, sum),
        100,
      ),
      2,
    );

  }

  // ---- Currency-safe helpers (class methods) ----

  /** Convert a decimal amount to integer cents (rounding to nearest cent). */
  static toCents(value: number | undefined | null): number {
    const v = (value ?? 0) as number;
    return Math.round(v * 100);
  }

  /** Convert integer cents back to a decimal amount (rounded to 2 decimals). */
  static fromCents(cents: number | undefined | null): number {
    const c = Math.round((cents ?? 0) as number);
    return Math.round((c / 100) * 100) / 100;
  }

  /** Round a number to a fixed number of decimals (default: 2). */
  static safeRound(value: number, decimals = 2): number {
    const factor = 10 ** decimals;
    const v = value || 0;
    return Math.round(v * factor) / factor;
  }

  /**
   * Proportionally allocate an integer total (in cents) across weights, ensuring the sum of
   * allocations equals the total. Uses a largest-remainder-like adjustment.
   */
  static proportionalAllocateCents(totalCents: number, weights: number[]): number[] {
    const validWeights = weights.map((w) => (w > 0 ? w : 0));
    const sumWeights = validWeights.reduce((s, w) => s + w, 0);
    if (sumWeights <= 0 || totalCents === 0) {
      return weights.map(() => 0);
    }

    const raw = validWeights.map((w) => (w > 0 ? (totalCents * w) / sumWeights : 0));
    const floors = raw.map((r) => Math.floor(r));
    let remainder = totalCents - floors.reduce((s, f) => s + f, 0);

    // Distribute remaining cents to the largest fractional parts
    const order = raw
      .map((r, i) => ({
        i: i,
        frac: r - Math.floor(r),
      }))
      .sort((a, b) => b.frac - a.frac);

    for (let k = 0; k < order.length && remainder > 0; k += 1) {
      floors[order[k].i] += 1;
      remainder -= 1;
    }

    return floors;
  }

}
