import { FilterCondition } from "../enums";

export abstract class FilterDescriptorBase {
  public condition: FilterCondition = FilterCondition.AND;
}
