import { expect } from "chai";
import { FilterDescriptor, SortDescriptor } from "../../src/models";
import {
  FilterOperator,
  FilterCondition,
  SortDirection
} from "../../src/enums";

describe(".SortDescriptor", () => {
  class Student {
    name: string;
    age: number;
  }

  describe("#init", () => {
    it("get default value", () => {
      const sortDescriptor = new SortDescriptor();
      expect(SortDirection.ASC).to.be.eq(sortDescriptor.direction);
      expect(null).to.be.eq(sortDescriptor.propertyPath);
    });

    it("init by option", () => {
      const sortDescriptor = new SortDescriptor<Student>({
        propertyPath: "age",
        direction: SortDirection.DESC
      });

      expect(SortDirection.DESC).to.be.eq(sortDescriptor.direction);
      expect("age").to.be.eq(sortDescriptor.propertyPath);
    });
  });

  describe("#toJSON", () => {
    it("serilize to json", () => {
      const sortDescriptor = new SortDescriptor<Student>({
        propertyPath: "age",
        direction: SortDirection.DESC
      });
      const json = sortDescriptor.toJSON();
      expect(
        '{"direction":1,"type":"SortDescriptor","propertyPath":"age"}'
      ).to.be.eq(json);
    });
  });

  describe("#fromJSON", () => {
    it("get value", () => {
      const json =
        '{"direction":1,"type":"SortDescriptor","propertyPath":"age"}';
      const sortDescriptor = new SortDescriptor().fromJSON(json);
      expect(SortDirection.DESC).to.be.eq(sortDescriptor.direction);
      expect("age").to.be.eq(sortDescriptor.propertyPath);
    });
  });
});
