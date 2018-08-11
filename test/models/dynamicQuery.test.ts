import { expect } from "chai";
import { FilterDescriptor, DynamicQuery } from "../../src/models";
import { FilterOperator, FilterCondition } from "../../src/enums";

describe(".FilterDescriptor", () => {
  class Student {
    name: string;
    age: number;
  }

  describe("#serialize", () => {
    it("should to json", () => {
      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.EQUAL,
        value: "Frank"
      });

      const query = new DynamicQuery();
      query.addFilters(nameFilter);
      const result = query.toJSON();
      expect(
        `{"filters":[{"condition":0,"operator":2,"propertyPath":"name","value":"Frank"}],"sorts":[]}`
      ).to.be.eq(result);
    });
  });

  describe("#deserialize", () => {
    it("should to json", () => {
      const json = `{"filters":[{"condition":0,"operator":2,"propertyPath":"name","value":"Frank"}],"sorts":[]}`
      const result = new DynamicQuery().fromJSON(json);
        
    });
  });
});
