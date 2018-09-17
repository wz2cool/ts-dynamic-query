import { SortHelper } from "../../src/helpers/sortHelper";
import { expect } from "chai";
import { ArrayUtils } from "ts-commons";
import { SortDescriptor } from "../../src/models/sortDescriptor";
import { SortDirection } from "../../src/enums/sortDirection";

describe(".SortHelper", () => {
  class Student {
    name: string;
    age: number;
  }

  describe("#getRealSorts", () => {
    it("should return [] if sorts is null", () => {
      const result = SortHelper.getRealSorts(null);
      expect(true).to.be.eq(ArrayUtils.isEmpty(result));
    });

    it("should return [] if sorts is undefined", () => {
      const result = SortHelper.getRealSorts(undefined);
      expect(true).to.be.eq(ArrayUtils.isEmpty(result));
    });

    it("should return [] if sorts is []", () => {
      const result = SortHelper.getRealSorts([]);
      expect(true).to.be.eq(ArrayUtils.isEmpty(result));
    });

    it("should return SortDescriptor", () => {
      const obj = {
        type: "SortDescriptor",
        propertyPath: "name"
      } as SortDescriptor<Student>;
      const result = SortHelper.getRealSorts([obj]);
      expect(true).to.be.eq(result.length > 0);
    });
  });

  describe("#predicateBySortDescriptor", () => {
    it("should return 0 if two properties equal", () => {
      const s1 = new Student();
      s1.name = "Marry";
      s1.age = 18;
      const s2 = new Student();
      s2.name = "Jack";
      s2.age = 18;

      const ageAscSort = new SortDescriptor<Student>({
        propertyPath: "age",
        direction: SortDirection.ASC
      });
      let result = SortHelper.predicateBySortDescriptor(s1, s2, ageAscSort);
      expect(0).to.be.eq(result);

      const ageDescSort = new SortDescriptor<Student>({
        propertyPath: "age",
        direction: SortDirection.DESC
      });

      result = SortHelper.predicateBySortDescriptor(s1, s2, ageDescSort);
      expect(0).to.be.eq(result);
    });

    it("should return 1 if p1 > p2 for 'ASC'", () => {
      const s1 = new Student();
      s1.name = "Marry";
      s1.age = 19;
      const s2 = new Student();
      s2.name = "Jack";
      s2.age = 18;

      const ageAscSort = new SortDescriptor<Student>({
        propertyPath: "age",
        direction: SortDirection.ASC
      });
      let result = SortHelper.predicateBySortDescriptor(s1, s2, ageAscSort);
      expect(1).to.be.eq(result);

      const ageDescSort = new SortDescriptor<Student>({
        propertyPath: "age",
        direction: SortDirection.DESC
      });

      result = SortHelper.predicateBySortDescriptor(s1, s2, ageDescSort);
      expect(-1).to.be.eq(result);
    });

    it("should return -1 if p1 < p2 for 'ASC'", () => {
      const s1 = new Student();
      s1.name = "Marry";
      s1.age = 17;
      const s2 = new Student();
      s2.name = "Jack";
      s2.age = 18;

      const ageAscSort = new SortDescriptor<Student>({
        propertyPath: "age",
        direction: SortDirection.ASC
      });
      let result = SortHelper.predicateBySortDescriptor(s1, s2, ageAscSort);
      expect(-1).to.be.eq(result);

      const ageDescSort = new SortDescriptor<Student>({
        propertyPath: "age",
        direction: SortDirection.DESC
      });

      result = SortHelper.predicateBySortDescriptor(s1, s2, ageDescSort);
      expect(1).to.be.eq(result);
    });
  });

  describe("#predicateBySortDescriptorBase", () => {
    it("should return 0 if sort null", () => {
      const result = SortHelper.predicateBySortDescriptorBase(1, 2, null);
      expect(0).to.be.eq(result);
    });
  });

  describe("#predicateBySorts", () => {
    it("shoudd return 1", () => {
      const s1 = new Student();
      s1.name = "Marry";
      s1.age = 18;
      const s2 = new Student();
      s2.name = "Jack";
      s2.age = 18;

      const ageSort = new SortDescriptor<Student>({
        propertyPath: "age"
      });

      const nameSort = new SortDescriptor<Student>({
        propertyPath: "name"
      });

      const result = SortHelper.predicateBySorts(s1, s2, [ageSort, nameSort]);
      expect(1).to.be.eq(result);
    });
  });
});
