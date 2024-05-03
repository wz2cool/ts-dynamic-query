import { FilterCondition } from "../enums/FilterCondition";
import { FilterOptions } from "./FilterOptions";

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
