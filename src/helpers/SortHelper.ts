import { SortDescriptor } from "../models/SortDescriptor";
import { BaseSortDescriptor } from "../models/BaseSortDescriptor";
import { SortDirection } from "../enums/SortDirection";
import { ArrayUtils, ObjectUtils } from "ts-commons";
import { serialize } from "class-transformer";

export class SortHelper {
  public static predicateBySorts<T>(
    obj1: T,
    obj2: T,
    sorts: BaseSortDescriptor[]
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
    sort: BaseSortDescriptor
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
    SortDescriptor: SortDescriptor<T>
  ): number {
    const propertyPath = SortDescriptor.propertyPath;
    const direction = SortDescriptor.direction;
    const propValue1 = obj1[propertyPath];
    const propValue2 = obj2[propertyPath];
    const result = this.compareTo(direction, propValue1, propValue2);
    return result;
  }

  public static getRealSorts<T>(
    sorts: BaseSortDescriptor[]
  ): BaseSortDescriptor[] {
    if (ArrayUtils.isEmpty(sorts)) {
      return [];
    }

    const result: BaseSortDescriptor[] = [];
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

  private static compareTo(
    direction: SortDirection,
    value1: any,
    value2: any
  ): number {
    const isValue1NullOrUnderfined = ObjectUtils.isNullOrUndefined(value1);
    const isValue2NullOrUnderfined = ObjectUtils.isNullOrUndefined(value2);

    if (!isValue1NullOrUnderfined && !isValue2NullOrUnderfined) {
      // 当 value1 和 value2 同时有值
      return this.nonNullableCompareTo(direction, value1, value2);
    }

    if (isValue1NullOrUnderfined && isValue2NullOrUnderfined) {
      // 如果两个都是空就是0;
      return 0;
    }
    if (isValue1NullOrUnderfined) {
      return this.value1NullCompareTo(direction);
    } else {
      // 2 正好和1 反过来
      return -1 * this.value1NullCompareTo(direction);
    }
  }

  private static nonNullableCompareTo<T>(
    direction: SortDirection,
    value1: NonNullable<T>,
    value2: NonNullable<T>
  ) {
    let result: number;
    if (value1 === value2) {
      result = 0;
    } else if (value1 > value2) {
      result = 1;
    } else {
      result = -1;
    }

    switch (direction) {
      case SortDirection.ASC:
      case SortDirection.ASC_NULL_FIRST:
      case SortDirection.ASC_NULL_LAST:
        return result;
      default:
        return -1 * result;
    }
  }

  private static value1NullCompareTo(direction: SortDirection): number {
    switch (direction) {
      // null 是最小要放到最上面
      case SortDirection.ASC:
      case SortDirection.ASC_NULL_FIRST:
      case SortDirection.DESC_NULL_FIRST:
        return -1;
      default:
        return 1;
    }
  }
}
