import { BaseSortDescriptor } from "./BaseSortDescriptor";
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
import { BaseFilterGroup } from "./BaseFilterGroup";
import { SortDirection } from "../enums/SortDirection";

export class DynamicQuery<T> extends BaseFilterGroup<T> {
  public type: new () => T;
  private sorts: BaseSortDescriptor[];
  private selectedProperties: string[];
  constructor() {
    super();
    this.filters = [];
    this.sorts = [];
    this.selectedProperties = [];
  }

  public static createQuery<T>(type: new () => T): DynamicQuery<T> {
    const instance = new DynamicQuery<T>();
    instance.type = type;
    return instance;
  }

  public addFilterDescriptor(option: FilterOptions<T>): this {
    const filter = new FilterDescriptor<T>(option);
    this.filters.push(filter);
    return this;
  }

  public addFilterGroupDescriptor(option: FilterGroupOptions<T>): this {
    const filterGroupDescriptor = new FilterGroupDescriptor<T>();
    filterGroupDescriptor.condition = ObjectUtils.isNullOrUndefined(option.condition) ? FilterCondition.AND : option.condition;
    for (const subOption of option.options) {
      filterGroupDescriptor.addFilter(new FilterDescriptor<T>(subOption));
    }
    this.filters.push(filterGroupDescriptor);
    return this;
  }

  public addSort(sort: BaseSortDescriptor): this {
    return this.addSorts([sort]);
  }

  public addSorts(sorts: BaseSortDescriptor[]): this {
    this.sorts = this.sorts.concat(sorts);
    return this;
  }

  public addSortDescriptor(sortOption: SortOptions<T>): this {
    const sort = new SortDescriptor<T>(sortOption);
    this.sorts.push(sort);
    return this;
  }

  public select(...properties: (keyof T)[]): this {
    const propertyStrs = properties.map((x) => x.toString());
    this.selectedProperties = this.selectedProperties.concat(propertyStrs);
    return this;
  }

  public orderBy(propertyPath: keyof T, direction?: SortDirection): this {
    return this.addSortDescriptor({
      propertyPath: propertyPath,
      // 默认升序
      direction: ObjectUtils.getOrDefault(direction, SortDirection.ASC),
    });
  }

  public getSorts(): BaseSortDescriptor[] {
    return this.sorts;
  }

  public getSelectedProperties(): string[] {
    return this.selectedProperties;
  }

  public query(datas: T[]): T[] {
    return QueryProvider.query(datas, this);
  }

  public findFirst(datas: T[]): T | undefined {
    return QueryProvider.findFirst(datas, this);
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
