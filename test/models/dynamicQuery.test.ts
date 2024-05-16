import { expect } from 'chai';
import {
  FilterDescriptor,
  DynamicQuery,
  SortDescriptor,
  FilterGroupDescriptor,
  FilterOperator,
  FilterCondition,
  SortDirection,
  _greaterThan,
  _in,
  _equal,
  _endWith,
  _lessThan,
  _notEqual,
  _descNullLast
} from '../../src';
import { ObjectUtils } from 'ts-commons';

describe('.dynamicQuery', () => {
  class Student {
    name: string;
    age: number;
  }

  describe('#createInstance', () => {
    it('should create instance', () => {
      const result = DynamicQuery.createQuery<Student>(Student);
      expect(false).to.be.eq(ObjectUtils.isNullOrUndefined(result));
    });
  });

  describe('#init', () => {
    it('should have default value', () => {
      const query = new DynamicQuery();
      expect(true).to.be.eq(ObjectUtils.isArray(query.getFilters()));
      expect(true).to.be.eq(ObjectUtils.isArray(query.getSorts()));
    });
  });

  describe('#addFilters', () => {
    it('should add filters', () => {
      const nameFilter = new FilterDescriptor<Student>({
        propertyPath: 'name',
        operator: FilterOperator.EQUAL,
        value: 'test'
      });

      const query = DynamicQuery.createQuery<Student>(Student).addFilters([nameFilter]);
      expect(nameFilter).to.be.eq(query.getFilters()[0]);
    });
  });

  describe('#addSort', () => {
    it('should add sort', () => {
      const ageSort = new SortDescriptor<Student>({
        propertyPath: 'age',
        direction: SortDirection.DESC
      });

      const query = new DynamicQuery<Student>().addSort(ageSort);
      expect(ageSort).to.be.eq(query.getSorts()[0]);
    });
  });

  describe('#addSorts', () => {
    it('should add sorts', () => {
      const ageSort = new SortDescriptor<Student>({
        propertyPath: 'age',
        direction: SortDirection.DESC
      });

      const query = new DynamicQuery<Student>().addSorts([ageSort]);
      expect(ageSort).to.be.eq(query.getSorts()[0]);
    });
  });

  describe('#addFilter', () => {
    it('should add filter option', () => {
      const query = new DynamicQuery<Student>().addFilterDescriptor({
        propertyPath: 'name',
        operator: FilterOperator.EQUAL,
        value: true
      });

      const filter = query.getFilters()[0] as FilterDescriptor<any>;
      expect('name').to.be.eq(filter.propertyPath);
      expect(FilterOperator.EQUAL).to.be.eq(filter.operator);
      expect(true).to.be.eq(filter.value);
    });
  });

  describe('#addFilterGroup', () => {
    it('should add filterGroup default value', () => {
      const query = new DynamicQuery<Student>().addFilterGroupDescriptor({
        options: [
          {
            propertyPath: 'name',
            operator: FilterOperator.EQUAL,
            value: 'test'
          },
          {
            propertyPath: 'name',
            operator: FilterOperator.START_WITH,
            value: 'aa'
          }
        ]
      });

      const groupFilter = query.getFilters()[0] as FilterGroupDescriptor<Student>;
      const filter1 = groupFilter.getFilters()[0] as FilterDescriptor<Student>;
      const filter2 = groupFilter.getFilters()[1] as FilterDescriptor<Student>;
      expect(2).to.be.eq(groupFilter.getFilters().length);
      expect('name').to.be.eq(filter1.propertyPath);
      expect(FilterOperator.EQUAL).to.be.eq(filter1.operator);
      expect('test').to.be.eq(filter1.value);

      expect('name').to.be.eq(filter2.propertyPath);
      expect(FilterOperator.START_WITH).to.be.eq(filter2.operator);
      expect('aa').to.be.eq(filter2.value);
    });

    it('should add filterGroup default value', () => {
      const query = new DynamicQuery<Student>().addFilterGroupDescriptor({
        condition: FilterCondition.OR,
        options: [
          {
            propertyPath: 'name',
            operator: FilterOperator.EQUAL,
            value: 'test'
          },
          {
            propertyPath: 'name',
            operator: FilterOperator.START_WITH,
            value: 'aa'
          }
        ]
      });

      const groupFilter = query.getFilters()[0] as FilterGroupDescriptor<Student>;
      const filter1 = groupFilter.getFilters()[0] as FilterDescriptor<Student>;
      const filter2 = groupFilter.getFilters()[1] as FilterDescriptor<Student>;

      expect(FilterCondition.OR).to.be.eq(groupFilter.condition);
      expect(2).to.be.eq(groupFilter.getFilters().length);
      expect('name').to.be.eq(filter1.propertyPath);
      expect(FilterOperator.EQUAL).to.be.eq(filter1.operator);
      expect('test').to.be.eq(filter1.value);

      expect('name').to.be.eq(filter2.propertyPath);
      expect(FilterOperator.START_WITH).to.be.eq(filter2.operator);
      expect('aa').to.be.eq(filter2.value);
    });
  });

  describe('#toJSON', () => {
    it('should get json', () => {
      const query = new DynamicQuery<Student>()
        .addFilterDescriptor({
          propertyPath: 'age',
          operator: FilterOperator.GREATER_THAN,
          value: 20
        })
        .addFilterGroupDescriptor({
          options: [
            {
              propertyPath: 'name',
              operator: FilterOperator.EQUAL,
              value: 'test'
            },
            {
              propertyPath: 'name',
              operator: FilterOperator.START_WITH,
              value: 'aa'
            }
          ]
        })
        .addSortDescriptor({
          propertyPath: 'age',
          direction: SortDirection.DESC
        });

      const json = query.toJSON();
      const expectStr = `{"filters":[{"condition":0,"type":"FilterDescriptor","operator":5,"propertyPath":"age","ignoreCase":false,"value":20},{"filters":[{"condition":0,"type":"FilterDescriptor","operator":2,"propertyPath":"name","ignoreCase":false,"value":"test"},{"condition":0,"type":"FilterDescriptor","operator":6,"propertyPath":"name","ignoreCase":false,"value":"aa"}],"condition":0,"type":"FilterGroupDescriptor"}],"sorts":[{"direction":1,"type":"SortDescriptor","propertyPath":"age"}],"selectedProperties":[]}`;
      expect(expectStr).to.be.eq(json);
    });
  });

  describe('#fromJSON', () => {
    it('get from json', () => {
      const json = `{"filters":[{"condition":0,"type":"FilterDescriptor","operator":5,"propertyPath":"age","ignoreCase":false,"value":20},{"condition":0,"type":"FilterGroupDescriptor","filters":[{"condition":0,"type":"FilterDescriptor","operator":2,"propertyPath":"name","ignoreCase":false,"value":"test"},{"condition":0,"type":"FilterDescriptor","operator":6,"propertyPath":"name","ignoreCase":false,"value":"aa"}]}],"sorts":[{"direction":1,"type":"SortDescriptor","propertyPath":"age"}]}`;
      const query = new DynamicQuery<Student>().fromJSON(json);
      const sort = query.getSorts()[0] as SortDescriptor<Student>;
      const filter = query.getFilters()[0] as FilterDescriptor<Student>;

      expect('age').to.be.eq(sort.propertyPath);
      expect(SortDirection.DESC).to.be.eq(sort.direction);

      expect('age').to.be.eq(filter.propertyPath);
      expect(FilterOperator.GREATER_THAN).to.be.eq(filter.operator);
      expect(20).to.be.eq(filter.value);
      expect(false).to.be.eq(filter.ignoreCase);
    });
  });

  describe('#query', () => {
    it('query student', () => {
      const students: Student[] = [
        {
          name: 'test',
          age: 20
        },
        {
          name: 'frank',
          age: 11
        }
      ];

      const query = new DynamicQuery<Student>().addFilterDescriptor({
        propertyPath: 'age',
        operator: FilterOperator.GREATER_THAN,
        value: 12
      });

      const filteredStudents = query.query(students);
      const matchedStudent = filteredStudents[0];
      expect('test').to.be.eq(matchedStudent.name);
      expect(20).to.be.eq(matchedStudent.age);
    });
  });

  describe('#selectProperty', () => {
    it('selectProperty should be added', () => {
      const query = DynamicQuery.createQuery<Student>(Student)
        .select('name')
        .select('age')
        .and('age', _greaterThan, 1)
        .addFilterDescriptor({
          propertyPath: 'age',
          operator: FilterOperator.GREATER_THAN,
          value: 1
        });
      const selectedProperties = query.getSelectedProperties();
      expect(2).to.be.eq(selectedProperties.length);
      expect('name').to.be.eq(selectedProperties[0]);
      expect('age').to.be.eq(selectedProperties[1]);
    });
  });

  describe('#selectProperties', () => {
    it('selectProperties should be added', () => {
      const query = DynamicQuery.createQuery<Student>(Student)
        .select('name', 'age')
        .addFilterDescriptor({
          propertyPath: 'age',
          operator: FilterOperator.GREATER_THAN,
          value: 1
        });
      const selectedProperties = query.getSelectedProperties();
      expect(2).to.be.eq(selectedProperties.length);
      expect('name').to.be.eq(selectedProperties[0]);
      expect('age').to.be.eq(selectedProperties[1]);
    });
  });

  describe('#orderBy', () => {
    it('order by default asc', () => {
      const query = DynamicQuery.createQuery(Student).orderBy('age');
      const sort = query.getSorts()[0] as SortDescriptor<Student>;
      expect('age').to.be.eq(sort.propertyPath);
      expect(SortDirection.ASC).to.be.eq(sort.direction);
    });

    it('order by desc null last', () => {
      const query = DynamicQuery.createQuery(Student).orderBy('age', _descNullLast);
      const sort = query.getSorts()[0] as SortDescriptor<Student>;
      expect('age').to.be.eq(sort.propertyPath);
      expect(SortDirection.DESC_NULL_LAST).to.be.eq(sort.direction);
    });
  });
});
