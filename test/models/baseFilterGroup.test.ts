import { expect } from "chai";
import {
  DynamicQuery,
  FilterCondition,
  FilterDescriptor,
  FilterOperator,
  _contains,
  _endWith,
  _equal,
  _greaterThan,
  _greaterThanOrEqual,
  _in,
  _lessThan,
  _lessThanOrEqual,
  _notEqual,
  _startWith,
} from "../../src";

describe(".BaseFilterGroup", () => {
  class Model1 {
    p1: number;
    p2: string;
  }

  describe("#addFilter", () => {
    it("add filter to group", () => {
      const p1Filter = new FilterDescriptor<Model1>({
        propertyPath: "p1",
        operator: FilterOperator.CONTAINS,
        value: true,
      });

      const query = DynamicQuery.createQuery(Model1).addFilter(p1Filter);
      const filterResult = query.getFilters()[0];
      expect(p1Filter).to.eq(filterResult);
    });
  });

  describe("#addFilters", () => {
    it("add filters to group", () => {
      const p1Filter = new FilterDescriptor<Model1>({
        propertyPath: "p1",
        operator: FilterOperator.CONTAINS,
        value: true,
      });

      const query = DynamicQuery.createQuery(Model1).addFilters([p1Filter]);
      const filterResult = query.getFilters()[0];
      expect(p1Filter).to.eq(filterResult);
    });
  });

  describe("#removeFilters", () => {
    it("remove filters to group", () => {
      const p1Filter = new FilterDescriptor<Model1>({
        propertyPath: "p1",
        operator: FilterOperator.CONTAINS,
        value: true,
      });

      const query = DynamicQuery.createQuery(Model1)
        .addFilters([p1Filter])
        .removeFilters([p1Filter]);

      expect(0).to.eq(query.getFilters().length);
    });
  });

  describe("#and", () => {
    it("propertyPath operator(lessThan) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and("p1", _lessThan, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_lessThan).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(lessThanOrEqual) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and(
        "p1",
        _lessThanOrEqual,
        1
      );
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_lessThanOrEqual).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(equal) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and("p1", _equal, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_equal).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(notEqual) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and("p1", _notEqual, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_notEqual).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(greaterThanOrEqual) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and(
        "p1",
        _greaterThanOrEqual,
        1
      );
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_greaterThanOrEqual).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(greaterThan) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and("p1", _greaterThan, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_greaterThan).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(startWith) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and("p1", _startWith, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_startWith).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(endWith) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and("p1", _endWith, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_endWith).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(contains) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and("p1", _contains, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_contains).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(in) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and("p1", _in, [1, 2, 3]);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_in).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });
  });
});
