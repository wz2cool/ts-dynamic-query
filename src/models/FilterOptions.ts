import { FilterCondition } from "../enums/FilterCondition";
import { FilterOperator } from "../enums/FilterOperator";

/**
 * The option for creating new instance of FilterDescriptor class.
 */
export interface FilterOptions<T> {
  /**
   * The condition of FilterDescriptor
   */
  condition?: FilterCondition;
  /**
   * The property of T object.
   */
  propertyPath: keyof T;
  /**
   * The operators that you can use to compare a property value to a filter value.
   */
  operator: FilterOperator;
  /**
   * The value used in the comparisons.
   */
  value:
    | string
    | number
    | Date
    | boolean
    | Array<string | number | Date | boolean>
    | null;
  /**
   * Compare ignore case.
   */
  ignoreCase?: boolean;
}
