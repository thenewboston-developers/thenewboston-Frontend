import {Article} from 'types';

export const articlesData: Article[] = [
  {detail: 'lorem ispium dolor et', id: 1, logo: '1', title: 'Alice', type: 'normal'},
  {detail: 'lorem ispium dolor et', id: 1, logo: '2', title: 'Bob', type: 'normal'},
  {detail: 'lorem ispium dolor et', id: 1, logo: '2', title: 'Bob', type: 'normal'},
  {detail: 'lorem ispium dolor et', id: 1, logo: '2', title: 'Bob', type: 'code'},
  {
    data: {1: 'lorem', 2: 'ispium', 3: 'dolor', 4: 'et'},
    detail: 'lorem ispium dolor et',
    id: 1,
    logo: '2',
    title: 'Bob',
    type: 'list',
  },
  {
    data: {1: 'lorem', 2: 'ispium', 3: 'dolor', 4: 'et'},
    detail: 'lorem ispium dolor et',
    id: 1,
    logo: '2',
    title: 'Bob',
    type: 'list',
  },
];
