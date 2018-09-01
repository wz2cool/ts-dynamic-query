import { SortDirection } from "../enums/sortDirection";

export interface SortOptions<T> {
  propertyPath: keyof T;
  direction?: SortDirection;
}
