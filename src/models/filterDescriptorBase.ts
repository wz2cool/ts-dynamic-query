import { FilterCondition } from "../enums";

export abstract class FilterDescriptorBase {
  public condition: FilterCondition = FilterCondition.AND;
  public abstract toJSON(): string;
  public abstract fromJSON(json: string): FilterDescriptorBase;
}
