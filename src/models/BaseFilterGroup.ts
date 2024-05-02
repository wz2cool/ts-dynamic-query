import { ArrayUtils } from "ts-commons";
import { FilterCondition } from "../enums/FilterCondition";
import { FilterOperator } from "../enums/FilterOperator";
import { BaseFilterDescriptor } from "./BaseFilterDescriptor";
import { FilterDescriptor } from "./FilterDescriptor";
import { ComparableType } from "./ComparableType";

export abstract class BaseFilterGroup<T> {
  protected filters: BaseFilterDescriptor<T>[] = [];

  public addFilter(filter: BaseFilterDescriptor<T>) {
    this.filters.push(filter);
  }

  public addFilters(filters: BaseFilterDescriptor<T>[]) {
    this.filters = this.filters.concat(filters);
  }

  public removeFilters(...filters: BaseFilterDescriptor<T>[]) {
    for (const filter of filters) {
      ArrayUtils.remove(this.filters, filter);
    }
  }

  public getFilters(): BaseFilterDescriptor<T>[] {
    return this.filters;
  }

  public or<TProp extends keyof T>(
    enable: boolean = true,
    propertyPath: TProp,
    operator: FilterOperator,
    filterValue: T[TProp] & ComparableType
  ): this {
    if (enable) {
      const filter = new FilterDescriptor<T>();
      filter.propertyPath = propertyPath.toString();
      filter.condition = FilterCondition.OR;
      filter.operator = operator;
      filter.value = filterValue;
      this.addFilter(filter);
    }
    return this;
  }

  public and<TProp extends keyof T>(
    enable: boolean = true,
    propertyPath: TProp,
    operator: FilterOperator,
    filterValue: T[TProp] & ComparableType
  ): this {
    if (enable) {
      const filter = new FilterDescriptor<T>();
      filter.propertyPath = propertyPath.toString();
      filter.condition = FilterCondition.AND;
      filter.operator = operator;
      filter.value = filterValue;
      this.addFilter(filter);
    }
    return this;
  }
}
