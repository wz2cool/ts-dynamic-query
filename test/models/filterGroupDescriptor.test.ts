import { expect } from "chai";
import {
  FilterDescriptor,
  FilterGroupDescriptor,
  FilterOperator,
  FilterCondition
} from "../../src";
import { ObjectUtils, ArrayUtils } from "ts-commons";

describe(".FilterGroupDescriptor", () => {
  class Student {
    name: string;
    age: number;
  }

  describe("#init", () => {
    it("test defaultValue", () => {
      const nameFilter = new FilterGroupDescriptor();
      expect(FilterCondition.AND).to.be.eq(nameFilter.condition);
      expect(true).to.be.eq(ArrayUtils.isEmpty(nameFilter.filters));
    });
  });

  describe("#addFilters", () => {
    it("filter can be added", () => {
      const filter = new FilterDescriptor();
      const groupFilter = new FilterGroupDescriptor();
      groupFilter.addFilters([filter]);
      expect(filter).to.be.eq(groupFilter.filters[0]);
    });
  });

  describe("#addFilter", () => {
    it("filter can be added", () => {
      const groupFilter = new FilterGroupDescriptor<Student>();
      groupFilter.addFilter({
        propertyPath: "name",
        operator: FilterOperator.CONTAINS,
        value: "a"
      });
      const resultFilter = groupFilter.filters[0] as FilterDescriptor<any>;
      expect("name").to.be.eq(resultFilter.propertyPath);
      expect(FilterOperator.CONTAINS).to.be.eq(resultFilter.operator);
      expect("a").to.be.eq(resultFilter.value);
    });
  });

  describe("#toJSON", () => {
    const groupFilter = new FilterGroupDescriptor<Student>();
    groupFilter.addFilter({
      propertyPath: "name",
      operator: FilterOperator.CONTAINS,
      value: "a"
    });
    expect(
      `{"condition":0,"type":"FilterGroupDescriptor","filters":[{"condition":0,"type":"FilterDescriptor","operator":8,"propertyPath":"name","ignoreCase":false,"value":"a"}]}`
    ).to.be.eq(groupFilter.toJSON());
  });

  describe("#fromJSON", () => {
    // groupFilter.addFilter({
    //   propertyPath: "name",
    //   operator: FilterOperator.CONTAINS,
    //   value: "a"
    // });
    const json = `{"condition":0,"type":"FilterGroupDescriptor","filters":[{"condition":0,"type":"FilterDescriptor","operator":8,"propertyPath":"name","ignoreCase":false,"value":"a"}]}`;
    const groupFilter = new FilterGroupDescriptor<Student>().fromJSON(json);
    const resultFilter = groupFilter.filters[0] as FilterDescriptor<any>;
    expect("name").to.be.eq(resultFilter.propertyPath);
    expect(FilterOperator.CONTAINS).to.be.eq(resultFilter.operator);
    expect("a").to.be.eq(resultFilter.value);
  });
});
