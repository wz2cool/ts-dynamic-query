# 筛选

## 基本筛选

FilterDescriptor 是一个基本的筛选描述，比如按照那个字段筛选，是大于/小于/等于 某一个值

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

# 排序

## 基本筛选

SortDescriptor 是一个基本筛选描述，比如按照那个字段排序， 是升序还是降序：

```bash
function simpleSort(): void {
  console.log("================== simpleSort start =================");
  const idSort = new SortDescriptor<User>({
    propertyPath: "id",
    direction: SortDirection.DESC
  });

  const query = new DynamicQuery<User>();
  query.addSorts(idSort);

  const result = QueryProvider.query(users, query);

  const maxId = lodash.max(lodash.map(users, x => x.id));
  if (result[0].id !== maxId) {
    console.error("id should be maxid");
    return;
  }

  console.log("================== simpleSort end =================");
}
```

# 其他

## 链式调用

new 完 Dynamic 直接加 filter 和 sort 最后执行 query 返回结果。

```bash
function filterByDynamicQuery(): User[] {
  const startTime = new Date();
  // 链式调用
  const result = new DynamicQuery<User>()
    .addFilter({
      propertyPath: "id",
      operator: FilterOperator.GREATER_THAN,
      value: 200
    })
    .addFilter({
      propertyPath: "id",
      operator: FilterOperator.LESS_THAN_OR_EQUAL,
      value: 900
    })
    .addFilterGroup({
      options: [
        {
          propertyPath: "firstName",
          operator: FilterOperator.START_WITH,
          value: "t",
          ignoreCase: true
        },
        {
          condition: FilterCondition.OR,
          propertyPath: "firstName",
          operator: FilterOperator.START_WITH,
          value: "g",
          ignoreCase: true
        }
      ]
    })
    .addSort({
      propertyPath: "id",
      direction: SortDirection.DESC
    })
    .query(users);

  const endTime = new Date();
  console.log(
    "'DynamicQuery' query time: ",
    endTime.getTime() - startTime.getTime()
  );
  return result;
}
```

## 序列化/反序列化

这个就是这个项目特点之一，我们可以把我们筛选结构化成一个 json。 当然DynamicQuery.fromJSON 可以把这个json 还原成为一个 DynamicQuery
``` bash
function serializeDynamicQuery() {
  console.log(
    "================== serializeDynamicQuery start ================="
  );
  const query = new DynamicQuery<User>()
    .addFilter({
      propertyPath: "id",
      operator: FilterOperator.GREATER_THAN,
      value: 200
    })
    .addFilter({
      propertyPath: "id",
      operator: FilterOperator.LESS_THAN_OR_EQUAL,
      value: 900
    })
    .addFilterGroup({
      options: [
        {
          propertyPath: "firstName",
          operator: FilterOperator.START_WITH,
          value: "t",
          ignoreCase: true
        },
        {
          condition: FilterCondition.OR,
          propertyPath: "firstName",
          operator: FilterOperator.START_WITH,
          value: "g",
          ignoreCase: true
        }
      ]
    })
    .addSort({
      propertyPath: "id",
      direction: SortDirection.DESC
    });

  const queryJSON = query.toJSON();
  console.log("queryJSON: ", queryJSON);
  console.log("================== serializeDynamicQuery end =================");
}
```

序列化json 为：
``` bash
{
	"filters": [{
		"condition": 0,
		"type": "FilterDescriptor",
		"operator": 5,
		"propertyPath": "id",
		"ignoreCase": false,
		"value": 200
	}, {
		"condition": 0,
		"type": "FilterDescriptor",
		"operator": 1,
		"propertyPath": "id",
		"ignoreCase": false,
		"value": 900
	}, {
		"condition": 0,
		"type": "FilterGroupDescriptor",
		"filters": [{
			"condition": 0,
			"type": "FilterDescriptor",
			"operator": 6,
			"propertyPath": "firstName",
			"ignoreCase": true,
			"value": "t"
		}, {
			"condition": 1,
			"type": "FilterDescriptor",
			"operator": 6,
			"propertyPath": "firstName",
			"ignoreCase": true,
			"value": "g"
		}]
	}],
	"sorts": [{
		"direction": 1,
		"type": "SortDescriptor",
		"propertyPath": "id"
	}]
}
```