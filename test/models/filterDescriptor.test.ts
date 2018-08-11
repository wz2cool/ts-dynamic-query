import { expect } from "chai";
import { FilterDescriptor } from "../../src/models";

describe(".FilterDescriptor", () => {
  class Student {
    name: string;
    age: number;
  }
  describe("#propertyPath", () => {
    it("shoud return 'name'", () => {
      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name"
      });
    });
  });
});
