import { expect } from "chai";
import { FilterDescriptor, DynamicQuery } from "../../src/models";
import { FilterOperator, FilterCondition } from "../../src/enums";
import { QueryProvider } from "../../src/providers";

describe(".QueryProvider", () => {
  class Student {
    name: string;
    age: number;
  }

  describe("#queryData", () => {
    it("get student where name is frank", () => {
      const students: Student[] = [];
      const s1 = new Student();
      s1.name = "frank";
      s1.age = 20;
      const s2 = new Student();
      s2.name = "marry";
      s2.age = 19;
      students.push(s1);
      students.push(s2);

      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.EQUAL,
        value: "Frank"
      });

      const query = new DynamicQuery();
      query.addFilters(nameFilter);

      const result = QueryProvider.query(students, query);
      console.log(JSON.stringify(result));
    });
  });
});
