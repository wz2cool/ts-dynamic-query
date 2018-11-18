import { DynamicQuery } from "../models/dynamicQuery";
import { ArrayUtils, ObjectUtils } from "ts-commons";
import { FilterHelper } from "../helpers/filterHelper";
import { SortHelper } from "../helpers/sortHelper";

export class QueryProvider {
  public static query<T>(datas: T[], query: DynamicQuery<T>): T[] {
    if (ArrayUtils.isEmpty(datas)) {
      return [];
    }

    let cloneDatas = datas.slice(0);
    if (ObjectUtils.isNullOrUndefined(query)) {
      return cloneDatas;
    }

    if (!ArrayUtils.isEmpty(query.filters)) {
      cloneDatas = cloneDatas.filter(x => {
        return FilterHelper.predicateByFilters(x, query.filters);
      });
    }

    if (!ArrayUtils.isEmpty(query.sorts)) {
      cloneDatas = cloneDatas.sort((obj1, obj2) => {
        return SortHelper.predicateBySorts(obj1, obj2, query.sorts);
      });
    }

    if (!ArrayUtils.isEmpty(query.selectedProperties)) {
      cloneDatas = cloneDatas.map(x =>
        this.pick(query.type, x, query.selectedProperties)
      );
    }

    return cloneDatas;
  }

  private static pick<T>(
    type: new () => T,
    data: T,
    selectedProperties: String[]
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
