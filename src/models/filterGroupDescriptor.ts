import { FilterDescriptorBase } from "./filterDescriptorBase";
import { deserialize, serialize } from "class-transformer";
import { FilterDescriptor } from "./filterDescriptor";
import { FilterHelper } from "../helpers";

export class FilterGroupDescriptor extends FilterDescriptorBase {
  public filters: FilterDescriptorBase[];
  constructor() {
    super("FilterGroupDescriptor");
    this.filters = [];
  }

  public toJSON(): string {
    return serialize(this);
  }
  public fromJSON(json: string): FilterGroupDescriptor {
    const obj = deserialize<FilterGroupDescriptor>(FilterGroupDescriptor, json);
    this.filters = FilterHelper.getRealFilters(obj.filters);
    return this;
  }
}
