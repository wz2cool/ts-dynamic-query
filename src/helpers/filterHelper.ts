import {
  FilterDescriptor,
  FilterDescriptorBase,
  FilterGroupDescriptor,
  SortDescriptorBase,
  SortDescriptor,
  PredicteResult
} from "../models";
import { FilterOperator, FilterCondition } from "../enums";
import { ObjectUtils, StringUtils, ArrayUtils } from "ts-commons";
import { deserialize, serialize } from "class-transformer";

export class FilterHelper {
  public static predicateByFilterGroupDescriptor<T>(
    obj: T,
    filterGroupDescriptor: FilterGroupDescriptor
  ): boolean {
    const filters = filterGroupDescriptor.filters;
    let result = true;

    for (const filter of filters) {
      let predictResult = true;
      if (filter instanceof FilterDescriptor) {
        predictResult = this.predicateByFilterDescriptor(obj, filter);
      } else if (filter instanceof FilterGroupDescriptor) {
        predictResult = this.predicateByFilterGroupDescriptor(obj, filter);
      }

      switch (filter.condition) {
        case FilterCondition.AND:
          result = result && predictResult;
          break;
        case FilterCondition.OR:
          result = result || predictResult;
          break;
      }
    }
    return result;
  }

  public static predicateByFilterDescriptor<T>(
    obj: T,
    filterDescriptor: FilterDescriptor<T>
  ): boolean {
    const operator = filterDescriptor.operator;
    const propertyPath = filterDescriptor.propertyPath;
    const filterValue = filterDescriptor.value;
    switch (operator) {
      case FilterOperator.NOT_EQUAL:
        return this.predicateNotEqual(obj, propertyPath, filterValue);
      case FilterOperator.LESS_THAN:
        return this.predicateLessThan(obj, propertyPath, filterValue);
      case FilterOperator.LESS_THAN_OR_EQUAL:
        return this.predicateLessThanOrEqual(obj, propertyPath, filterValue);
      case FilterOperator.GREATER_THAN_OR_EQUAL:
        return this.predicateGreaterThanOrEqual(obj, propertyPath, filterValue);
      case FilterOperator.GREATER_THAN:
        return this.predicateGreaterThan(obj, propertyPath, filterValue);
      case FilterOperator.START_WITH:
        return this.predicateStartWith(obj, propertyPath, filterValue);
      case FilterOperator.END_WITH:
        return this.predicateEndWith(obj, propertyPath, filterValue);
      case FilterOperator.CONTAINS:
        return this.predicateContains(obj, propertyPath, filterValue);
      case FilterOperator.IN:
        return this.predicateIn(obj, propertyPath, filterValue);
      case FilterOperator.NOT_IN:
        return this.predicateNotIn(obj, propertyPath, filterValue);
      case FilterOperator.BETWEEN:
        throw new Error("current not support between");
      default:
        return false;
    }
  }

  public static predicateEqual<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    const userPropValue = this.getValue(propValue);
    const useFilterValue = this.getValue(filterValue);
    return userPropValue === useFilterValue;
  }

  public static predicateNotEqual<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    const userPropValue = this.getValue(propValue);
    const useFilterValue = this.getValue(filterValue);
    return userPropValue !== useFilterValue;
  }

  public static predicateLessThan<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    const userPropValue = this.getValue(propValue);
    const useFilterValue = this.getValue(filterValue);
    return userPropValue < useFilterValue;
  }

  public static predicateLessThanOrEqual<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    const userPropValue = this.getValue(propValue);
    const useFilterValue = this.getValue(filterValue);
    return userPropValue <= useFilterValue;
  }

  public static predicateGreaterThanOrEqual<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    const userPropValue = this.getValue(propValue);
    const useFilterValue = this.getValue(filterValue);
    return userPropValue >= useFilterValue;
  }

  public static predicateGreaterThan<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    const userPropValue = this.getValue(propValue);
    const useFilterValue = this.getValue(filterValue);
    return userPropValue > useFilterValue;
  }

  public static predicateStartWith<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    if (ObjectUtils.isNullOrUndefined(propValue)) {
      return false;
    }
    const usePropValue = ObjectUtils.toSafeString(propValue);
    const useFilterValue = ObjectUtils.toSafeString(filterValue);
    return StringUtils.startWith(usePropValue, useFilterValue);
  }

  public static predicateEndWith<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    if (ObjectUtils.isNullOrUndefined(propValue)) {
      return false;
    }
    const usePropValue = ObjectUtils.toSafeString(propValue);
    const useFilterValue = ObjectUtils.toSafeString(filterValue);
    return StringUtils.endWith(usePropValue, useFilterValue);
  }

  public static predicateContains<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    if (ObjectUtils.isNullOrUndefined(propValue)) {
      return false;
    }
    const usePropValue = ObjectUtils.toSafeString(propValue);
    const useFilterValue = ObjectUtils.toSafeString(filterValue);
    return StringUtils.contains(usePropValue, useFilterValue);
  }

  public static predicateIn<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    const useFilterValues = this.getFilterValues(
      FilterOperator.IN,
      filterValue
    );
    return ArrayUtils.contains(useFilterValues, propValue);
  }

  public static predicateNotIn<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    const useFilterValues = this.getFilterValues(
      FilterOperator.NOT_IN,
      filterValue
    );
    return !ArrayUtils.contains(useFilterValues, propValue);
  }

  private static getFilterValues(
    operator: FilterOperator,
    filterValue: any
  ): any[] {
    let result: any[] = [];
    if (
      operator === FilterOperator.IN ||
      operator === FilterOperator.NOT_IN ||
      operator === FilterOperator.BETWEEN
    ) {
      if (ObjectUtils.isArray(filterValue)) {
        result = filterValue as any[];
        if (operator === FilterOperator.BETWEEN && result.length !== 2) {
          const errMsg =
            'if "BETWEEN" operator, the count of filter value must be 2';
          throw new TypeError(errMsg);
        }
      } else {
        const errMsg =
          'filter value of "IN" or "NOT_IN" operator must be array';
        throw new TypeError(errMsg);
      }
    } else {
      result.push(filterValue);
    }
    return result;
  }

  public static getRealFilters(
    filters: FilterDescriptorBase[]
  ): FilterDescriptorBase[] {
    if (ObjectUtils.isNullOrUndefined(filters) && ArrayUtils.isEmpty(filters)) {
      return [];
    }

    const result: FilterDescriptorBase[] = [];
    for (const filterBase of filters || []) {
      const filterJson = serialize(filterBase);
      switch (filterBase.type) {
        case "FilterDescriptor":
          result.push(new FilterDescriptor().fromJSON(filterJson));
          break;
        case "FilterGroupDescriptor":
          result.push(new FilterGroupDescriptor().fromJSON(filterJson));
          break;
      }
    }
    return result;
  }

  public static getRealSorts(
    sorts: SortDescriptorBase[]
  ): SortDescriptorBase[] {
    if (ObjectUtils.isNullOrUndefined(sorts) && ArrayUtils.isEmpty(sorts)) {
      return [];
    }

    const result: SortDescriptorBase[] = [];
    for (const filterBase of sorts || []) {
      const filterJson = serialize(filterBase);
      switch (filterBase.type) {
        case "SortDescriptor":
          result.push(new SortDescriptor().fromJSON(filterJson));
          break;
      }
    }
    return result;
  }

  private static getValue(value: any): any {
    return ObjectUtils.isNullOrUndefined(value) ? null : value;
  }
}
