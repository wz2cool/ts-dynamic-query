import { expect } from "chai";
import { FilterDescriptor } from "../../src/models";
import { FilterOperator, FilterCondition } from "../../src/enums";

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

      const student = new Student();
      console.log(student)

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

      const result = nameFilter.toJSON();
      expect(
        `{"filters":[{"condition":0,"type":"FilterDescriptor","operator":2,"propertyPath":"name","value":"Frank"}],"sorts":[]}`
      ).to.be.eq(result);
    });
  });

  describe("#deserialize", () => {
    it("should to json", () => {
      const json = `{"condition":0,"operator":2,"propertyPath":"name","value":"Frank"}`;
      const result = new FilterDescriptor<{}>().fromJSON(json);
      expect(FilterCondition.AND).to.be.eq(result.condition);
      expect(FilterOperator.EQUAL).to.be.eq(result.operator);
      expect("name").to.be.eq(result.propertyPath);
      expect("Frank").to.be.eq(result.value);
    });
  });
});
