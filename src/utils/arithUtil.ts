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

}
