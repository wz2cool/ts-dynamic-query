import { expect } from "chai";
import {
  FilterDescriptor,
  DynamicQuery,
  SortDescriptor,
  FilterGroupDescriptor
} from "../../src/models";
import {
  FilterOperator,
  FilterCondition,
  SortDirection
} from "../../src/enums";
import { ObjectUtils } from "ts-commons";

describe(".dynamicQuery", () => {
  class Student {
    name: string;
    age: number;
  }

  describe("#init", () => {
    it("should have default value", () => {
      const query = new DynamicQuery();
      expect(true).to.be.eq(ObjectUtils.isArray(query.filters));
      expect(true).to.be.eq(ObjectUtils.isArray(query.sorts));
    });
  });

  describe("#addFilters", () => {
    it("should add filters", () => {
      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.EQUAL,
        value: "test"
      });

      const query = new DynamicQuery<Student>().addFilters([nameFilter]);
      expect(nameFilter).to.be.eq(query.filters[0]);
    });
  });

  describe("#addSorts", () => {
    it("should add sorts", () => {
      const ageSort = new SortDescriptor<Student>({
        propertyPath: "age",
        direction: SortDirection.DESC
      });

      const query = new DynamicQuery<Student>().addSorts([ageSort]);
      expect(ageSort).to.be.eq(query.sorts[0]);
    });
  });

  describe("#addFilter", () => {
    it("should add filter option", () => {
      const query = new DynamicQuery<Student>().addFilter({
        propertyPath: "name",
        operator: FilterOperator.EQUAL,
        value: "test"
      });

      const filter = query.filters[0] as FilterDescriptor<any>;
      expect("name").to.be.eq(filter.propertyPath);
      expect(FilterOperator.EQUAL).to.be.eq(filter.operator);
      expect("test").to.be.eq(filter.value);
    });
  });

  describe("#addFilterGroup", () => {
    it("should add filterGroup", () => {
      const query = new DynamicQuery<Student>().addFilterGroup({
        options: [
          {
            propertyPath: "name",
            operator: FilterOperator.EQUAL,
            value: "test"
          },
          {
            propertyPath: "name",
            operator: FilterOperator.START_WITH,
            value: "aa"
          }
        ]
      });

      const groupFilter = query.filters[0] as FilterGroupDescriptor<Student>;
      const filter1 = groupFilter.filters[0] as FilterDescriptor<Student>;
      const filter2 = groupFilter.filters[1] as FilterDescriptor<Student>;
      expect(2).to.be.eq(groupFilter.filters.length);
      expect("name").to.be.eq(filter1.propertyPath);
      expect(FilterOperator.EQUAL).to.be.eq(filter1.operator);
      expect("test").to.be.eq(filter1.value);

      expect("name").to.be.eq(filter2.propertyPath);
      expect(FilterOperator.START_WITH).to.be.eq(filter2.operator);
      expect("aa").to.be.eq(filter2.value);
    });
  });
});
