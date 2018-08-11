import { FilterCondition, FilterOperator } from "../enums";

export interface FilterOptions<T> {
  propertyPath?: keyof T;
  value?: any;
  condition?: FilterCondition;
  operator?: FilterOperator;
}
