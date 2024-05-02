import { FilterDescriptor } from "../models/FilterDescriptor";
import { BaseFilterDescriptor } from "../models/BaseFilterDescriptor";
import { FilterGroupDescriptor } from "../models/FilterGroupDescriptor";
import { FilterOperator } from "../enums/FilterOperator";
import { FilterCondition } from "../enums/FilterCondition";
import { ObjectUtils, StringUtils, ArrayUtils } from "ts-commons";
import { serialize } from "class-transformer";

export class FilterHelper {
  public static predicateByFilters<T>(
    obj: T,
    filters: BaseFilterDescriptor[]
  ): boolean {
    const filterGroupDescriptor = new FilterGroupDescriptor<T>();
    filterGroupDescriptor.addFilters(filters);
    return this.predicateByFilterGroupDescriptor(obj, filterGroupDescriptor);
  }

  public static predicateByFilterGroupDescriptor<T>(
    obj: T,
    filterGroupDescriptor: FilterGroupDescriptor<T>
  ): boolean {
    const filters = filterGroupDescriptor.filters;
    if (ArrayUtils.isEmpty(filters)) {
      return true;
    }
    let result: boolean | null = null; // if filter is empty, result default value is true
    for (const filter of filters) {
      if (
        result === false &&
        !ObjectUtils.isNullOrUndefined(filter) &&
        filter.getCondition() === FilterCondition.AND
      ) {
        continue;
      }

      if (
        result === true &&
        !ObjectUtils.isNullOrUndefined(filter) &&
        filter.getCondition() === FilterCondition.OR
      ) {
        continue;
      }

      let predictResult;
      if (filter instanceof FilterDescriptor) {
        predictResult = this.predicateByFilterDescriptor<T>(obj, filter);
      } else if (filter instanceof FilterGroupDescriptor) {
        predictResult = this.predicateByFilterGroupDescriptor<T>(obj, filter);
      } else {
        predictResult = false;
      }

      if (ObjectUtils.isNullOrUndefined(result)) {
        result = predictResult;
      } else {
        switch (filter.getCondition()) {
          case FilterCondition.AND:
            result = result && predictResult;
            break;
          case FilterCondition.OR:
            result = result || predictResult;
            break;
        }
      }
    }
    return result;
  }

  public static predicateByFilterDescriptor<T>(
    obj: T,
    FilterDescriptor: FilterDescriptor<T>
  ): boolean {
    const operator = FilterDescriptor.operator;
    const propertyPath = FilterDescriptor.propertyPath;
    const filterValue = FilterDescriptor.value;
    const ignoreCase = FilterDescriptor.ignoreCase;
    switch (operator) {
      case FilterOperator.EQUAL:
        return this.predicateEqual(obj, propertyPath, filterValue, ignoreCase);
      case FilterOperator.NOT_EQUAL:
        return this.predicateNotEqual(
          obj,
          propertyPath,
          filterValue,
          ignoreCase
        );
      case FilterOperator.LESS_THAN:
        return this.predicateLessThan(obj, propertyPath, filterValue);
      case FilterOperator.LESS_THAN_OR_EQUAL:
        return this.predicateLessThanOrEqual(obj, propertyPath, filterValue);
      case FilterOperator.GREATER_THAN_OR_EQUAL:
        return this.predicateGreaterThanOrEqual(obj, propertyPath, filterValue);
      case FilterOperator.GREATER_THAN:
        return this.predicateGreaterThan(obj, propertyPath, filterValue);
      case FilterOperator.START_WITH:
        return this.predicateStartWith(
          obj,
          propertyPath,
          filterValue,
          ignoreCase
        );
      case FilterOperator.END_WITH:
        return this.predicateEndWith(
          obj,
          propertyPath,
          filterValue,
          ignoreCase
        );
      case FilterOperator.CONTAINS:
        return this.predicateContains(
          obj,
          propertyPath,
          filterValue,
          ignoreCase
        );
      case FilterOperator.IN:
        return this.predicateIn(obj, propertyPath, filterValue);
      case FilterOperator.NOT_IN:
        return this.predicateNotIn(obj, propertyPath, filterValue);
      case FilterOperator.BETWEEN:
        const filterValues = this.getFilterValues(
          FilterOperator.BETWEEN,
          filterValue
        );
        return (
          this.predicateGreaterThanOrEqual(
            obj,
            propertyPath,
            filterValues[0]
          ) && this.predicateLessThanOrEqual(obj, propertyPath, filterValues[1])
        );
      case FilterOperator.BITWISE_ANY:
        return this.predicateBitwiseAny(obj, propertyPath, filterValue);
      case FilterOperator.BITWISE_ZERO:
        return this.predicateBitwiseZero(obj, propertyPath, filterValue);
      case FilterOperator.BITWISE_ALL:
        return this.predicateBitwiseAll(obj, propertyPath, filterValue);
      default:
        return false;
    }
  }

