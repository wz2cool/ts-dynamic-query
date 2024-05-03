import { SortDirection } from "../enums/SortDirection";

/**
 * Base class for all SortDescriptor.
 */
export abstract class BaseSortDescriptor {
  public direction: SortDirection = SortDirection.ASC;
  public readonly type: string;
  constructor(type: string) {
    this.type = type;
  }

  public abstract toJSON(): string;
  public abstract fromJSON(json: string): BaseSortDescriptor;
}
