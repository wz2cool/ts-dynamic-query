import { BaseFilterDescriptor } from "./BaseFilterDescriptor";
import { deserialize, serialize } from "class-transformer";
import { FilterDescriptor } from "./FilterDescriptor";
import { FilterHelper } from "../helpers/FilterHelper";
import { FilterOptions } from "./FilterOptions";
import { FilterCondition } from "../enums/FilterCondition";
import { BaseFilterGroup } from "./BaseFilterGroup";

/**
 * Initializes a new instance of the FilterGroupDescriptor class.
 */
export class FilterGroupDescriptor<T>
  extends BaseFilterGroup<T>
  implements BaseFilterDescriptor<T>
{
  public condition: FilterCondition = FilterCondition.AND;
  public readonly type: string = "FilterGroupDescriptor";

  public getCondition(): FilterCondition {
    return this.condition;
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
