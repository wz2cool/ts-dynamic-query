import { FilterCondition } from "./enums/FilterCondition";
import { FilterOperator } from "./enums/FilterOperator";
import { SortDirection } from "./enums/SortDirection";
import { DynamicQuery } from "./models/DynamicQuery";
import { FilterDescriptor } from "./models/FilterDescriptor";
import { BaseFilterDescriptor } from "./models/BaseFilterDescriptor";
import { FilterGroupDescriptor } from "./models/FilterGroupDescriptor";
import { FilterGroupOptions } from "./models/FilterGroupOptions";
import { FilterOptions } from "./models/FilterOptions";
import { SortDescriptor } from "./models/SortDescriptor";
import { BaseSortDescriptor } from "./models/BaseSortDescriptor";
import { SortOptions } from "./models/SortOptions";
import { QueryProvider } from "./providers/QueryProvider";

const _lessThan = FilterOperator.LESS_THAN;
const _lessThanOrEqual = FilterOperator.LESS_THAN_OR_EQUAL;
const _equal = FilterOperator.EQUAL;
const _notEqual = FilterOperator.NOT_EQUAL;
const _greaterThan = FilterOperator.GREATER_THAN;
const _greaterThanOrEqual = FilterOperator.GREATER_THAN_OR_EQUAL;
const _startWith = FilterOperator.START_WITH;
const _endWith = FilterOperator.END_WITH;
const _contains = FilterOperator.CONTAINS;
const _in = FilterOperator.IN;
const _notIn = FilterOperator.NOT_IN;
const _between = FilterOperator.BETWEEN;
const _bitwiseAny = FilterOperator.BITWISE_ANY;
const _bitwiseZero = FilterOperator.BITWISE_ZERO;
const _bitwiseAll = FilterOperator.BITWISE_ALL;

export {
  FilterCondition,
  FilterOperator,
  SortDirection,
  DynamicQuery,
  FilterDescriptor,
  BaseFilterDescriptor as FilterDescriptorBase,
  FilterGroupDescriptor,
  FilterGroupOptions,
  FilterOptions,
  SortDescriptor,
  BaseSortDescriptor as SortDescriptorBase,
  SortOptions,
  QueryProvider,
  _lessThan,
  _lessThanOrEqual,
  _equal,
  _notEqual,
  _greaterThan,
  _greaterThanOrEqual,
  _startWith,
  _endWith,
  _contains,
  _in,
  _notIn,
  _between,
  _bitwiseAny,
  _bitwiseZero,
  _bitwiseAll,
};
