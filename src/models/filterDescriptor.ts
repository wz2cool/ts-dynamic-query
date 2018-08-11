import { FilterDescriptorBase } from "./filterDescriptorBase";
import { FilterOperator } from "../enums";
import { FilterOptions } from "./filterOptions";

export class FilterDescriptor<T> extends FilterDescriptorBase {
  public operator: FilterOperator = FilterOperator.EQUAL;
  public propertyPath: string = null;
  public value: any = null;

  constructor(options?: FilterOptions<T>) {
    super();

    if (options) {
      this.condition = options.condition || this.condition;
      this.operator = options.operator || this.operator;

      const a = new FilterDescriptor<FilterDescriptor<any>>({
        operator: FilterOperator.BETWEEN,
        propertyPath: "value"
      });
    }
  }
}
