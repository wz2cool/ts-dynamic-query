import { SortDescriptorBase } from "./sortDescriptorBase";
import { FilterDescriptorBase } from "./filterDescriptorBase";
import { deserialize, serialize } from "class-transformer";
import { FilterHelper } from "../helpers/filterHelper";
import { FilterDescriptor } from "./filterDescriptor";
import { FilterGroupDescriptor } from "./filterGroupDescriptor";
import { FilterOptions } from "./filterOptions";
import { SortOptions } from "./sortOptions";
import { SortDescriptor } from "./sortDescriptor";
import { FilterGroupOptions } from "./filterGroupOptions";
import { ObjectUtils } from "ts-commons";
import { FilterCondition } from "../enums/filterCondition";
import { QueryProvider } from "../providers/queryProvider";

export class DynamicQuery<T> {
  public filters: FilterDescriptorBase[];
  public sorts: SortDescriptorBase[];
  constructor() {
    this.filters = [];
    this.sorts = [];
  }

  public addFilters(filters: FilterDescriptorBase[]): DynamicQuery<T> {
    this.filters = this.filters.concat(filters);
    return this;
  }

  public addFilter(option: FilterOptions<T>): DynamicQuery<T> {
    const filter = new FilterDescriptor<T>(option);
    this.filters.push(filter);
    return this;
  }

  public addFilterGroup(option: FilterGroupOptions<T>): DynamicQuery<T> {
    const filterGroupDescriptor = new FilterGroupDescriptor<T>();
    filterGroupDescriptor.condition = ObjectUtils.isNullOrUndefined(
      option.condition
    )
      ? FilterCondition.AND
      : option.condition;
    for (const subOption of option.options) {
      filterGroupDescriptor.filters.push(new FilterDescriptor<T>(subOption));
    }
    this.filters.push(filterGroupDescriptor);
    return this;
  }

  public addSorts(sorts: SortDescriptorBase[]): DynamicQuery<T> {
    this.sorts = this.sorts.concat(sorts);
    return this;
  }

  public addSort(sortOption: SortOptions<T>): DynamicQuery<T> {
    const sort = new SortDescriptor<T>(sortOption);
    this.sorts.push(sort);
    sortOption;
    return this;
  }

  public query(datas: T[]): T[] {
    return QueryProvider.query(datas, this);
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
