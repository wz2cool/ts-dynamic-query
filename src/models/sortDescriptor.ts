import { SortDescriptorBase } from "./sortDescriptorBase";
import { SortDirection } from "../enums";
import { SortOptions } from "./sortOptions";
import { deserialize, serialize } from "class-transformer";
import { ObjectUtils } from "ts-commons";

export class SortDescriptor<T> extends SortDescriptorBase {
  public propertyPath: string;
  public direction: SortDirection;

  constructor(options?: SortOptions<T>) {
    super("SortDescriptor");

    if (options) {
      this.direction = ObjectUtils.isNullOrUndefined(options.direction)
        ? this.direction
        : options.direction;
      this.propertyPath = ObjectUtils.isNullOrUndefined(options.propertyPath)
        ? this.propertyPath
        : options.propertyPath.toString();
    }
  }

  public toJSON(): string {
    throw serialize(this);
  }

  public fromJSON(json: string): SortDescriptor<T> {
    const obj = deserialize<SortDescriptor<T>>(SortDescriptor, json);
    this.direction = ObjectUtils.isNullOrUndefined(obj.direction)
      ? this.direction
      : obj.direction;
    this.propertyPath = ObjectUtils.isNullOrUndefined(obj.propertyPath)
      ? this.propertyPath
      : obj.propertyPath.toString();
    return this;
  }
}
