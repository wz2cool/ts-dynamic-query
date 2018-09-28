import { FilterDescriptorBase } from "./filterDescriptorBase";
import { deserialize, serialize } from "class-transformer";
import { FilterDescriptor } from "./filterDescriptor";
import { FilterHelper } from "../helpers/filterHelper";
import { FilterOptions } from "./filterOptions";

/**
 * Initializes a new instance of the FilterGroupDescriptor class.
 */
export class FilterGroupDescriptor<T> extends FilterDescriptorBase {
  public filters: FilterDescriptorBase[];
  constructor() {
    super("FilterGroupDescriptor");
    this.filters = [];
  }

  /**
   * Add filter array to group.
   * @param filters
   */
  public addFilters(filters: FilterDescriptorBase[]): FilterGroupDescriptor<T> {
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
