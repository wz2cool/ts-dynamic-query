import { FilterDescriptorBase } from "./filterDescriptorBase";
import { FilterOperator } from "../enums/filterOperator";
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
      this.ignoreCase = ObjectUtils.isNullOrUndefined(options.ignoreCase)
        ? this.ignoreCase
        : options.ignoreCase;
      this.operator = options.operator;
      this.value = options.value;
      this.propertyPath = options.propertyPath.toString();
    }
  }

  public toJSON(): string {
    return serialize(this);
  }
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
