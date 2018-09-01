import { FilterCondition } from "../enums/filterCondition";
import { FilterOperator } from "../enums/filterOperator";

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
