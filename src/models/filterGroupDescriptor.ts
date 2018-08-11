import { FilterDescriptorBase } from "./filterDescriptorBase";
import { deserialize, serialize } from "class-transformer";

export class FilterGroupDescriptor extends FilterDescriptorBase {
  public filters: FilterDescriptorBase[];
  constructor() {
    super();
    this.filters = [];
  }

  public toJSON(): string {
    return serialize(this);
  }
  public fromJSON(json: string): FilterGroupDescriptor {
    const objs = deserialize<FilterGroupDescriptor>(
      FilterGroupDescriptor,
      json
    );
    this.filters = objs.filters || [];
    return this;
  }
}
