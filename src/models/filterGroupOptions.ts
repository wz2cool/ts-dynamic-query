import { FilterCondition } from "../enums";
import { FilterOptions } from "./filterOptions";

export interface FilterGroupOptions<T> {
  condition?: FilterCondition;
  options?: FilterOptions<T>[];
}
