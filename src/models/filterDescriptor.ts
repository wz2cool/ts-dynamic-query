import { FilterDescriptorBase } from "./filterDescriptorBase";
import { FilterOperator, FilterCondition } from "../enums";
import { FilterOptions } from "./filterOptions";
import { deserialize, serialize } from "class-transformer";
import { ObjectUtils } from "ts-commons";

export class FilterDescriptor<T> extends FilterDescriptorBase {
  public operator: FilterOperator = FilterOperator.EQUAL;
  public propertyPath: string = null;
  public ignoreCase: boolean = false;
  public value:
    | string
    | number
    | Date
    | boolean
    | Array<string | number | Date | boolean>
    | null = null;

  constructor(options?: FilterOptions<T>) {
    super("FilterDescriptor");

    if (options) {
      this.condition = ObjectUtils.isNullOrUndefined(options.condition)
        ? this.condition
        : options.condition;
      this.operator = ObjectUtils.isNullOrUndefined(options.operator)
        ? this.operator
        : options.operator;
      this.value = ObjectUtils.isNullOrUndefined(options.value)
        ? this.value
        : options.value;
      this.ignoreCase = ObjectUtils.isNullOrUndefined(options.ignoreCase)
        ? this.ignoreCase
        : options.ignoreCase;
      this.propertyPath = ObjectUtils.isNullOrUndefined(options.propertyPath)
        ? this.propertyPath
        : options.propertyPath.toString();
    }
  }

  public toJSON(): string {
    return serialize(this);
  }
  public fromJSON(json: string): FilterDescriptor<T> {
    const obj = deserialize<FilterDescriptor<T>>(FilterDescriptor, json);
    this.condition = ObjectUtils.isNullOrUndefined(obj.condition)
      ? this.condition
      : obj.condition;
    this.operator = ObjectUtils.isNullOrUndefined(obj.operator)
      ? this.operator
      : obj.operator;
    this.value = ObjectUtils.isNullOrUndefined(obj.value)
      ? this.value
      : obj.value;
    this.ignoreCase = ObjectUtils.isNullOrUndefined(obj.ignoreCase)
      ? this.ignoreCase
      : obj.ignoreCase;
    this.propertyPath = ObjectUtils.isNullOrUndefined(obj.propertyPath)
      ? this.propertyPath
      : obj.propertyPath.toString();
    return this;
  }
}
