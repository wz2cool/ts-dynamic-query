import { BaseFilterDescriptor } from "./BaseFilterDescriptor";
import { deserialize, serialize } from "class-transformer";
import { FilterDescriptor } from "./FilterDescriptor";
import { FilterHelper } from "../helpers/FilterHelper";
import { FilterOptions } from "./FilterOptions";
import { FilterCondition } from "../enums/FilterCondition";

/**
 * Initializes a new instance of the FilterGroupDescriptor class.
 */
export class FilterGroupDescriptor<T> implements BaseFilterDescriptor {
  public condition: FilterCondition = FilterCondition.AND;
  public readonly type: string = "FilterGroupDescriptor";
  public filters: BaseFilterDescriptor[];
  constructor() {
    this.filters = [];
  }

  public getCondition(): FilterCondition {
    return this.condition;
  }

  /**
   * Add filter array to group.
   * @param filters
   */
  public addFilters(filters: BaseFilterDescriptor[]): FilterGroupDescriptor<T> {
    this.filters = this.filters.concat(filters);
    return this;
  }

  /**
   * Add filter item to group
   * @param filterOptions
   */
  public addFilter(filterOptions: FilterOptions<T>): FilterGroupDescriptor<T> {
    const filter = new FilterDescriptor<T>(filterOptions);
    this.filters.push(filter);
    return this;
  }

  /**
   * Serialize current FilterGroupDescriptor to json string.
   */
  public toJSON(): string {
    return serialize(this);
  }

  /**
   * Deserialize json string to instance of FilterGroupDescriptor.
   * @param json
   */
  public fromJSON(json: string): FilterGroupDescriptor<T> {
    const obj = deserialize<FilterGroupDescriptor<T>>(
      FilterGroupDescriptor,
      json
    );
    this.filters = FilterHelper.getRealFilters<T>(obj.filters);
    this.condition = obj.condition;
    return this;
  }
}
