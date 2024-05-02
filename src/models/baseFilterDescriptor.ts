import { FilterCondition } from "../enums/FilterCondition";

/**
 * Base class for all FilterDescriptor.
 */
export abstract class BaseFilterDescriptor {
  public condition: FilterCondition = FilterCondition.AND;
  public readonly type: string;
  public abstract toJSON(): string;
  public abstract fromJSON(json: string): BaseFilterDescriptor;
  constructor(type: string) {
    this.type = type;
  }
}
