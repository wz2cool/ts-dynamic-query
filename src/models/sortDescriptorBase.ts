import { SortDirection } from "../enums/sortDirection";

/**
 * Base class for all SortDescriptor.
 */
export abstract class SortDescriptorBase {
  public direction: SortDirection = SortDirection.ASC;
  public readonly type: string;
  constructor(type: string) {
    this.type = type;
  }

  public abstract toJSON(): string;
  public abstract fromJSON(json: string): SortDescriptorBase;
}
