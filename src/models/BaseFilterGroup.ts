import { ArrayUtils, ObjectUtils } from "ts-commons";
import { FilterCondition } from "../enums/FilterCondition";
import { FilterOperator } from "../enums/FilterOperator";
import { BaseFilterDescriptor } from "./BaseFilterDescriptor";
import { FilterDescriptor } from "./FilterDescriptor";
import { ComparableType } from "./ComparableType";
import { FilterGroupDescriptor } from "./FilterGroupDescriptor";

type SingleValueOperator =
  | FilterOperator.LESS_THAN
  | FilterOperator.LESS_THAN_OR_EQUAL
  | FilterOperator.EQUAL
  | FilterOperator.NOT_EQUAL
  | FilterOperator.GREATER_THAN_OR_EQUAL
  | FilterOperator.GREATER_THAN
  | FilterOperator.START_WITH
  | FilterOperator.END_WITH
  | FilterOperator.CONTAINS
  | FilterOperator.BITWISE_ANY
  | FilterOperator.BITWISE_ZERO
  | FilterOperator.BITWISE_ALL;

type CollectionValueOperator =
  | FilterOperator.IN
  | FilterOperator.NOT_IN
  | FilterOperator.BETWEEN;

export abstract class BaseFilterGroup<T> {
  protected filters: BaseFilterDescriptor<T>[] = [];

  public addFilter(filter: BaseFilterDescriptor<T>) {
    this.filters.push(filter);
    return this;
  }

  public addFilters(filters: BaseFilterDescriptor<T>[]) {
    this.filters = this.filters.concat(filters);
    return this;
  }

  public removeFilters(filters: BaseFilterDescriptor<T>[]) {
    for (const filter of filters) {
      ArrayUtils.remove(this.filters, filter);
    }
    return this;
  }

  public getFilters(): BaseFilterDescriptor<T>[] {
    return this.filters;
  }

  public and<TProp extends keyof T>(
    propertyPath: TProp,
    operator: SingleValueOperator,
    filterValue: T[TProp] & ComparableType
  ): this;
  public and<TProp extends keyof T>(
    enable: boolean,
    propertyPath: TProp,
    operator: SingleValueOperator,
    filterValue: T[TProp] & ComparableType
  ): this;
  public and<TProp extends keyof T>(
    propertyPath: TProp,
    operator: CollectionValueOperator,
    filterValue: Array<T[TProp] & ComparableType>
  ): this;
  public and<TProp extends keyof T>(
    enable: boolean,
    propertyPath: TProp,
    operator: CollectionValueOperator,
    filterValue: Array<T[TProp] & ComparableType>
  ): this;
  public and<TProp extends keyof T>(
    group: (g: BaseFilterGroup<T>) => BaseFilterGroup<T>
  ): this;
  public and<TProp extends keyof T>(
    enable: boolean,
    group: (g: BaseFilterGroup<T>) => BaseFilterGroup<T>
  ): this;
  public and(p1: any, p2?: any, p3?: any, p4?: any) {
    const p1Type = typeof p1;
    const p2Type = typeof p2;
    const p3Type = typeof p3;
    const p4Type = typeof p4;

    if (p1Type === "boolean" && p2Type === "string" && p3Type === "number") {
      this.andForFilter(p1, p2, p3, p4);
    } else if (p1Type === "string" && p2Type === "number") {
      this.andForFilter(true, p1, p2, p3);
    } else if (p1Type === "boolean" && p2Type === "function") {
      this.andForFilterGroup(p1, p2);
    } else if (p1Type === "function") {
      this.andForFilterGroup(true, p1);
    } else {
      throw new TypeError(
        `[ts-dynamic-query.BaseFilterGroup#and] can't resolve type. p1Type: ${p1Type}, p2Type: ${p2Type}, p3Type: ${p3Type}, p4Type: ${p4Type}`
      );
    }

    return this;
  }

  public or<TProp extends keyof T>(
    propertyPath: TProp,
    operator: SingleValueOperator,
    filterValue: T[TProp] & ComparableType
  ): this;
  public or<TProp extends keyof T>(
    enable: boolean,
    propertyPath: TProp,
    operator: SingleValueOperator,
    filterValue: T[TProp] & ComparableType
  ): this;
  public or<TProp extends keyof T>(
    propertyPath: TProp,
    operator: CollectionValueOperator,
    filterValue: Array<T[TProp] & ComparableType>
  ): this;
  public or<TProp extends keyof T>(
    enable: boolean,
    propertyPath: TProp,
    operator: CollectionValueOperator,
    filterValue: Array<T[TProp] & ComparableType>
  ): this;
  public or<TProp extends keyof T>(
    group: (g: BaseFilterGroup<T>) => BaseFilterGroup<T>
  ): this;
  public or<TProp extends keyof T>(
    enable: boolean,
    group: (g: BaseFilterGroup<T>) => BaseFilterGroup<T>
  ): this;
  public or(p1: any, p2?: any, p3?: any, p4?: any) {
    const p1Type = typeof p1;
    const p2Type = typeof p2;
    const p3Type = typeof p3;
    const p4Type = typeof p4;
    if (p1Type === "boolean" && p2Type === "string" && p3Type === "number") {
      this.orForFilter(p1, p2, p3, p4);
    } else if (p1Type === "string" && p2Type === "number") {
      this.orForFilter(true, p1, p2, p3);
    } else if (p1Type === "boolean" && p2Type === "function") {
      this.orForFilterGroup(p1, p2);
    } else if (p1Type === "function") {
      this.orForFilterGroup(true, p1);
    } else {
      throw new TypeError(
        `[ts-dynamic-query.BaseFilterGroup#or] can't resolve type. p1Type: ${p1Type}, p2Type: ${p2Type}, p3Type: ${p3Type}, p4Type: ${p4Type}`
      );
    }

    return this;
  }

  private andForFilter<TProp extends keyof T>(
    enable: boolean,
    propertyPath: TProp,
    operator: FilterOperator,
    filterValue: any
  ) {
    if (enable) {
      const filter = new FilterDescriptor<T>();
      filter.propertyPath = propertyPath.toString();
      filter.condition = FilterCondition.AND;
      filter.operator = operator;
      filter.value = filterValue;
      this.addFilter(filter);
    }
  }

  private orForFilter<TProp extends keyof T>(
    enable: boolean,
    propertyPath: TProp,
    operator: FilterOperator,
    filterValue: any
  ) {
    if (enable) {
      const filter = new FilterDescriptor<T>();
      filter.propertyPath = propertyPath.toString();
      filter.condition = FilterCondition.OR;
      filter.operator = operator;
      filter.value = filterValue;
      this.addFilter(filter);
    }
  }

  private andForFilterGroup(
    enable: boolean,
    group: (g: BaseFilterGroup<T>) => BaseFilterGroup<T>
  ) {
    if (enable) {
      const filterGroup = new FilterGroupDescriptor<T>();
      filterGroup.condition = FilterCondition.AND;
      group(filterGroup);
      this.addFilter(filterGroup);
    }
  }

  private orForFilterGroup(
    enable: boolean,
    group: (g: BaseFilterGroup<T>) => BaseFilterGroup<T>
  ) {
    if (enable) {
      const filterGroup = new FilterGroupDescriptor<T>();
      filterGroup.condition = FilterCondition.OR;
      group(filterGroup);
      this.addFilter(filterGroup);
    }
  }
}
