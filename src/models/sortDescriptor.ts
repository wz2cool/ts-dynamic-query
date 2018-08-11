import { SortDescriptorBase } from "./sortDescriptorBase";
import { SortDirection } from "../enums";
import { SortOptions } from "./sortOptions";
import { deserialize, serialize } from "class-transformer";

export class SortDescriptor<T> extends SortDescriptorBase {
  public propertyPath: string;
  public direction: SortDirection;

  constructor(options?: SortOptions<T>) {
    super("SortDescriptor");

    if (options) {
      this.direction = options.direction || this.direction;
      this.propertyPath = options.propertyPath
        ? options.propertyPath.toString()
        : this.propertyPath;
    }
  }

  public toJSON(): string {
    throw serialize(this);
  }

  public fromJSON(json: string): SortDescriptor<T> {
    const obj = deserialize<SortDescriptor<T>>(SortDescriptor, json);
    this.propertyPath = obj.propertyPath;
    this.direction = obj.direction;
    return this;
  }
}
