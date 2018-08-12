import { DynamicQuery } from "../models";
import { ArrayUtils, ObjectUtils } from "ts-commons";
import { FilterHelper, SortHelper } from "../helpers";

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
    return cloneDatas;
  }
}
