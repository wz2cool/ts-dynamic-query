import { SortDescriptorBase } from "./sortDescriptorBase";
import { FilterDescriptorBase } from "./filterDescriptorBase";
import { deserialize, serialize } from "class-transformer";
import { FilterHelper } from "../helpers";
import { FilterDescriptor } from "./filterDescriptor";
import { FilterGroupDescriptor } from "./filterGroupDescriptor";
import { FilterOptions } from "./filterOptions";
import { SortOptions } from "./sortOptions";
import { SortDescriptor } from "./sortDescriptor";

export class DynamicQuery<T> {
  public filters: FilterDescriptorBase[];
  public sorts: SortDescriptorBase[];
  constructor() {
    this.filters = [];
    this.sorts = [];
  }

  public addFilters(...filters: FilterDescriptorBase[]): DynamicQuery<T> {
    this.filters = this.filters.concat(filters);
    return this;
  }

  public addFilter(filterOptions: FilterOptions<T>) {
    const filter = new FilterDescriptor<T>(filterOptions);
    this.filters.push(filter);
    return this;
  }

  public addSorts(...sorts: SortDescriptorBase[]): DynamicQuery<T> {
    this.sorts = this.sorts.concat(sorts);
    return this;
  }

  public addSort(sortOptions: SortOptions<T>) {
    const sort = new SortDescriptor<T>(sortOptions);
    this.sorts.push(sort);
    return this;
  }

  public toJSON(): string {
    return serialize(this);
  }
  public fromJSON(json: string): DynamicQuery<T> {
    const obj = deserialize<DynamicQuery<T>>(DynamicQuery, json);
    this.filters = FilterHelper.getRealFilters<T>(obj.filters);
    this.sorts = FilterHelper.getRealSorts<T>(obj.sorts);
    return this;
  }
}
