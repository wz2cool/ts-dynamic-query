import { SortDirection } from "../enums/SortDirection";

export interface SortOptions<T> {
  propertyPath: keyof T;
  direction?: SortDirection;
}
