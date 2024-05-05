import { expect } from "chai";
import { DynamicQuery, _equal, _greaterThan, _lessThan } from "../../src";

describe(".queryDemo", () => {
  class Model1 {
    p1?: number;
    p2?: string;

    constructor(p1?: number, p2?: string) {
      this.p1 = p1;
      this.p2 = p2;
    }
  }

  describe("#test", () => {
    it("group >1 and < 3", () => {
      const m1 = new Model1(1, "1");
      const m2 = new Model1(2, "2");
      const m3 = new Model1(3, "3");

      const query = DynamicQuery.createQuery(Model1).and((g) =>
        g.and("p1", _greaterThan, 1).and("p1", _lessThan, 3)
      );
      const result = query.query([m1, m2, m3]);
      expect(1).to.be.eq(result.length);
      expect(2).to.be.eq(result[0].p1);
    });

    it("group (>1 and < 3) or (= 5)", () => {
      const m1 = new Model1(1, "1");
      const m2 = new Model1(2, "2");
      const m3 = new Model1(3, "3");
      const m4 = new Model1(4, "4");
      const m5 = new Model1(5, "5");

      const query = DynamicQuery.createQuery(Model1)
        .and((g) => g.and("p1", _greaterThan, 1).and("p1", _lessThan, 3))
        .or("p1", _equal, 5);
      const result = query.query([m1, m2, m3, m4, m5]);
      expect(2).to.be.eq(result.length);
      expect(2).to.be.eq(result[0].p1);
      expect(5).to.be.eq(result[1].p1);
    });

    it("enable demo", () => {
      const m1 = new Model1(1, "1");
      const m2 = new Model1(2, "2");
      const m3 = new Model1(3, "3");
      const m4 = new Model1(4, "4");
      const m5 = new Model1(5, "5");
      let enable = true;
      const query = DynamicQuery.createQuery(Model1).and(
        enable,
        "p1",
        _greaterThan,
        3
      );

      const result = query.query([m1, m2, m3, m4, m5]);
      for (const item of result) {
        expect(true).to.be.eq(item.p1! > 3);
      }
      // 改变不启用筛选
      enable = false;
      const query2 = DynamicQuery.createQuery(Model1).and(
        enable,
        "p1",
        _greaterThan,
        3
      );
      const result2 = query2.query([m1, m2, m3, m4, m5]);
      expect(5).to.be.eq(result2.length);
    });
  });
});
