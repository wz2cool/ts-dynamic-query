import { SortDescriptorBase } from "./sortDescriptorBase";
import { FilterDescriptorBase } from "./filterDescriptorBase";
import { deserialize, serialize } from "class-transformer";
import { FilterDescriptor } from "./filterDescriptor";
import { FilterGroupDescriptor } from "./filterGroupDescriptor";
import { FilterHelper } from "../helpers";

export class DynamicQuery {
  public filters: FilterDescriptorBase[];
  public sorts: SortDescriptorBase[];
  constructor() {
    this.filters = [];
    this.sorts = [];
  }

  public addFilters(...filters: FilterDescriptorBase[]): DynamicQuery {
    this.filters = this.filters.concat(filters);
    return this;
  }

  public addSorts(...sorts: SortDescriptorBase[]): DynamicQuery {
    this.sorts = this.sorts.concat(sorts);
    return this;
  }

  public toJSON(): string {
    return serialize(this);
  }
  public fromJSON(json: string): DynamicQuery {
    const obj = deserialize<DynamicQuery>(DynamicQuery, json);
    this.filters = FilterHelper.getRealFilters(obj.filters);
    this.sorts = FilterHelper.getRealSorts(obj.sorts);
    return this;
  }
}
