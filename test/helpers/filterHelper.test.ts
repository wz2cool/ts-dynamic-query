import { expect } from "chai";
import { FilterHelper } from "../../src/helpers/filterHelper";

describe(".filterHelper", () => {
  class Student {
    name: string;
    age: number;
  }

  describe("#predicateEqual", () => {
    it("'string' test equal true", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateEqual<Student>(
        student,
        "name",
        "Jack",
        false
      );
      expect(true).to.be.eq(result);
    });

    it("'string' test equal false", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateEqual<Student>(
        student,
        "name",
        "jack",
        false
      );
      expect(false).to.be.eq(result);
    });

    it("'string' test equal true if ignore case", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateEqual<Student>(
        student,
        "name",
        "jack",
        true
      );
      expect(true).to.be.eq(result);
    });

    it("'number' test equal true", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateEqual<Student>(
        student,
        "age",
        18,
        true
      );
      expect(true).to.be.eq(result);
    });

    it("'number' test equal false", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateEqual<Student>(
        student,
        "age",
        "18",
        true
      );
      expect(false).to.be.eq(result);
    });
  });

  describe("#predicateNotEqual", () => {
    it("'string' test not equal false", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateNotEqual<Student>(
        student,
        "name",
        "Jack",
        false
      );
      expect(false).to.be.eq(result);
    });

    it("'string' test not equal true", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateNotEqual<Student>(
        student,
        "name",
        "jack",
        false
      );
      expect(true).to.be.eq(result);
    });

    it("'string' test equal false if ignore case", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateNotEqual<Student>(
        student,
        "name",
        "jack",
        true
      );
      expect(false).to.be.eq(result);
    });

    it("'number' test equal false", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateNotEqual<Student>(
        student,
        "age",
        18,
        true
      );
      expect(false).to.be.eq(result);
    });

    it("'number' test equal true", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateNotEqual<Student>(
        student,
        "age",
        "18",
        true
      );
      expect(true).to.be.eq(result);
    });
  });

  describe("#predicateLessThan", () => {
    it("'number' should return true if 18 < 19", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateLessThan<Student>(
        student,
        "age",
        19
      );
      expect(true).to.be.eq(result);
    });

    it("'number' should return false if 18 < 10", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateLessThan<Student>(
        student,
        "age",
        10
      );
      expect(false).to.be.eq(result);
    });

    it("should return false if 18 < 'test'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateLessThan<Student>(
        student,
        "age",
        "test"
      );
      expect(false).to.be.eq(result);
    });

    it("should return true if 'Jack' < 'test'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateLessThan<Student>(
        student,
        "name",
        "test"
      );
      expect(true).to.be.eq(result);
    });
  });
});
