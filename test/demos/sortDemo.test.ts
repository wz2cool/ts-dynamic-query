import { expect } from "chai";
import { DynamicQuery } from "../../src/models/dynamicQuery";
import { SortDescriptor } from "../../src/models/sortDescriptor";
import { QueryProvider } from "../../src/providers/queryProvider";
import { SortDirection } from "../../src/enums/sortDirection";

describe(".sortDemo", () => {
  class Model1 {
    p1?: number;
    p2?: string;
  }
  describe("#sort by null", () => {
    it("number test sort by asc null first", () => {
      const m1 = new Model1();
      m1.p1 = 2;
      const m2 = new Model1();
      m2.p1 = 1;
      const m3 = new Model1();
      m3.p1 = undefined;

      const nameSort = new SortDescriptor<Model1>({
        propertyPath: "p1",
        direction: SortDirection.ASC_NULL_FIRST,
      });

      const query = DynamicQuery.createQuery<Model1>(Model1).addSorts([
        nameSort,
      ]);
      let result = QueryProvider.query([m1, m2, m3], query);
      expect(undefined).to.be.eq(result[0].p1);
      expect(1).to.be.eq(result[1].p1);
      expect(2).to.be.eq(result[2].p1);
    });

    it("number test sort by asc null last", () => {
      const m1 = new Model1();
      m1.p1 = 2;
      const m2 = new Model1();
      m2.p1 = 1;
      const m3 = new Model1();
      m3.p1 = undefined;

      const nameSort = new SortDescriptor<Model1>({
        propertyPath: "p1",
        direction: SortDirection.ASC_NULL_LAST,
      });

      const query = DynamicQuery.createQuery<Model1>(Model1).addSorts([
        nameSort,
      ]);
      let result = QueryProvider.query([m1, m2, m3], query);
      expect(1).to.be.eq(result[0].p1);
      expect(2).to.be.eq(result[1].p1);
      expect(undefined).to.be.eq(result[2].p1);
    });

    it("number test sort by desc null first", () => {
      const m1 = new Model1();
      m1.p1 = 2;
      const m2 = new Model1();
      m2.p1 = 1;
      const m3 = new Model1();
      m3.p1 = undefined;

      const nameSort = new SortDescriptor<Model1>({
        propertyPath: "p1",
        direction: SortDirection.DESC_NULL_FIRST,
      });

      const query = DynamicQuery.createQuery<Model1>(Model1).addSorts([
        nameSort,
      ]);
      let result = QueryProvider.query([m1, m2, m3], query);
      expect(undefined).to.be.eq(result[0].p1);
      expect(2).to.be.eq(result[1].p1);
      expect(1).to.be.eq(result[2].p1);
    });

    it("number test sort by desc null last", () => {
      const m1 = new Model1();
      m1.p1 = 2;
      const m2 = new Model1();
      m2.p1 = 1;
      const m3 = new Model1();
      m3.p1 = undefined;

      const nameSort = new SortDescriptor<Model1>({
        propertyPath: "p1",
        direction: SortDirection.DESC_NULL_LAST,
      });

      const query = DynamicQuery.createQuery<Model1>(Model1).addSorts([
        nameSort,
      ]);
      let result = QueryProvider.query([m1, m2, m3], query);
      expect(2).to.be.eq(result[0].p1);
      expect(1).to.be.eq(result[1].p1);
      expect(undefined).to.be.eq(result[2].p1);
    });

    it("number test sort by asc", () => {
      const m1 = new Model1();
      m1.p1 = 2;
      const m2 = new Model1();
      m2.p1 = 1;
      const m3 = new Model1();
      m3.p1 = undefined;

      const nameSort = new SortDescriptor<Model1>({
        propertyPath: "p1",
        direction: SortDirection.ASC,
      });

      const query = DynamicQuery.createQuery<Model1>(Model1).addSorts([
        nameSort,
      ]);
      let result = QueryProvider.query([m1, m2, m3], query);
      expect(undefined).to.be.eq(result[0].p1);
      expect(1).to.be.eq(result[1].p1);
      expect(2).to.be.eq(result[2].p1);
    });

    it("number test sort by desc", () => {
      const m1 = new Model1();
      m1.p1 = 2;
      const m2 = new Model1();
      m2.p1 = 1;
      const m3 = new Model1();
      m3.p1 = undefined;

      const nameSort = new SortDescriptor<Model1>({
        propertyPath: "p1",
        direction: SortDirection.DESC,
      });

      const query = DynamicQuery.createQuery<Model1>(Model1).addSorts([
        nameSort,
      ]);
      let result = QueryProvider.query([m1, m2, m3], query);
      expect(2).to.be.eq(result[0].p1);
      expect(1).to.be.eq(result[1].p1);
      expect(undefined).to.be.eq(result[2].p1);
    });

    it("string test sort by asc", () => {
      const m1 = new Model1();
      m1.p2 = "b";
      const m2 = new Model1();
      m2.p2 = undefined;
      const m3 = new Model1();
      m3.p2 = undefined;
      const m4 = new Model1();
      m4.p2 = "a";

      const nameSort = new SortDescriptor<Model1>({
        propertyPath: "p2",
        direction: SortDirection.ASC,
      });

      const query = DynamicQuery.createQuery<Model1>(Model1).addSorts([
        nameSort,
      ]);
      let result = QueryProvider.query([m1, m2, m3, m4], query);
      expect(undefined).to.be.eq(result[0].p2);
      expect(undefined).to.be.eq(result[1].p2);
      expect("a").to.be.eq(result[2].p2);
      expect("b").to.be.eq(result[3].p2);
    });

    it("string test sort by asc null first", () => {
      const m1 = new Model1();
      m1.p2 = "b";
      const m2 = new Model1();
      m2.p2 = undefined;
      const m3 = new Model1();
      m3.p2 = undefined;
      const m4 = new Model1();
      m4.p2 = "a";

      const nameSort = new SortDescriptor<Model1>({
        propertyPath: "p2",
        direction: SortDirection.ASC_NULL_FIRST,
      });

      const query = DynamicQuery.createQuery<Model1>(Model1).addSorts([
        nameSort,
      ]);
      let result = QueryProvider.query([m1, m2, m3, m4], query);
      expect(undefined).to.be.eq(result[0].p2);
      expect(undefined).to.be.eq(result[1].p2);
      expect("a").to.be.eq(result[2].p2);
      expect("b").to.be.eq(result[3].p2);
    });

    it("string test sort by asc null last", () => {
      const m1 = new Model1();
      m1.p2 = "b";
      const m2 = new Model1();
      m2.p2 = undefined;
      const m3 = new Model1();
      m3.p2 = undefined;
      const m4 = new Model1();
      m4.p2 = "a";

      const nameSort = new SortDescriptor<Model1>({
        propertyPath: "p2",
        direction: SortDirection.ASC_NULL_LAST,
      });

      const query = DynamicQuery.createQuery<Model1>(Model1).addSorts([
        nameSort,
      ]);
      let result = QueryProvider.query([m1, m2, m3, m4], query);
      expect("a").to.be.eq(result[0].p2);
      expect("b").to.be.eq(result[1].p2);
      expect(undefined).to.be.eq(result[2].p2);
      expect(undefined).to.be.eq(result[3].p2);
    });

    it("string test sort by desc", () => {
      const m1 = new Model1();
      m1.p2 = "b";
      const m2 = new Model1();
      m2.p2 = undefined;
      const m3 = new Model1();
      m3.p2 = undefined;
      const m4 = new Model1();
      m4.p2 = "a";

      const nameSort = new SortDescriptor<Model1>({
        propertyPath: "p2",
        direction: SortDirection.DESC,
      });

      const query = DynamicQuery.createQuery<Model1>(Model1).addSorts([
        nameSort,
      ]);
      let result = QueryProvider.query([m1, m2, m3, m4], query);
      expect("b").to.be.eq(result[0].p2);
      expect("a").to.be.eq(result[1].p2);
      expect(undefined).to.be.eq(result[2].p2);
      expect(undefined).to.be.eq(result[3].p2);
    });

    it("string test sort by desc null first", () => {
      const m1 = new Model1();
      m1.p2 = "b";
      const m2 = new Model1();
      m2.p2 = undefined;
      const m3 = new Model1();
      m3.p2 = undefined;
      const m4 = new Model1();
      m4.p2 = "a";

      const nameSort = new SortDescriptor<Model1>({
        propertyPath: "p2",
        direction: SortDirection.DESC_NULL_FIRST,
      });

      const query = DynamicQuery.createQuery<Model1>(Model1).addSorts([
        nameSort,
      ]);
      let result = QueryProvider.query([m1, m2, m3, m4], query);
      expect(undefined).to.be.eq(result[0].p2);
      expect(undefined).to.be.eq(result[1].p2);
      expect("b").to.be.eq(result[2].p2);
      expect("a").to.be.eq(result[3].p2);
    });

    it("string test sort by desc null last", () => {
      const m1 = new Model1();
      m1.p2 = "b";
      const m2 = new Model1();
      m2.p2 = undefined;
      const m3 = new Model1();
      m3.p2 = undefined;
      const m4 = new Model1();
      m4.p2 = "a";

      const nameSort = new SortDescriptor<Model1>({
        propertyPath: "p2",
        direction: SortDirection.DESC_NULL_LAST,
      });

      const query = DynamicQuery.createQuery<Model1>(Model1).addSorts([
        nameSort,
      ]);
      let result = QueryProvider.query([m1, m2, m3, m4], query);
      expect("b").to.be.eq(result[0].p2);
      expect("a").to.be.eq(result[1].p2);
      expect(undefined).to.be.eq(result[2].p2);
      expect(undefined).to.be.eq(result[3].p2);
    });
  });
});
