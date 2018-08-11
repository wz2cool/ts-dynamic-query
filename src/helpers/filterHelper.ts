import { FilterDescriptor } from "../models";
import { FilterOperator } from "../enums";
import { ObjectUtils } from "ts-commons";

export class FilterHelper {
  public static predicate<T>(
    obj: T,
    filterDescriptor: FilterDescriptor<T>
  ): boolean {
    const operator = filterDescriptor.operator;
    return false;
  }

  public static predicateEqual<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    const userPropValue = ObjectUtils.isNullOrUndefined(propValue)
      ? null
      : propValue;
    const useFilterValue = ObjectUtils.isNullOrUndefined(filterValue)
      ? null
      : filterValue;
    return userPropValue === useFilterValue;
  }

  public static predicateNotEqual<T>(
    obj: T,
    propertyPath: string,
    filterValue: any
  ): boolean {
    const propValue = obj[propertyPath];
    const userPropValue = ObjectUtils.isNullOrUndefined(propValue)
      ? null
      : propValue;
    const useFilterValue = ObjectUtils.isNullOrUndefined(filterValue)
      ? null
      : filterValue;
    return userPropValue !== useFilterValue;
  }

  public static;
}
