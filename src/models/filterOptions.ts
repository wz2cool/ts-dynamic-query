import { FilterCondition } from "../enums/filterCondition";
import { FilterOperator } from "../enums/filterOperator";

/**
 * The option for creating new instance of FilterDescriptor class.
 */
export interface FilterOptions<T> {
  /**
   * the condition of FilterDescriptor
   */
  condition?: FilterCondition;
  /**
   * the property of T object.
   */
  propertyPath: keyof T;
  /**
   * the operators that you can use to compare a property value to a filter value.
   */
  operator: FilterOperator;
  value:
    | string
    | number
    | Date
    | boolean
    | Array<string | number | Date | boolean>
    | null;
  ignoreCase?: boolean;
}
