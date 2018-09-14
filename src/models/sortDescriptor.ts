import { SortDescriptorBase } from "./sortDescriptorBase";
import { SortDirection } from "../enums/sortDirection";
import { SortOptions } from "./sortOptions";
import { deserialize, serialize } from "class-transformer";
import { ObjectUtils } from "ts-commons";

/**
 * Initializes a new instance of the SortDescriptor class.
 */
export class SortDescriptor<T> extends SortDescriptorBase {
  public propertyPath: string = null;
  public direction: SortDirection = SortDirection.ASC;

  constructor(options?: SortOptions<T>) {
    super("SortDescriptor");

    if (options) {
      this.direction = ObjectUtils.isNullOrUndefined(options.direction)
        ? SortDirection.ASC
        : options.direction;
      this.propertyPath = options.propertyPath.toString();
    }
  }

  /**
   * Serialize current SortDescriptor to json string.
   */
  public toJSON(): string {
    return serialize(this);
  }

  /**
   * Deserialize json string to instance of SortDescriptor.
   * @param json
   */
  public fromJSON(json: string): SortDescriptor<T> {
    const obj = deserialize<SortDescriptor<T>>(SortDescriptor, json);
    this.direction = obj.direction;
    this.propertyPath = obj.propertyPath;
    return this;
  }
}
