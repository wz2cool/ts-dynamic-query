# 基本筛选
``` bash
function simpleFilter(): void {
  console.log("================== simpleFilter start =================");
  // query user where id is 20;
  const idFilter = new FilterDescriptor<User>({
    propertyPath: "id", 
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