  public static predicateEqual<T>(
    obj: T,
    propertyPath: string,
    filterValue: any,
    ignoreCase
  ): boolean {
    const propValue = obj[propertyPath];
    if (typeof propValue === "string" && typeof filterValue === "string") {
      return ignoreCase
        ? StringUtils.equalsIgnoreCase(propValue, filterValue)
        : StringUtils.equals(propValue, filterValue);
    } else {
      const userPropValue = this.getValue(propValue);
      const useFilterValue = this.getValue(filterValue);
      return userPropValue === useFilterValue;
    }
  }

  public static predicateNotEqual<T>(
    obj: T,
    propertyPath: string,
    filterValue: any,
    ignoreCase
  ): boolean {
    return !this.predicateEqual(obj, propertyPath, filterValue, ignoreCase);
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
    filterValue: any,
    ignoreCase: boolean
  ): boolean {
    const propValue = obj[propertyPath];
    if (ObjectUtils.isNullOrUndefined(propValue)) {
      return false;
    }
    const usePropValue = ObjectUtils.toSafeString(propValue);
    const useFilterValue = ObjectUtils.toSafeString(filterValue);
    return ignoreCase
      ? StringUtils.startWithIgnoreCase(usePropValue, useFilterValue)
      : StringUtils.startWith(usePropValue, useFilterValue);
  }

  public static predicateEndWith<T>(
    obj: T,
    propertyPath: string,
    filterValue: any,
    ignoreCase: boolean
  ): boolean {
    const propValue = obj[propertyPath];
    if (ObjectUtils.isNullOrUndefined(propValue)) {
      return false;
    }
    const usePropValue = ObjectUtils.toSafeString(propValue);
    const useFilterValue = ObjectUtils.toSafeString(filterValue);
    return ignoreCase
      ? StringUtils.endWithIgnoreCase(usePropValue, useFilterValue)
      : StringUtils.endWith(usePropValue, useFilterValue);
  }

  public static predicateContains<T>(
    obj: T,
    propertyPath: string,
    filterValue: any,
    ignoreCase: boolean
  ): boolean {
    const propValue = obj[propertyPath];
    if (ObjectUtils.isNullOrUndefined(propValue)) {
      return false;
    }
    const usePropValue = ObjectUtils.toSafeString(propValue);
    const useFilterValue = ObjectUtils.toSafeString(filterValue);
    return ignoreCase
      ? StringUtils.containsIgnoreCase(usePropValue, useFilterValue)
      : StringUtils.contains(usePropValue, useFilterValue);
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
    return !this.predicateIn(obj, propertyPath, filterValue);
  }

  public static predicateBitwiseAny<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    return (propValue & filterValue) > 0;
  }

  public static predicateBitwiseZero<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    return (propValue & filterValue) === 0;
  }

  public static predicateBitwiseAll<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    return (propValue & filterValue) === filterValue;
  }

  public static getFilterValues(
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

  public static getRealFilters<T>(
    filters: BaseFilterDescriptor[]
  ): BaseFilterDescriptor[] {
    if (ArrayUtils.isEmpty(filters)) {
      return [];
    }

    const result: BaseFilterDescriptor[] = [];
    for (const filterBase of filters || []) {
      const filterJson = serialize(filterBase);
      switch (filterBase.type) {
        case "FilterDescriptor":
          result.push(new FilterDescriptor<T>().fromJSON(filterJson));
          break;
        case "FilterGroupDescriptor":
          result.push(new FilterGroupDescriptor().fromJSON(filterJson));
          break;
      }
    }
    return result;
  }

  public static getValue(value: any): any {
    return ObjectUtils.isNullOrUndefined(value) ? undefined : value;
  }
}
