# 筛选

## 基本筛选

FilterDescriptor 是一个基本的筛选描述， 使用方法如下：

```bash
function simpleFilter(): void {
  console.log("================== simpleFilter start =================");
  // query user where id is 20;
  const idFilter = new FilterDescriptor<User>({
    propertyPath: "id", // id 为User 类中的属性
    operator: FilterOperator.EQUAL,
    value: 20
  });

  const query = new DynamicQuery<User>().addFilters(idFilter);
  const result = QueryProvider.query(users, query);
  if (result.length !== 1) {
    console.error("should only get one item");
    return;
  }

  if (result[0].id !== 20) {
    console.error("id should 20");
    return;
  }
  console.log("test 'simpleFilter' pass");
  console.log("================== simpleFilter end =================");
}
```

## 组筛选
FilterGroupDescriptor 可以把多个筛选组装到一起执行

```bash
function groupFilter(): void {
  console.log("================== groupFilter start =================");
  const idGreaterFilter = new FilterDescriptor<User>({
    propertyPath: "id",
    operator: FilterOperator.GREATER_THAN_OR_EQUAL,
    value: 9900
  });

  const idLessFilter = new FilterDescriptor<User>({
    condition: FilterCondition.OR,
    propertyPath: "id",
    operator: FilterOperator.LESS_THAN_OR_EQUAL,
    value: 100
  });

  const idGroupFilter = new FilterGroupDescriptor<User>();
  // put two filters into one group
  idGroupFilter.addFilters(idGreaterFilter, idLessFilter);

  const firstNameFilter = new FilterDescriptor<User>({
    propertyPath: "firstName",
    operator: FilterOperator.START_WITH,
    value: "Al",
    ignoreCase: true
  });

  // like SQL Query:  (user.id >= 9900 OR user.id <= 100) AND user.firstName like 'l%'
  const query = new DynamicQuery<User>().addFilters(
    idGroupFilter,
    firstNameFilter
  );

  const result = QueryProvider.query(users, query);
  console.log("result: ", result);
  console.log("================== group end =================");
}
```
