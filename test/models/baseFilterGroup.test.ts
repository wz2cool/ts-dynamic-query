import { expect } from "chai";
import {
  DynamicQuery,
  FilterCondition,
  FilterDescriptor,
  FilterGroupDescriptor,
  FilterOperator,
  _between,
  _bitwiseAll,
  _bitwiseAny,
  _bitwiseZero,
  _contains,
  _endWith,
  _equal,
  _greaterThan,
  _greaterThanOrEqual,
  _in,
  _lessThan,
  _lessThanOrEqual,
  _notEqual,
  _notIn,
  _startWith,
} from "../../src";
import { BaseFilterGroup } from "../../src/models/BaseFilterGroup";

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
      expect(3).to.eq((filter.value as []).length);
    });

    it("propertyPath operator(notIn) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and(
        "p1",
        _notIn,
        [1, 2, 3]
      );
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_notIn).to.eq(filter.operator);
      expect(3).to.eq((filter.value as []).length);
    });

    it("propertyPath operator(BETWEEN) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and(
        "p1",
        _between,
        [1, 3]
      );
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_between).to.eq(filter.operator);
      expect(2).to.eq((filter.value as []).length);
    });

    it("propertyPath operator(BITWISE_ANY) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and("p1", _bitwiseAny, 5);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_bitwiseAny).to.eq(filter.operator);
      expect(5).to.eq(filter.value);
    });

    it("propertyPath operator(BITWISE_ZERO) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and("p1", _bitwiseZero, 5);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_bitwiseZero).to.eq(filter.operator);
      expect(5).to.eq(filter.value);
    });

    it("propertyPath operator(BITWISE_ALL) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and("p1", _bitwiseAll, 5);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_bitwiseAll).to.eq(filter.operator);
      expect(5).to.eq(filter.value);
    });

    it("enable(true) propertyPath operator(equal) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and(true, "p1", _equal, 5);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.AND).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_equal).to.eq(filter.operator);
      expect(5).to.eq(filter.value);
    });

    it("enable(false) propertyPath operator(equal) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).and(
        false,
        "p1",
        _equal,
        5
      );

      expect(0).to.eq(query.getFilters().length);
    });
  });

  describe("#or", () => {
    it("propertyPath operator(lessThan) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or("p1", _lessThan, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_lessThan).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(lessThanOrEqual) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or(
        "p1",
        _lessThanOrEqual,
        1
      );
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_lessThanOrEqual).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(equal) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or("p1", _equal, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_equal).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(notEqual) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or("p1", _notEqual, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_notEqual).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(greaterThanOrEqual) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or(
        "p1",
        _greaterThanOrEqual,
        1
      );
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_greaterThanOrEqual).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(greaterThan) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or("p1", _greaterThan, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_greaterThan).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(startWith) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or("p1", _startWith, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_startWith).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(endWith) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or("p1", _endWith, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_endWith).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(contains) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or("p1", _contains, 1);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_contains).to.eq(filter.operator);
      expect(1).to.eq(filter.value);
    });

    it("propertyPath operator(in) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or("p1", _in, [1, 2, 3]);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_in).to.eq(filter.operator);
      expect(3).to.eq((filter.value as []).length);
    });

    it("propertyPath operator(notIn) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or(
        "p1",
        _notIn,
        [1, 2, 3]
      );
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_notIn).to.eq(filter.operator);
      expect(3).to.eq((filter.value as []).length);
    });

    it("propertyPath operator(BETWEEN) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or("p1", _between, [1, 3]);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_between).to.eq(filter.operator);
      expect(2).to.eq((filter.value as []).length);
    });

    it("propertyPath operator(BITWISE_ANY) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or("p1", _bitwiseAny, 5);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_bitwiseAny).to.eq(filter.operator);
      expect(5).to.eq(filter.value);
    });

    it("propertyPath operator(BITWISE_ZERO) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or("p1", _bitwiseZero, 5);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_bitwiseZero).to.eq(filter.operator);
      expect(5).to.eq(filter.value);
    });

    it("propertyPath operator(BITWISE_ALL) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or("p1", _bitwiseAll, 5);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_bitwiseAll).to.eq(filter.operator);
      expect(5).to.eq(filter.value);
    });

    it("enable(true) propertyPath operator(equal) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or(true, "p1", _equal, 5);
      const filter = query.getFilters()[0] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter.condition);
      expect("p1").to.eq(filter.propertyPath);
      expect(_equal).to.eq(filter.operator);
      expect(5).to.eq(filter.value);
    });

    it("enable(false) propertyPath operator(equal) filterValue", () => {
      const query = DynamicQuery.createQuery(Model1).or(false, "p1", _equal, 5);
      expect(0).to.eq(query.getFilters().length);
    });

    it("group filter", () => {
      const query = DynamicQuery.createQuery(Model1).and((g) =>
        g.or("p1", _greaterThan, 1).or("p1", _lessThan, 5)
      );

      const filterGroup =
        query.getFilters()[0] as FilterGroupDescriptor<Model1>;
      const filters = filterGroup.getFilters();
      const filter1 = filters[0] as FilterDescriptor<Model1>;

      expect(FilterCondition.OR).to.eq(filter1.condition);
      expect("p1").to.eq(filter1.propertyPath);
      expect(_greaterThan).to.eq(filter1.operator);
      expect(1).to.eq(filter1.value);
      const filter2 = filters[1] as FilterDescriptor<Model1>;
      expect(FilterCondition.OR).to.eq(filter2.condition);
      expect("p1").to.eq(filter2.propertyPath);
      expect(_lessThan).to.eq(filter2.operator);
      expect(5).to.eq(filter2.value);
    });
  });
});
