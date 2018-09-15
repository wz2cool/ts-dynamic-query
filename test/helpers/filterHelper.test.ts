import { expect } from "chai";
import { FilterHelper } from "../../src/helpers/filterHelper";
import { FilterOperator } from "../../src/enums/filterOperator";

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

  describe("#predicateLessThanOrEqual", () => {
    it("'number' should return true if 18 <= 19", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateLessThanOrEqual<Student>(
        student,
        "age",
        19
      );
      expect(true).to.be.eq(result);
    });

    it("'number' should return true if 18 <= 18", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateLessThanOrEqual<Student>(
        student,
        "age",
        18
      );
      expect(true).to.be.eq(result);
    });

    it("'number' should return false if 18 <= 10", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateLessThanOrEqual<Student>(
        student,
        "age",
        10
      );
      expect(false).to.be.eq(result);
    });

    it("should return false if 18 <= 'test'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateLessThanOrEqual<Student>(
        student,
        "age",
        "test"
      );
      expect(false).to.be.eq(result);
    });

    it("should return true if 'Jack' <= 'test'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateLessThanOrEqual<Student>(
        student,
        "name",
        "test"
      );
      expect(true).to.be.eq(result);
    });
  });

  describe("#predicateGreaterThanOrEqual", () => {
    it("'number' should return false if 18 >= 19", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateGreaterThanOrEqual<Student>(
        student,
        "age",
        19
      );
      expect(false).to.be.eq(result);
    });

    it("'number' should return true if 18 <= 18", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateGreaterThanOrEqual<Student>(
        student,
        "age",
        18
      );
      expect(true).to.be.eq(result);
    });

    it("'number' should return true if 18 >= 10", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateGreaterThanOrEqual<Student>(
        student,
        "age",
        10
      );
      expect(true).to.be.eq(result);
    });

    it("should return false if 18 >= 'test'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateGreaterThanOrEqual<Student>(
        student,
        "age",
        "test"
      );
      expect(false).to.be.eq(result);
    });

    it("should return false if 'Jack' >= 'test'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateGreaterThanOrEqual<Student>(
        student,
        "name",
        "test"
      );
      expect(false).to.be.eq(result);
    });
  });

  describe("#predicateGreaterThan", () => {
    it("'number' should return false if 18 > 19", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateGreaterThan<Student>(
        student,
        "age",
        19
      );
      expect(false).to.be.eq(result);
    });

    it("'number' should return false if 18 > 18", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateGreaterThan<Student>(
        student,
        "age",
        18
      );
      expect(false).to.be.eq(result);
    });

    it("'number' should return true if 18 > 10", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateGreaterThan<Student>(
        student,
        "age",
        10
      );
      expect(true).to.be.eq(result);
    });

    it("should return false if 18 > 'test'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateGreaterThan<Student>(
        student,
        "age",
        "test"
      );
      expect(false).to.be.eq(result);
    });

    it("should return false if 'Jack' > 'test'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateGreaterThan<Student>(
        student,
        "name",
        "test"
      );
      expect(false).to.be.eq(result);
    });
  });

  describe("#predicateStartWith", () => {
    it("should return true if 'Jack' start with 'Ja'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateStartWith(
        student,
        "name",
        "Ja",
        false
      );
      expect(true).to.be.eq(result);
    });

    it("should return true if 'Jack' start with 'ja' with ignore case", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateStartWith(
        student,
        "name",
        "ja",
        true
      );
      expect(true).to.be.eq(result);
    });

    it("should return false if 'Jack' start with 'te'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateStartWith(
        student,
        "name",
        "te",
        false
      );
      expect(false).to.be.eq(result);
    });

    it("should return false if propertyValue is null or undefined", () => {
      const student = new Student();
      student.age = 18;
      const result = FilterHelper.predicateStartWith(
        student,
        "name",
        "te",
        false
      );
      expect(false).to.be.eq(result);
    });
  });

  describe("#predicateEndWith", () => {
    it("should return true if 'Jack' end with 'ck'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateEndWith(
        student,
        "name",
        "ck",
        false
      );
      expect(true).to.be.eq(result);
    });

    it("should return true if 'Jack' end with 'CK' with ignore case", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateEndWith(student, "name", "CK", true);
      expect(true).to.be.eq(result);
    });

    it("should return false if 'Jack' start with 'aa'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateEndWith(
        student,
        "name",
        "aa",
        false
      );
      expect(false).to.be.eq(result);
    });

    it("should return false if propertyValue is null or undefined", () => {
      const student = new Student();
      student.age = 18;
      const result = FilterHelper.predicateEndWith(
        student,
        "name",
        "te",
        false
      );
      expect(false).to.be.eq(result);
    });
  });

  describe("predicateContains", () => {
    it("should return true if 'Jack' constains 'ac'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateContains<Student>(
        student,
        "name",
        "ac",
        false
      );
      expect(true).to.be.eq(result);
    });

    it("should return true if 'Jack' ignore case constains 'AC'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateContains<Student>(
        student,
        "name",
        "AC",
        true
      );
      expect(true).to.be.eq(result);
    });

    it("should return false if 'Jack' ignore case constains 'test'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateContains<Student>(
        student,
        "name",
        "test",
        true
      );
      expect(false).to.be.eq(result);
    });

    it("should return false if propValue is null or undefinend", () => {
      const student = new Student();
      student.age = 18;
      const result = FilterHelper.predicateContains<Student>(
        student,
        "name",
        "test",
        true
      );
      expect(false).to.be.eq(result);
    });
  });

  describe("#predicateIn", () => {
    it("should return true if 18 in [16, 17, 18, 19]", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateIn<Student>(student, "age", [
        16,
        17,
        18,
        19
      ]);
      expect(true).to.be.eq(result);
    });

    it("should return false if 18 in [1, 2, 3, 4]", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateIn<Student>(student, "age", [
        1,
        2,
        3,
        4
      ]);
      expect(false).to.be.eq(result);
    });

    it("should return false if undefined in [1, 2, 3, 4]", () => {
      const student = new Student();
      student.name = "Jack";
      const result = FilterHelper.predicateIn<Student>(student, "age", [
        1,
        2,
        3,
        4
      ]);
      expect(false).to.be.eq(result);
    });

    it("should return false if 18 in '1,2,3,4'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;

      expect(() => {
        FilterHelper.predicateIn<Student>(student, "age", "1,2,3,4");
      }).to.throw('filter value of "IN" or "NOT_IN" operator must be array');
    });
  });

  describe("#predicateNotIn", () => {
    it("should return false if 18 not in [16, 17, 18, 19]", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateNotIn<Student>(student, "age", [
        16,
        17,
        18,
        19
      ]);
      expect(false).to.be.eq(result);
    });

    it("should return true if 18 not in [1, 2, 3, 4]", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateNotIn<Student>(student, "age", [
        1,
        2,
        3,
        4
      ]);
      expect(true).to.be.eq(result);
    });

    it("should return true if undefined not in [1, 2, 3, 4]", () => {
      const student = new Student();
      student.name = "Jack";
      const result = FilterHelper.predicateNotIn<Student>(student, "age", [
        1,
        2,
        3,
        4
      ]);
      expect(true).to.be.eq(result);
    });

    it("should return true if 18 not in '1,2,3,4'", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;

      expect(() => {
        FilterHelper.predicateNotIn<Student>(student, "age", "1,2,3,4");
      }).to.throw('filter value of "IN" or "NOT_IN" operator must be array');
    });
  });

  describe("#getFilterValues", () => {
    it("should reutrn [1, 2, 3] if opertor is 'IN' and filter value is [1 ,2 ,3]", () => {
      const array = [1, 2, 3];
      const result = FilterHelper.getFilterValues(FilterOperator.IN, array);
      expect(array).to.be.eq(result);
    });

    it("should reutrn [1, 2, 3] if opertor is 'NOT_IN' and filter value is [1 ,2 ,3]", () => {
      const array = [1, 2, 3];
      const result = FilterHelper.getFilterValues(FilterOperator.NOT_IN, array);
      expect(array).to.be.eq(result);
    });

    it("should reutrn [1, 2] if opertor is 'BETWEEN' and filter value is [1 ,2]", () => {
      const array = [1, 2];
      const result = FilterHelper.getFilterValues(
        FilterOperator.BETWEEN,
        array
      );
      expect(array).to.be.eq(result);
    });

    it("should reutrn exception if opertor is 'BETWEEN' and filter value is [1 ,2, 3]", () => {
    
      expect(() => {
        const array = [1, 2, 3];
        const result = FilterHelper.getFilterValues(
          FilterOperator.BETWEEN,
          array
        );
      }).to.throw(
        'if "BETWEEN" operator, the count of filter value must be 2'
      );
    });
  });
});
