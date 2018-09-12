import { SortDirection } from "../enums/sortDirection";

export interface SortOptions<T> {
  /**
   * the property of T object.
   */
  propertyPath: keyof T;
  /**
   * The condition of SortDescriptor
   */
  direction?: SortDirection;
}
