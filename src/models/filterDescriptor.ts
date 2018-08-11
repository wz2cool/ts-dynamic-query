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
    super();

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
    return deserialize<FilterDescriptor<T>>(FilterDescriptor, json);
  }
}
