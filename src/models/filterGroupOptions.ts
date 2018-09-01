import { FilterCondition } from "../enums/filterCondition";
import { FilterOptions } from "./filterOptions";

export interface FilterGroupOptions<T> {
  condition?: FilterCondition;
  options: FilterOptions<T>[];
}
