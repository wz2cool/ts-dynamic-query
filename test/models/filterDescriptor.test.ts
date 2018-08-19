import { expect } from "chai";
import { FilterDescriptor } from "../../src/models";
import { FilterOperator, FilterCondition } from "../../src/enums";

describe(".FilterDescriptor", () => {
  class Student {
    name: string;
    age: number;
  }

  describe("#init", () => {
    it("condition defualt value is AND", () => {
      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.CONTAINS,
        value: true
      });
      expect(FilterCondition.AND).to.be.eq(nameFilter.condition);
      expect(true).to.be.eq(nameFilter.value);
    });

    it("condition will be set value", () => {
      const nameFilter = new FilterDescriptor<Student>({
        condition: FilterCondition.OR,
        propertyPath: "name",
        operator: FilterOperator.CONTAINS,
        value: "test"
      });
      expect(FilterCondition.OR).to.be.eq(nameFilter.condition);
    });

    it("ignoreCase default value is false", () => {
      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.CONTAINS,
        value: "test"
      });
      expect(false).to.be.eq(nameFilter.ignoreCase);
    });

    it("ignoreCase will be set value", () => {
      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.CONTAINS,
        value: "test",
        ignoreCase: true
      });
      expect(true).to.be.eq(nameFilter.ignoreCase);
    });
  });

  describe("#propertyPath", () => {
    it("shoud return 'name' if propertyPath is 'name'", () => {
      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.CONTAINS,
        value: "test"
      });

      const student = new Student();
      console.log(student);

      expect("name").to.be.eq(nameFilter.propertyPath);
    });
  });

  describe("#serialize", () => {
    it("should serialize to json", () => {
      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.EQUAL,
        value: "Frank"
      });

      const result = nameFilter.toJSON();
      expect(
        '{"condition":0,"type":"FilterDescriptor","operator":2,"propertyPath":"name","ignoreCase":false,"value":"Frank"}'
      ).to.be.eq(result);
    });
  });

  describe("#deserialize", () => {
    it("should deserialize from json", () => {
      const json =
        '{"condition":1,"type":"FilterDescriptor","operator":2,"propertyPath":"name","ignoreCase":true,"value":"Frank"}';
      const result = new FilterDescriptor<{}>().fromJSON(json);
      expect(FilterCondition.OR).to.be.eq(result.condition);
      expect(FilterOperator.EQUAL).to.be.eq(result.operator);
      expect("name").to.be.eq(result.propertyPath);
      expect("Frank").to.be.eq(result.value);
      expect(true).to.be.eq(result.ignoreCase);
    });

    it("deserialize default value", () => {
      const json = "{}";
      const result = new FilterDescriptor<{}>().fromJSON(json);
      expect(FilterCondition.AND).to.be.eq(result.condition);
      expect(null).to.be.eq(result.propertyPath);
      expect(FilterOperator.EQUAL).to.be.eq(result.operator);
      expect(null).to.be.eq(result.value);
      expect(false).to.be.eq(result.ignoreCase);
    });
  });
});
