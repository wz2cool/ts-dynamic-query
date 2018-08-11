import { SortDirection } from "../enums";

export abstract class SortDescriptorBase {
  public direction: SortDirection;
  constructor() {
    this.direction = SortDirection.ASC;
  }

  public abstract toJSON(): string;
  public abstract fromJSON(json: string): SortDescriptorBase;
}
