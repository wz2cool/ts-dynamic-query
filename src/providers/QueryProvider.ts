import { DynamicQuery } from "../models/DynamicQuery";
import { ArrayUtils, ObjectUtils } from "ts-commons";
import { FilterHelper } from "../helpers/FilterHelper";
import { SortHelper } from "../helpers/SortHelper";

export class QueryProvider {
  public static query<T>(datas: T[], query: DynamicQuery<T>): T[] {
    if (ArrayUtils.isEmpty(datas)) {
      return [];
    }

    let cloneDatas = datas.slice(0);
    if (ObjectUtils.isNullOrUndefined(query)) {
      return cloneDatas;
    }

    if (ArrayUtils.isNotEmpty(query.getFilters())) {
      cloneDatas = cloneDatas.filter((x) => {
        return FilterHelper.predicateByFilters(x, query.getFilters());
      });
    }

    if (ArrayUtils.isNotEmpty(query.sorts)) {
      cloneDatas = cloneDatas.sort((obj1, obj2) => {
        return SortHelper.predicateBySorts(obj1, obj2, query.sorts);
      });
    }

    if (ArrayUtils.isNotEmpty(query.selectedProperties)) {
      cloneDatas = cloneDatas.map((x) =>
        this.pick(query.type, x, query.selectedProperties)
      );
    }

    return cloneDatas;
  }

  private static pick<T>(
    type: new () => T,
    data: T,
    selectedProperties: string[]
  ): T {
    const newObj = ObjectUtils.createObject<T>(type);
    for (const key in data) {
      if (selectedProperties.indexOf(key) >= 0) {
        newObj[key] = data[key];
      }
    }
    return newObj;
  }
}
