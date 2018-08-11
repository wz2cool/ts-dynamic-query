import { FilterCondition } from "../enums";

export interface PredicteResult {
  condition: FilterCondition;
  value: boolean;
}
