import { expect } from "chai";
import { FilterHelper } from "../../src/helpers/FilterHelper";
import { FilterOperator } from "../../src/enums/FilterOperator";
import { ArrayUtils } from "ts-commons";
import { FilterDescriptor } from "../../src/models/FilterDescriptor";
import { FilterGroupDescriptor } from "../../src/models/FilterGroupDescriptor";
import { FilterCondition } from "../../src/enums/FilterCondition";

describe(".filterHelper", () => {
  enum Flag {
    FLAG_1 = 1,
    FLAG_2 = 2,
    FLAG_3 = 4,
    FLAG_4 = 8,
  }

  class Student {
    name: string;
    age: number;
    flag: Flag;
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
      const result = FilterHelper.predicateIn<Student>(
        student,
        "age",
        [16, 17, 18, 19]
      );
      expect(true).to.be.eq(result);
    });

    it("should return false if 18 in [1, 2, 3, 4]", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateIn<Student>(
        student,
        "age",
        [1, 2, 3, 4]
      );
      expect(false).to.be.eq(result);
    });

    it("should return false if undefined in [1, 2, 3, 4]", () => {
      const student = new Student();
      student.name = "Jack";
      const result = FilterHelper.predicateIn<Student>(
        student,
        "age",
        [1, 2, 3, 4]
      );
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
      const result = FilterHelper.predicateNotIn<Student>(
        student,
        "age",
        [16, 17, 18, 19]
      );
      expect(false).to.be.eq(result);
    });

    it("should return true if 18 not in [1, 2, 3, 4]", () => {
      const student = new Student();
      student.name = "Jack";
      student.age = 18;
      const result = FilterHelper.predicateNotIn<Student>(
        student,
        "age",
        [1, 2, 3, 4]
      );
      expect(true).to.be.eq(result);
    });

    it("should return true if undefined not in [1, 2, 3, 4]", () => {
      const student = new Student();
      student.name = "Jack";
      const result = FilterHelper.predicateNotIn<Student>(
        student,
        "age",
        [1, 2, 3, 4]
      );
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
      }).to.throw('if "BETWEEN" operator, the count of filter value must be 2');
    });

    it("should return exception if operator is 'IN' and filter value is 1", () => {
      expect(() => {
        FilterHelper.getFilterValues(FilterOperator.IN, 1);
      }).to.throw('filter value of "IN" or "NOT_IN" operator must be array');
    });

    it("should reutrn [1] if opertor is 'equal' and filter value is 1", () => {
      const result = FilterHelper.getFilterValues(FilterOperator.EQUAL, 1);
      expect(1).to.be.eq(result[0]);
    });
  });

  describe("#getRealFilters", () => {
    it("should return [] if sorts is []", () => {
      const result = FilterHelper.getRealFilters([]);
      expect(true).to.be.eq(ArrayUtils.isEmpty(result));
    });

    it("should return FilterDescriptor type", () => {
      const test = {
        type: "FilterDescriptor",
        operator: 1,
        propertyPath: "name",
      };
      const result = FilterHelper.getRealFilters([
        test as FilterDescriptor<Student>,
      ]);

      expect(true).to.be.eq(result[0] instanceof FilterDescriptor);
    });

    it("should return FilterGroupDescriptor type", () => {
      const test = {
        type: "FilterGroupDescriptor",
      };
      const result = FilterHelper.getRealFilters([
        test as FilterGroupDescriptor<Student>,
      ]);

      expect(true).to.be.eq(result[0] instanceof FilterGroupDescriptor);
    });
  });

  describe("#getValue", () => {
    it("should return undefined if value is null", () => {
      const result = FilterHelper.getValue(null);
      expect(undefined).to.be.eq(result);
    });

    it("should return undefined if value is undefined", () => {
      const result = FilterHelper.getValue(undefined);
      expect(undefined).to.be.eq(result);
    });

    it("should return 1 if value is 1", () => {
      const result = FilterHelper.getValue(1);
      expect(1).to.be.eq(result);
    });
  });

  describe("#predicateByFilterDescriptor", () => {
    const student = new Student();
    student.name = "Marry";
    student.age = 18;
    student.flag = Flag.FLAG_3;

    it("should return true by testing equal", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.EQUAL,
        value: 18,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return false by testing equal", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.EQUAL,
        value: 15,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(false).to.be.eq(result);
    });

    it("should return false by testing not equal", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.NOT_EQUAL,
        value: 18,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(false).to.be.eq(result);
    });

    it("should return true by testing not equal", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.NOT_EQUAL,
        value: 15,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return true by testing LESS_THAN", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.LESS_THAN,
        value: 20,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return true by testing LESS_THAN_OR_EQUAL", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.LESS_THAN_OR_EQUAL,
        value: 20,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return true by testing LESS_THAN_OR_EQUAL", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.LESS_THAN_OR_EQUAL,
        value: 18,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return true by testing GREATER_THAN_OR_EQUAL", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.GREATER_THAN_OR_EQUAL,
        value: 18,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return true by testing GREATER_THAN_OR_EQUAL", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.GREATER_THAN_OR_EQUAL,
        value: 12,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return true by testing GREATER_THAN", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.GREATER_THAN,
        value: 12,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return true by testing START_WITH", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.START_WITH,
        value: "Ma",
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return true by testing END_WITH", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.END_WITH,
        value: "ry",
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return true by testing CONTAINS", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.CONTAINS,
        value: "ar",
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return true by testing IN", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.IN,
        value: [1, 18, 20],
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return true by testing NOT_IN", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.NOT_IN,
        value: [1, 17, 20],
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return true by testing BETWEEN", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.BETWEEN,
        value: [1, 17],
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(false).to.be.eq(result);
    });

    it("should return false by testing BETWEEN", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.BETWEEN,
        value: [1, 20],
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return if not find operator", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: undefined,
        value: [1, 17, 20],
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(false).to.be.eq(result);
    });

    it("should return true if a & b > 0 by testing BITWISE_ANY", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "flag",
        operator: FilterOperator.BITWISE_ANY,
        value: Flag.FLAG_3 | Flag.FLAG_4,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return false if a & b === 0 by testing BITWISE_ANY", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "flag",
        operator: FilterOperator.BITWISE_ANY,
        value: Flag.FLAG_1 | Flag.FLAG_4,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(false).to.be.eq(result);
    });

    it("should return true if a & b == 0 by testing BITWISE_ZERO", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "flag",
        operator: FilterOperator.BITWISE_ZERO,
        value: Flag.FLAG_1 | Flag.FLAG_4,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return false if a & b > 0 by testing BITWISE_ZERO", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "flag",
        operator: FilterOperator.BITWISE_ZERO,
        value: Flag.FLAG_3 | Flag.FLAG_4,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(false).to.be.eq(result);
    });

    it("should return true if a & b == b by testing BITWISE_ALL", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "flag",
        operator: FilterOperator.BITWISE_ALL,
        value: Flag.FLAG_3,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(true).to.be.eq(result);
    });

    it("should return false if a & b !== 0 by testing BITWISE_ALL", () => {
      const filter = new FilterDescriptor<Student>({
        propertyPath: "flag",
        operator: FilterOperator.BITWISE_ALL,
        value: Flag.FLAG_1,
      });
      const result = FilterHelper.predicateByFilterDescriptor(student, filter);
      expect(false).to.be.eq(result);
    });
  });

  describe("#predicateByFilterGroupDescriptor", () => {
    const student = new Student();
    student.name = "Marry";
    student.age = 18;
    it("should return true if multi 'and' condition", () => {
      const ageFilterGroup = new FilterGroupDescriptor<Student>();
      const ageFilter1 = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.GREATER_THAN,
        value: 10,
      });
      const ageFilter2 = new FilterDescriptor<Student>({
        propertyPath: "age",
        operator: FilterOperator.LESS_THAN,
        value: 20,
      });
      ageFilterGroup.addFilters([ageFilter1, ageFilter2]);

      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.START_WITH,
        value: "Ma",
      });

      const filterGroup = new FilterGroupDescriptor<Student>();
      filterGroup.addFilters([ageFilterGroup, nameFilter]);
      const result = FilterHelper.predicateByFilterGroupDescriptor(
        student,
        filterGroup
      );
      expect(true).to.be.eq(result);
    });

    it("should return false if multi 'or' condition", () => {
      const ageFilterGroup = new FilterGroupDescriptor<Student>();
      const ageFilter1 = new FilterDescriptor<Student>({
        condition: FilterCondition.OR,
        propertyPath: "age",
        operator: FilterOperator.GREATER_THAN,
        value: 20,
      });
      const ageFilter2 = new FilterDescriptor<Student>({
        condition: FilterCondition.OR,
        propertyPath: "age",
        operator: FilterOperator.LESS_THAN,
        value: 1,
      });
      ageFilterGroup.addFilters([ageFilter1, ageFilter2]);

      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.START_WITH,
        value: "Ma",
      });

      const filterGroup = new FilterGroupDescriptor<Student>();
      filterGroup.addFilters([ageFilterGroup, nameFilter]);
      const result = FilterHelper.predicateByFilterGroupDescriptor(
        student,
        filterGroup
      );
      expect(false).to.be.eq(result);
    });

    it("should return true if multi 'or' condition", () => {
      const ageFilterGroup = new FilterGroupDescriptor<Student>();
      const ageFilter1 = new FilterDescriptor<Student>({
        condition: FilterCondition.OR,
        propertyPath: "age",
        operator: FilterOperator.GREATER_THAN,
        value: 1,
      });
      const ageFilter2 = new FilterDescriptor<Student>({
        condition: FilterCondition.OR,
        propertyPath: "age",
        operator: FilterOperator.LESS_THAN,
        value: 20,
      });
      ageFilterGroup.addFilters([ageFilter1, ageFilter2]);

      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.START_WITH,
        value: "Ma",
      });

      const filterGroup = new FilterGroupDescriptor<Student>();
      filterGroup.addFilters([ageFilterGroup, nameFilter]);
      const result = FilterHelper.predicateByFilterGroupDescriptor(
        student,
        filterGroup
      );
      expect(true).to.be.eq(result);
    });

    it("should return true if filters is empty", () => {
      const filterGroup = new FilterGroupDescriptor<Student>();
      const result = FilterHelper.predicateByFilterGroupDescriptor(
        student,
        filterGroup
      );
      expect(true).to.be.eq(result);
    });

    it("should return false if filters constains null", () => {
      const ageFilterGroup = new FilterGroupDescriptor<Student>();
      const ageFilter1 = new FilterDescriptor<Student>({
        condition: FilterCondition.OR,
        propertyPath: "age",
        operator: FilterOperator.GREATER_THAN,
        value: 1,
      });
      const ageFilter2 = new FilterDescriptor<Student>({
        condition: FilterCondition.OR,
        propertyPath: "age",
        operator: FilterOperator.LESS_THAN,
        value: 20,
      });
      ageFilterGroup.addFilters([ageFilter1, ageFilter2]);

      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.START_WITH,
        value: "Ma",
      });

      const filterGroup = new FilterGroupDescriptor<Student>();
      filterGroup.addFilters([null, ageFilterGroup, nameFilter]);
      const result = FilterHelper.predicateByFilterGroupDescriptor(
        student,
        filterGroup
      );
      expect(false).to.be.eq(result);
    });
  });
});
