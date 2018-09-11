import { FilterCondition } from "../enums/filterCondition";
import { FilterOptions } from "./filterOptions";

/**
 * The option for creating new instance of FilterGroupDescriptor class.
 */
export interface FilterGroupOptions<T> {
  condition?: FilterCondition;
  options: FilterOptions<T>[];
}
