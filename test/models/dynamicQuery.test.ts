import { expect } from "chai";
import {
  FilterDescriptor,
  DynamicQuery,
  SortDescriptor,
  FilterGroupDescriptor,
  FilterOperator,
  FilterCondition,
  SortDirection
} from "../../src";
import { ObjectUtils } from "ts-commons";

describe(".dynamicQuery", () => {
  class Student {
    name: string;
    age: number;
  }

  describe("#createInstance", () => {
    it("should create instance", () => {
      const result = DynamicQuery.createQuery<Student>(Student);
      expect(false).to.be.eq(ObjectUtils.isNullOrUndefined(result));
    });
  });

  describe("#init", () => {
    it("should have default value", () => {
      const query = new DynamicQuery();
      expect(true).to.be.eq(ObjectUtils.isArray(query.filters));
      expect(true).to.be.eq(ObjectUtils.isArray(query.sorts));
    });
  });

  describe("#addFilters", () => {
    it("should add filters", () => {
      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: "name",
        operator: FilterOperator.EQUAL,
        value: "test"
      });

      const query = DynamicQuery.createQuery<Student>(Student).addFilters([
        nameFilter
      ]);
      expect(nameFilter).to.be.eq(query.filters[0]);
    });
  });

  describe("#addSorts", () => {
    it("should add sorts", () => {
      const ageSort = new SortDescriptor<Student>({
        propertyPath: "age",
        direction: SortDirection.DESC
      });

      const query = new DynamicQuery<Student>().addSorts([ageSort]);
      expect(ageSort).to.be.eq(query.sorts[0]);
    });
  });

  describe("#addFilter", () => {
    it("should add filter option", () => {
      const query = new DynamicQuery<Student>().addFilterDescriptor({
        propertyPath: "name",
        operator: FilterOperator.EQUAL,
        value: true
      });

      const filter = query.filters[0] as FilterDescriptor<any>;
      expect("name").to.be.eq(filter.propertyPath);
      expect(FilterOperator.EQUAL).to.be.eq(filter.operator);
      expect(true).to.be.eq(filter.value);

      console.log("========================", query.toJSON());
    });
  });

  describe("#addFilterGroup", () => {
    it("should add filterGroup default value", () => {
      const query = new DynamicQuery<Student>().addFilterGroupDescriptor({
        options: [
          {
            propertyPath: "name",
            operator: FilterOperator.EQUAL,
            value: "test"
          },
          {
            propertyPath: "name",
            operator: FilterOperator.START_WITH,
            value: "aa"
          }
        ]
      });

      const groupFilter = query.filters[0] as FilterGroupDescriptor<Student>;
      const filter1 = groupFilter.filters[0] as FilterDescriptor<Student>;
      const filter2 = groupFilter.filters[1] as FilterDescriptor<Student>;
      expect(2).to.be.eq(groupFilter.filters.length);
      expect("name").to.be.eq(filter1.propertyPath);
      expect(FilterOperator.EQUAL).to.be.eq(filter1.operator);
      expect("test").to.be.eq(filter1.value);

      expect("name").to.be.eq(filter2.propertyPath);
      expect(FilterOperator.START_WITH).to.be.eq(filter2.operator);
      expect("aa").to.be.eq(filter2.value);
    });

    it("should add filterGroup default value", () => {
      const query = new DynamicQuery<Student>().addFilterGroupDescriptor({
        condition: FilterCondition.OR,
        options: [
          {
            propertyPath: "name",
            operator: FilterOperator.EQUAL,
            value: "test"
          },
          {
            propertyPath: "name",
            operator: FilterOperator.START_WITH,
            value: "aa"
          }
        ]
      });

      const groupFilter = query.filters[0] as FilterGroupDescriptor<Student>;
      const filter1 = groupFilter.filters[0] as FilterDescriptor<Student>;
      const filter2 = groupFilter.filters[1] as FilterDescriptor<Student>;

      expect(FilterCondition.OR).to.be.eq(groupFilter.condition);
      expect(2).to.be.eq(groupFilter.filters.length);
      expect("name").to.be.eq(filter1.propertyPath);
      expect(FilterOperator.EQUAL).to.be.eq(filter1.operator);
      expect("test").to.be.eq(filter1.value);

      expect("name").to.be.eq(filter2.propertyPath);
      expect(FilterOperator.START_WITH).to.be.eq(filter2.operator);
      expect("aa").to.be.eq(filter2.value);
    });
  });

  describe("#toJSON", () => {
    it("should get json", () => {
      const query = new DynamicQuery<Student>()
        .addFilterDescriptor({
          propertyPath: "age",
          operator: FilterOperator.GREATER_THAN,
          value: 20
        })
        .addFilterGroupDescriptor({
          options: [
            {
              propertyPath: "name",
              operator: FilterOperator.EQUAL,
              value: "test"
            },
            {
              propertyPath: "name",
              operator: FilterOperator.START_WITH,
              value: "aa"
            }
          ]
        })
        .addSortDescriptor({
          propertyPath: "age",
          direction: SortDirection.DESC
        });

      const json = query.toJSON();
      const expectStr = `{"filters":[{"condition":0,"type":"FilterDescriptor","operator":5,"propertyPath":"age","ignoreCase":false,"value":20},{"condition":0,"type":"FilterGroupDescriptor","filters":[{"condition":0,"type":"FilterDescriptor","operator":2,"propertyPath":"name","ignoreCase":false,"value":"test"},{"condition":0,"type":"FilterDescriptor","operator":6,"propertyPath":"name","ignoreCase":false,"value":"aa"}]}],"sorts":[{"direction":1,"type":"SortDescriptor","propertyPath":"age"}],"selectedProperties":[]}`;
      expect(expectStr).to.be.eq(json);
    });
  });

  describe("#fromJSON", () => {
    it("get from json", () => {
      const json = `{"filters":[{"condition":0,"type":"FilterDescriptor","operator":5,"propertyPath":"age","ignoreCase":false,"value":20},{"condition":0,"type":"FilterGroupDescriptor","filters":[{"condition":0,"type":"FilterDescriptor","operator":2,"propertyPath":"name","ignoreCase":false,"value":"test"},{"condition":0,"type":"FilterDescriptor","operator":6,"propertyPath":"name","ignoreCase":false,"value":"aa"}]}],"sorts":[{"direction":1,"type":"SortDescriptor","propertyPath":"age"}]}`;
      const query = new DynamicQuery<Student>().fromJSON(json);
      const sort = query.sorts[0] as SortDescriptor<Student>;
      const filter = query.filters[0] as FilterDescriptor<Student>;

      expect("age").to.be.eq(sort.propertyPath);
      expect(SortDirection.DESC).to.be.eq(sort.direction);

      expect("age").to.be.eq(filter.propertyPath);
      expect(FilterOperator.GREATER_THAN).to.be.eq(filter.operator);
      expect(20).to.be.eq(filter.value);
      expect(false).to.be.eq(filter.ignoreCase);
    });
  });

  describe("#query", () => {
    it("query student", () => {
      const students: Student[] = [
        {
          name: "test",
          age: 20
        },
        {
          name: "frank",
          age: 11
        }
      ];

      const query = new DynamicQuery<Student>().addFilterDescriptor({
        propertyPath: "age",
        operator: FilterOperator.GREATER_THAN,
        value: 12
      });

      const filteredStudents = query.query(students);
      const matchedStudent = filteredStudents[0];
      expect("test").to.be.eq(matchedStudent.name);
      expect(20).to.be.eq(matchedStudent.age);
    });
  });

  describe("#selectProperty", () => {
    it("selectProperty should be added", () => {
      const query = DynamicQuery.createQuery<Student>(Student)
        .selectProperty("name")
        .selectProperty("age")
        .addFilterDescriptor({
          propertyPath: "age",
          operator: FilterOperator.GREATER_THAN,
          value: 1
        });
      const selectedProperties = query.selectedProperties;
      expect(2).to.be.eq(selectedProperties.length);
      expect("name").to.be.eq(selectedProperties[0]);
      expect("age").to.be.eq(selectedProperties[1]);
    });
  });

  describe("#selectProperties", () => {
    it("selectProperties should be added", () => {
      const query = DynamicQuery.createQuery<Student>(Student)
        .selectProperties("name", "age")
        .addFilterDescriptor({
          propertyPath: "age",
          operator: FilterOperator.GREATER_THAN,
          value: 1
        });
      const selectedProperties = query.selectedProperties;
      expect(2).to.be.eq(selectedProperties.length);
      expect("name").to.be.eq(selectedProperties[0]);
      expect("age").to.be.eq(selectedProperties[1]);
    });
  });
});
