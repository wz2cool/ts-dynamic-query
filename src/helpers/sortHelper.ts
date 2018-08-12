import { SortDescriptor, SortDescriptorBase } from "../models";
import { SortDirection } from "../enums";

export class SortHelper {
  public static predicateBySorts<T>(
    obj1,
    obj2,
    sorts: SortDescriptorBase[]
  ): number {
    let result = 0;
    for (const sort of sorts) {
      result = this.predicateBySortDescriptorBase<T>(obj1, obj2, sort);
      if (result !== 0) {
        break;
      }
    }
    return result;
  }

  public static predicateBySortDescriptorBase<T>(
    obj1: T,
    obj2: T,
    sort: SortDescriptorBase
  ): number {
    let result = 0;
    if (sort instanceof SortDescriptor) {
      result = this.predicateBySortDescriptor<T>(obj1, obj2, sort);
    }
    return result;
  }

  public static predicateBySortDescriptor<T>(
    obj1: T,
    obj2: T,
    sortDescriptor: SortDescriptor<T>
  ): number {
    const propertyPath = sortDescriptor.propertyPath;
    const direction = sortDescriptor.direction;
    const propValue1 = obj1[propertyPath];
    const propValue2 = obj2[propertyPath];

    let result = 0;
    switch (direction) {
      case SortDirection.ASC:
        if (propValue1 === propValue2) {
          result = 0;
        } else if (propValue1 > propValue2) {
          result = 1;
        } else {
          result = -1;
        }
        break;
      case SortDirection.DESC:
        if (propValue1 === propValue2) {
          result = 0;
        } else if (propValue1 < propValue2) {
          result = 1;
        } else {
          result = -1;
        }
        break;
    }
    return result;
  }
}
