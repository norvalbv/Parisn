import { CollectionData, ProductData } from 'types';

export const product: ProductData = {
  collection: 'Shoes',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis iusto cum voluptate incidunt, inventore culpa saepe non ut voluptatum adipisci architecto earum aperiam optio numquam dolorem nemo sapiente esse ducimus?',
  endTime: 1685670000000,
  id: '1',
  image: '',
  price: 1000,
  startTime: 1684670000000,
  stock: { small: 1, medium: 3, large: 0, extraLarge: 2 },
  title: 'Parisn Official Trainers',
};

export const products: ProductData[] = [
  {
    collection: 'Tshirts',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    endTime: 1685770000000,
    id: '1',
    image: '',
    price: 1000,
    startTime: 1684670000000,
    stock: { small: 1, medium: 2, large: 3, extraLarge: 4 },
    title: 'Parisn Official Tshirt',
  },
  {
    collection: 'Shoes',
    description: 'Officiis iusto cum voluptate incidunt, inventore culpa saepe non ut.',
    endTime: 1685870000000,
    id: '2',
    image: '',
    price: 1000,
    startTime: 1684770000000,
    stock: { small: 2, medium: 1, large: 0, extraLarge: 2 },
    title: 'London Official Shoes',
  },
  {
    collection: 'Tshirts',
    description:
      'Voluptatum adipisci architecto earum aperiam optio numquam dolorem nemo sapiente.',
    endTime: 1685970000000,
    id: '3',
    image: '',
    price: 1000,
    startTime: 1684870000000,
    stock: { small: 3, medium: 2, large: 1, extraLarge: 0 },
    title: 'New York Stylish Tshirt',
  },
  {
    collection: 'Shoes',
    description: 'Saepe non ut voluptatum adipisci architecto earum aperiam.',
    endTime: 1686070000000,
    id: '4',
    image: '',
    price: 1000,
    startTime: 1684970000000,
    stock: { small: 0, medium: 1, large: 2, extraLarge: 3 },
    title: 'Berlin Elegant Shoes',
  },
  {
    collection: 'Tshirts',
    description: 'Dolorem nemo sapiente esse ducimus?',
    endTime: 1686170000000,
    id: '5',
    image: '',
    price: 1000,
    startTime: 1685070000000,
    stock: { small: 1, medium: 1, large: 1, extraLarge: 1 },
    title: 'Parisn Casual Tshirt',
  },
  {
    collection: 'Shoes',
    description: 'Officiis iusto cum voluptate incidunt, inventore culpa.',
    endTime: 1686270000000,
    id: '6',
    image: '',
    price: 1000,
    startTime: 1685170000000,
    stock: { small: 2, medium: 2, large: 2, extraLarge: 2 },
    title: 'Tokyo Sleek Shoes',
  },
  {
    collection: 'Tshirts',
    description: 'Adipisci architecto earum aperiam optio numquam dolorem.',
    endTime: 1686370000000,
    id: '7',
    image: '',
    price: 1000,
    startTime: 1685270000000,
    stock: { small: 3, medium: 3, large: 3, extraLarge: 3 },
    title: 'London Trendy Tshirt',
  },
  {
    collection: 'Shoes',
    description: 'Saepe non ut voluptatum adipisci architecto.',
    endTime: 1686470000000,
    id: '8',
    image: '',
    price: 1000,
    startTime: 1685370000000,
    stock: { small: 4, medium: 4, large: 4, extraLarge: 4 },
    title: 'Sydney Comfy Shoes',
  },
  {
    collection: 'Tshirts',
    description: 'Earum aperiam optio numquam dolorem nemo sapiente.',
    endTime: 1686570000000,
    id: '9',
    image: '',
    price: 1000,
    startTime: 1685470000000,
    stock: { small: 1, medium: 3, large: 0, extraLarge: 2 },
    title: 'Berlin Classic Tshirt',
  },
  {
    collection: 'Shoes',
    description: 'Officiis iusto cum voluptate incidunt, inventore culpa saepe non ut.',
    endTime: 1686670000000,
    id: '10',
    image: '',
    price: 1000,
    startTime: 1685570000000,
    stock: { small: 2, medium: 0, large: 1, extraLarge: 3 },
    title: 'Parisn Official Shoes',
  },
];

export const collection: CollectionData[] = [
  {
    collections: 'Shoes',
    image: '',
  },
  {
    collections: 'Tshirts',
    image: '',
  },
];
