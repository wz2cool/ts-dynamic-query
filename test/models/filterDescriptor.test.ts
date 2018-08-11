import { expect } from "chai";
import { FilterDescriptor } from "../../src/models";
import { FilterOperator, FilterCondition } from "../../src/enums";
import { deserialize } from "class-transformer";

describe(".FilterDescriptor", () => {
  class Student {
    name: string;
    age: number;
  }
  describe("#propertyPath", () => {
    it("shoud return 'name' if propertyPath is 'name'", () => {
      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name"
      });

      expect("name").to.be.eq(nameFilter.propertyPath);
    });

    it("shoud return 'null' if propertyPath is not set", () => {
      const nameFilter = new FilterDescriptor<Student>({});
      expect(null).to.be.eq(nameFilter.propertyPath);
    });
  });

  describe("#serialize", () => {
    it("should to json", () => {
      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.EQUAL,
        value: "Frank"
      });

      const result = JSON.stringify(nameFilter);
      expect(
        `{"condition":0,"operator":2,"propertyPath":"name","value":"Frank"}`
      ).to.be.eq(result);
    });
  });

  describe("#deserialize", () => {
    it("should to json", () => {
      const json = `{"condition":0,"operator":2,"propertyPath":"name","value":"Frank"}`;
      const result = deserialize<FilterDescriptor<{}>>(FilterDescriptor, json);
      expect(FilterCondition.AND).to.be.eq(result.condition);
      expect(FilterOperator.EQUAL).to.be.eq(result.operator);
      expect("name").to.be.eq(result.propertyPath);
      expect("Frank").to.be.eq(result.value);
    });
  });
});
