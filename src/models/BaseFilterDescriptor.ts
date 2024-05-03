import { FilterCondition } from "../enums/FilterCondition";

/**
 * Base class for all FilterDescriptor.
 */
export interface BaseFilterDescriptor<T> {
  readonly type: string;
  getCondition(): FilterCondition;
  toJSON(): string;
  fromJSON(json: string): BaseFilterDescriptor<T>;
}
