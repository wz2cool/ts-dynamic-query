import { BaseFilterDescriptor } from "./BaseFilterDescriptor";
import { FilterOperator } from "../enums/FilterOperator";
import { FilterOptions } from "./FilterOptions";
import { deserialize, serialize } from "class-transformer";
import { ObjectUtils } from "ts-commons";
import { FilterCondition } from "../enums/FilterCondition";
import { ComparableType } from "./ComparableType";

/**
 * Initializes a new instance of the FilterDescriptor class.
 */
export class FilterDescriptor<T> implements BaseFilterDescriptor<T> {
  public condition: FilterCondition = FilterCondition.AND;
  public readonly type: string = "FilterDescriptor";
  public operator: FilterOperator = FilterOperator.EQUAL;
  public propertyPath: string = null;
  public ignoreCase: boolean = false;
  public value: ComparableType = null;

  constructor(options?: FilterOptions<T>) {
    if (options) {
      this.condition = ObjectUtils.isNullOrUndefined(options.condition)
        ? this.condition
        : options.condition;
      this.ignoreCase = ObjectUtils.isNullOrUndefined(options.ignoreCase)
        ? this.ignoreCase
        : options.ignoreCase;
      this.operator = options.operator;
      this.value = options.value;
      this.propertyPath = options.propertyPath.toString();
    }
  }

  public getCondition(): FilterCondition {
    return this.condition;
  }

  /**
   * Serialize current FilterDescriptor to json string.
   */
  public toJSON(): string {
    return serialize(this);
  }

  /**
   * Deserialize json string to instance of FilterDescriptor.
   * @param json
   */
  public fromJSON(json: string): FilterDescriptor<T> {
    const obj = deserialize<FilterDescriptor<T>>(FilterDescriptor, json);

    this.condition = obj.condition;
    this.operator = obj.operator;
    this.value = obj.value;
    this.ignoreCase = obj.ignoreCase;
    this.propertyPath = obj.propertyPath;
    return this;
  }
}
