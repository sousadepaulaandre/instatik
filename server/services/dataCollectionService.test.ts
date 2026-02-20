import { describe, it, expect } from "vitest";
import { calculateMetrics } from "./dataCollectionService";

describe("dataCollectionService", () => {
  describe("calculateMetrics", () => {
    it("should calculate revenue correctly", () => {
      const price = 100;
      const soldCount = 50;
      const costOfGoods = 30;

      const { estimatedRevenue, estimatedProfit } = calculateMetrics(
        price,
        soldCount,
        costOfGoods,
      );

      expect(estimatedRevenue).toBe(5000); // 100 * 50
      expect(estimatedProfit).toBe(3500); // (100 * 50) - (30 * 50)
    });

    it("should handle zero cost of goods", () => {
      const price = 50;
      const soldCount = 100;

      const { estimatedRevenue, estimatedProfit } = calculateMetrics(
        price,
        soldCount,
        0,
      );

      expect(estimatedRevenue).toBe(5000); // 50 * 100
      expect(estimatedProfit).toBe(5000); // (50 * 100) - (0 * 100)
    });

    it("should handle decimal prices", () => {
      const price = 19.99;
      const soldCount = 25;
      const costOfGoods = 5.5;

      const { estimatedRevenue, estimatedProfit } = calculateMetrics(
        price,
        soldCount,
        costOfGoods,
      );

      expect(estimatedRevenue).toBeCloseTo(499.75, 2);
      expect(estimatedProfit).toBeCloseTo(362.25, 2);
    });

    it("should handle large numbers", () => {
      const price = 1000;
      const soldCount = 10000;
      const costOfGoods = 300;

      const { estimatedRevenue, estimatedProfit } = calculateMetrics(
        price,
        soldCount,
        costOfGoods,
      );

      expect(estimatedRevenue).toBe(10000000);
      expect(estimatedProfit).toBe(7000000);
    });
  });
});
