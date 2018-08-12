import { FilterCondition, FilterOperator } from "../enums";

export interface FilterOptions<T> {
  propertyPath?: keyof T;
  value?:
    | string
    | number
    | Date
    | boolean
    | Array<string | number | Date | boolean>
    | null;
  condition?: FilterCondition;
  operator?: FilterOperator;
  ignoreCase?: boolean;
}
