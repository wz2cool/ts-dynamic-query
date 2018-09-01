import { FilterCondition } from "../enums/filterCondition";

export interface PredicteResult {
  condition: FilterCondition;
  value: boolean;
}
