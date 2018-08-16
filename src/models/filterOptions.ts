import { FilterCondition, FilterOperator } from "../enums";

export interface FilterOptions<T> {
  condition?: FilterCondition;
  propertyPath: keyof T;
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
