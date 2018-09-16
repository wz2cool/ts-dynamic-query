import { SortDescriptor } from "../models/sortDescriptor";
import { SortDescriptorBase } from "../models/sortDescriptorBase";
import { SortDirection } from "../enums/sortDirection";
import { ArrayUtils } from "ts-commons";
import { serialize } from "class-transformer";

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

  public static getRealSorts<T>(
    sorts: SortDescriptorBase[]
  ): SortDescriptorBase[] {
    if (ArrayUtils.isEmpty(sorts)) {
      return [];
    }

    const result: SortDescriptorBase[] = [];
    for (const filterBase of sorts || []) {
      const filterJson = serialize(filterBase);
      switch (filterBase.type) {
        case "SortDescriptor":
          result.push(new SortDescriptor<T>().fromJSON(filterJson));
          break;
      }
    }
    return result;
  }
}
