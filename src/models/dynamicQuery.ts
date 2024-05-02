import { SortDescriptorBase } from "./SortDescriptorBase";
import { BaseFilterDescriptor } from "./BaseFilterDescriptor";
import { deserialize, serialize } from "class-transformer";
import { FilterHelper } from "../helpers/FilterHelper";
import { FilterDescriptor } from "./FilterDescriptor";
import { FilterGroupDescriptor } from "./FilterGroupDescriptor";
import { FilterOptions } from "./FilterOptions";
import { SortOptions } from "./SortOptions";
import { SortDescriptor } from "./SortDescriptor";
import { FilterGroupOptions } from "./FilterGroupOptions";
import { ObjectUtils } from "ts-commons";
import { FilterCondition } from "../enums/FilterCondition";
import { QueryProvider } from "../providers/QueryProvider";
import { SortHelper } from "../helpers/SortHelper";

export class DynamicQuery<T> {
  public type: new () => T;
  public filters: BaseFilterDescriptor[];
  public sorts: SortDescriptorBase[];
  public selectedProperties: string[];
  constructor() {
    this.filters = [];
    this.sorts = [];
    this.selectedProperties = [];
  }

  public static createQuery<T>(type: new () => T): DynamicQuery<T> {
    const instance = new DynamicQuery<T>();
    instance.type = type;
    return instance;
  }

  public addFilters(filters: BaseFilterDescriptor[]): DynamicQuery<T> {
    this.filters = this.filters.concat(filters);
    return this;
  }

  public addFilterDescriptor(option: FilterOptions<T>): DynamicQuery<T> {
    const filter = new FilterDescriptor<T>(option);
    this.filters.push(filter);
    return this;
  }

  public addFilterGroupDescriptor(
    option: FilterGroupOptions<T>
  ): DynamicQuery<T> {
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

  public addSortDescriptor(sortOption: SortOptions<T>): DynamicQuery<T> {
    const sort = new SortDescriptor<T>(sortOption);
    this.sorts.push(sort);
    return this;
  }

  public selectProperty(property: keyof T): DynamicQuery<T> {
    const propertyStr = property.toString();
    this.selectedProperties.push(propertyStr);
    return this;
  }

  public selectProperties(...properties: (keyof T)[]): DynamicQuery<T> {
    const propertyStrs = properties.map((x) => x.toString());
    this.selectedProperties = this.selectedProperties.concat(propertyStrs);
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
    this.sorts = SortHelper.getRealSorts<T>(obj.sorts);
    return this;
  }
}
