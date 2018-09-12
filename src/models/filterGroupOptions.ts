import { FilterCondition } from "../enums/filterCondition";
import { FilterOptions } from "./filterOptions";

/**
 * The option for creating new instance of FilterGroupDescriptor class.
 */
export interface FilterGroupOptions<T> {
  /**
   * The condition of FilterGroupDescriptor
   */
  condition?: FilterCondition;
  /**
   * The option for creating new instance of FilterDescriptor class.
   */
  options: FilterOptions<T>[];
}
