import { ArrayUtils, ObjectUtils } from "ts-commons";
import { FilterCondition } from "../enums/FilterCondition";
import { FilterOperator } from "../enums/FilterOperator";
import { BaseFilterDescriptor } from "./BaseFilterDescriptor";
import { FilterDescriptor } from "./FilterDescriptor";
import { ComparableType } from "./ComparableType";
import { FilterGroupDescriptor } from "./FilterGroupDescriptor";

interface FilterDescriptorOption<T, TProp extends keyof T> {
  readonly kind?: "FilterDescriptorOption";
  enable?: boolean;
  propertyPath: TProp;
  operator: FilterOperator;
  filterValue: T[TProp] & ComparableType;
}

interface FilterGroupOption<T> {
  readonly kind?: "FilterGroupOption";
  group: (g: FilterGroupDescriptor<T>) => void;
}

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

  // public or<TProp extends keyof T>(
  //   option: FilterDescriptorOption<T, TProp> | FilterGroupOption<T>
  // ): this {
  //   if (option.kind === "FilterDescriptorOption") {
  //     this.orForFilterDescriptor(option);
  //   }
  //   return this;
  // }

  // public and<TProp extends keyof T>(
  //   option: FilterDescriptorOption<T, TProp> | FilterGroupOption<T>
  // ): this {
  //   if (option.kind === "FilterDescriptorOption") {
  //     this.andForFilterDescriptor(option);
  //   }
  //   return this;
  // }

  private andForFilterDescriptor<TProp extends keyof T>(
    enable: boolean,
    propertyPath: TProp,
    operator: FilterOperator,
    filterValue: T[TProp] & ComparableType
  ) {
    if (ObjectUtils.isNullOrUndefined(enable)) {
      const filter = new FilterDescriptor<T>();
      filter.propertyPath = propertyPath.toString();
      filter.condition = FilterCondition.AND;
      filter.operator = operator;
      filter.value = filterValue;
      this.addFilter(filter);
    }
  }

  private orForFilterDescriptor<TProp extends keyof T>(
    enable: boolean,
    propertyPath: TProp,
    operator: FilterOperator,
    filterValue: T[TProp] & ComparableType
  ) {
    if (ObjectUtils.isNullOrUndefined(enable)) {
      const filter = new FilterDescriptor<T>();
      filter.propertyPath = propertyPath.toString();
      filter.condition = FilterCondition.OR;
      filter.operator = operator;
      filter.value = filterValue;
      this.addFilter(filter);
    }
  }

  public and<TProp extends keyof T>(
    propertyPath: TProp,
    operator: FilterOperator,
    filterValue: T[TProp]
  ): this;
  public and<TProp extends keyof T>(
    enable: boolean,
    propertyPath: TProp,
    operator: FilterOperator,
    filterValue: T[TProp]
  ): this;
  public and(p1: any, p2: any, p3: any, p4?: any) {
    const p1Type = typeof p1;
    const p2Type = typeof p2;
    const p3Type = typeof p3;

    if (p1Type === "boolean" && p2Type === "string" && p3Type === "number") {
      this.andForFilterDescriptor(p1, p2, p3, p4);
    } else if (p2Type === "string" && p3Type === "number") {
      this.andForFilterDescriptor(true, p1, p2, p3);
    }

    return this;
  }

  public or<TProp extends keyof T>(
    propertyPath: TProp,
    operator: FilterOperator,
    filterValue: T[TProp]
  ): this;
  public or<TProp extends keyof T>(
    enable: boolean,
    propertyPath: TProp,
    operator: FilterOperator,
    filterValue: T[TProp]
  ): this;
  public or(p1: any, p2: any, p3: any, p4?: any) {
    const p1Type = typeof p1;
    const p2Type = typeof p2;
    const p3Type = typeof p3;

    if (p1Type === "boolean" && p2Type === "string" && p3Type === "number") {
      this.orForFilterDescriptor(p1, p2, p3, p4);
    } else if (p2Type === "string" && p3Type === "number") {
      this.orForFilterDescriptor(true, p1, p2, p3);
    }

    return this;
  }
}
