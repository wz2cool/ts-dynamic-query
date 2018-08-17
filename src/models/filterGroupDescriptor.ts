import { FilterDescriptorBase } from "./filterDescriptorBase";
import { deserialize, serialize } from "class-transformer";
import { FilterDescriptor } from "./filterDescriptor";
import { FilterHelper } from "../helpers";
import { FilterOptions } from ".";

export class FilterGroupDescriptor<T> extends FilterDescriptorBase {
  public filters: FilterDescriptorBase[];
  constructor() {
    super("FilterGroupDescriptor");
    this.filters = [];
  }

  public addFilters(filters: FilterDescriptorBase[]): FilterGroupDescriptor<T> {
    this.filters = this.filters.concat(filters);
    return this;
  }

  public addFilter(filterOptions: FilterOptions<T>): FilterGroupDescriptor<T> {
    const filter = new FilterDescriptor<T>(filterOptions);
    this.filters.push(filter);
    return this;
  }

  public toJSON(): string {
    return serialize(this);
  }
  public fromJSON(json: string): FilterGroupDescriptor<T> {
    const obj = deserialize<FilterGroupDescriptor<T>>(
      FilterGroupDescriptor,
      json
    );
    this.filters = FilterHelper.getRealFilters<T>(obj.filters);
    return this;
  }
}
