import { expect } from "chai";
import { FilterDescriptor, FilterOperator } from "../../src";

describe(".BaseFilterGroup", () => {
  class Model1 {
    p1: number;
    p2: string;
  }

  describe("#addFilter", () => {
    it("add filter to group", () => {
        const nameFilter = new FilterDescriptor<Model1>({
            propertyPath: "p1",
            operator: FilterOperator.CONTAINS,
            value: true
          });
    });
  });
});
