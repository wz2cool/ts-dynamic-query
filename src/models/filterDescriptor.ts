import { FilterDescriptorBase } from "./filterDescriptorBase";
import { FilterOperator } from "../enums";
import { FilterOptions } from "./filterOptions";
import { deserialize, serialize } from "class-transformer";

export class FilterDescriptor<T> extends FilterDescriptorBase {
  public operator: FilterOperator = FilterOperator.EQUAL;
  public propertyPath: string = null;
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
      this.condition = options.condition || this.condition;
      this.operator = options.operator || this.operator;
      this.value = options.value || this.value;
      this.propertyPath = options.propertyPath
        ? options.propertyPath.toString()
        : this.propertyPath;
    }
  }

  public toJSON(): string {
    return serialize(this);
  }
  public fromJSON(json: string): FilterDescriptor<T> {
    const obj = deserialize<FilterDescriptor<T>>(FilterDescriptor, json);
    this.condition = obj.condition;
    this.operator = obj.operator;
    this.propertyPath = obj.propertyPath;
    this.value = obj.value;
    return this;
  }
}
