import { DataReOrder } from './data-reorder';

interface Test {
  age: string;
  name: string;
  surname: string;
}

const data: Test[] = [
  {
    age: '30',
    name: 'Arthur',
    surname: 'Dalton'
  },
  {
    age: '25',
    name: 'Kate',
    surname: 'Sutton'
  },
  {
    age: '35',
    name: 'Layton',
    surname: 'Johns'
  },
  {
    age: '35',
    name: 'Daniel',
    surname: 'Weaver'
  },
  {
    age: '20',
    name: 'Audrey',
    surname: 'Aguilar'
  }
];

describe('DataReOrder', () => {
  it('should re order the data by age with the ASC direction and leaves default if equal detect', () => {
    const expectation: Test[] = [
      {
        age: '20',
        name: 'Audrey',
        surname: 'Aguilar'
      },
      {
        age: '25',
        name: 'Kate',
        surname: 'Sutton'
      },
      {
        age: '30',
        name: 'Arthur',
        surname: 'Dalton'
      },
      {
        age: '35',
        name: 'Layton',
        surname: 'Johns'
      },
      {
        age: '35',
        name: 'Daniel',
        surname: 'Weaver'
      }
    ];
    const result = DataReOrder<Test>(data, 'age', 'ASC');

    expect(result).toEqual(expectation);
  });

  it('should re order the data by age with the DESC direction and leaves default if equal detect', () => {
    const expectation: Test[] = [
      {
        age: '35',
        name: 'Layton',
        surname: 'Johns'
      },
      {
        age: '35',
        name: 'Daniel',
        surname: 'Weaver'
      },
      {
        age: '30',
        name: 'Arthur',
        surname: 'Dalton'
      },
      {
        age: '25',
        name: 'Kate',
        surname: 'Sutton'
      },
      {
        age: '20',
        name: 'Audrey',
        surname: 'Aguilar'
      }
    ];
    const result = DataReOrder<Test>(data, 'age', 'DESC');

    expect(result).toEqual(expectation);
  });
});
