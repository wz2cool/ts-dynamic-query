import { SortDescriptor } from "../models/sortDescriptor";
import { SortDescriptorBase } from "../models/sortDescriptorBase";
import { SortDirection } from "../enums/sortDirection";
import { ArrayUtils, NumberUtils, ObjectUtils } from "ts-commons";
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
    } else {
      result = 0;
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
    const propValue1 = this.getDefaultValue(direction, obj1[propertyPath]);
    const propValue2 = this.getDefaultValue(direction, obj2[propertyPath]);

    let result = 0;
    switch (direction) {
      case SortDirection.ASC:
      case SortDirection.ASC_NULL_FIRST:
      case SortDirection.ASC_NULL_LAST:
        if (propValue1 === propValue2) {
          result = 0;
        } else if (propValue1 > propValue2) {
          result = 1;
        } else {
          result = -1;
        }
        break;
      case SortDirection.DESC:
      case SortDirection.DESC_NULL_FIRST:
      case SortDirection.DESC_NULL_LAST:
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

  private static getDefaultValue(
    sortDirection: SortDirection,
    value: any
  ): number {
    if (!ObjectUtils.isNullOrUndefined(value)) {
      return value;
    }

    if (
      sortDirection == SortDirection.ASC_NULL_FIRST ||
      sortDirection == SortDirection.DESC_NULL_LAST
    ) {
      return NumberUtils.MIN_SAFE_INTEGER;
    }

    if (
      sortDirection == SortDirection.DESC_NULL_FIRST ||
      sortDirection == SortDirection.ASC_NULL_LAST
    ) {
      return NumberUtils.MAX_SAFE_INTEGER;
    }

    return NumberUtils.MIN_SAFE_INTEGER;
  }
}
