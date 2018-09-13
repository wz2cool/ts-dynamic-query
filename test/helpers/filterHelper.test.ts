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
});
