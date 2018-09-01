import { FilterCondition } from "../enums/filterCondition";

export abstract class FilterDescriptorBase {
  public condition: FilterCondition = FilterCondition.AND;
  public readonly type: string;
  public abstract toJSON(): string;
  public abstract fromJSON(json: string): FilterDescriptorBase;
  constructor(type: string) {
    this.type = type;
  }
}
