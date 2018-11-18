import { QueryProvider } from "../../src/providers/queryProvider";
import { expect } from "chai";
import { ArrayUtils, ObjectUtils } from "ts-commons";
import { FilterDescriptor } from "../../src/models/filterDescriptor";
import { FilterOperator } from "../../src/enums/filterOperator";
import { SortDescriptor } from "../../src/models/sortDescriptor";
import { DynamicQuery } from "../../src/models/dynamicQuery";

describe(".queryProvider", () => {
  class Student {
    name: string;
    age: number;
  }

  it("should return [] if datas is null", () => {
    const result = QueryProvider.query([], null);
    expect(true).to.be.eq(ArrayUtils.isEmpty(result));
  });

  it("should return [1,2] if query is null", () => {
    const result = QueryProvider.query([1, 2], null);
    expect(2).to.be.eq(result.length);
  });

  it("should works for filtering and sorting", () => {
    const s1 = new Student();
    s1.name = "Marry";
    s1.age = 18;
    const s2 = new Student();
    s2.name = "Atom";
    s2.age = 19;
    const s3 = new Student();
    s3.name = "ABC";
    s3.age = 20;

    const ageFitler = new FilterDescriptor<Student>({
      propertyPath: "age",
      operator: FilterOperator.LESS_THAN,
      value: 20
    });

    const nameSort = new SortDescriptor<Student>({
      propertyPath: "name"
    });

    const query = DynamicQuery.createQuery<Student>(Student)
      .addFilters([ageFitler])
      .addSorts([nameSort]);
    let result = QueryProvider.query([s1, s2, s3], query);
    expect("Atom").to.be.eq(result[0].name);

    const query2 = DynamicQuery.createQuery<Student>(Student).addSorts([
      nameSort
    ]);
    result = QueryProvider.query([s1, s2, s3], query2);
    expect("ABC").to.be.eq(result[0].name);
  });

  it("should only select name", () => {
    const s1 = new Student();
    s1.name = "Marry";
    s1.age = 18;
    const s2 = new Student();
    s2.name = "Atom";
    s2.age = 19;
    const s3 = new Student();
    s3.name = "ABC";
    s3.age = 20;

    const query = DynamicQuery.createQuery<Student>(Student).selectProperty(
      "name"
    );
    let result = QueryProvider.query([s1, s2, s3], query);
    expect(false).to.be.eq(ObjectUtils.isNullOrUndefined(result[0].name));
    expect(true).to.be.eq(ObjectUtils.isNullOrUndefined(result[0].age));
  });
});
