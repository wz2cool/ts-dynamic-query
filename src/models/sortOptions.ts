import { SortDirection } from "../enums";

export interface SortOptions<T> {
  propertyPath: keyof T;
  direction?: SortDirection;
}
