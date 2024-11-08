import PRODUCT_1_IMAGE from '@/public/images/profile.jpg';
import { CollectionData, ProductData } from '@/src/types';
import { COMPANY_NAME } from '../constants';

export const product: ProductData = {
  collection: 'Shoes',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis iusto cum voluptate incidunt, inventore culpa saepe non ut voluptatum adipisci architecto earum aperiam optio numquam dolorem nemo sapiente esse ducimus?',
  endTime: 1689800000000,
  id: '1',
  image: PRODUCT_1_IMAGE.src,
  price: 1000,
  startTime: 1687600000000,
  stock: { small: 1, medium: 3, large: 0, extraLarge: 2 },
  title: 'Parisn Official Trainers',
  metaData: {
    limited: false,
    newDrop: false,
  },
};

export const collections: CollectionData[] = [
  {
    collections: 'Shoes',
    image: PRODUCT_1_IMAGE.src,
  },
  {
    collections: 'Tshirts',
    image: PRODUCT_1_IMAGE.src,
  },
  {
    collections: 'Jackets',
    image: PRODUCT_1_IMAGE.src,
  },
  {
    collections: 'Joggers',
    image: PRODUCT_1_IMAGE.src,
  },
];

export const products: ProductData[] = [
  {
    collection: 'Tshirts',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    endTime: 1689000000000,
    id: '1',
    image: PRODUCT_1_IMAGE.src,
    price: 1000,
    startTime: 1687600000000,
    stock: { small: 1, medium: 2, large: 3, extraLarge: 4 },
    title: `${COMPANY_NAME} Official Tshirt`,
    metaData: {
      newDrop: false,
      limited: false,
    },
  },
  {
    collection: 'Shoes',
    description: 'Officiis iusto cum voluptate incidunt, inventore culpa saepe non ut.',
    endTime: 1688000000000,
    id: '2',
    image: PRODUCT_1_IMAGE.src,
    price: 1000,
    startTime: 1687600000000,
    stock: { small: 2, medium: 1, large: 0, extraLarge: 2 },
    title: `${COMPANY_NAME} Official Shoes`,
    metaData: {
      newDrop: false,
      limited: true,
    },
  },
  {
    collection: 'Tshirts',
    description:
      'Voluptatum adipisci architecto earum aperiam optio numquam dolorem nemo sapiente.',
    endTime: 1689000000000,
    id: '3',
    image: PRODUCT_1_IMAGE.src,
    price: 1000,
    startTime: 1687600000000,
    stock: { small: 3, medium: 2, large: 1, extraLarge: 0 },
    title: 'New York Stylish Tshirt',
    metaData: {
      newDrop: false,
      limited: false,
    },
  },
  {
    collection: 'Joggers',
    description: 'Saepe non ut voluptatum adipisci architecto earum aperiam.',
    endTime: 1689500000000,
    id: '4',
    image: PRODUCT_1_IMAGE.src,
    price: 1000,
    startTime: 1687600000000,
    stock: { small: 0, medium: 1, large: 2, extraLarge: 3 },
    title: 'Berlin Elegant Joggers',
    metaData: {
      newDrop: false,
      limited: false,
    },
  },
  {
    collection: 'Tshirts',
    description: 'Dolorem nemo sapiente esse ducimus?',
    endTime: 1688200000000,
    id: '5',
    image: PRODUCT_1_IMAGE.src,
    price: 1000,
    startTime: 1687600000000,
    stock: { small: 1, medium: 1, large: 1, extraLarge: 1 },
    title: 'Parisn Casual Tshirt',
    metaData: {
      newDrop: false,
      limited: false,
    },
  },
  {
    collection: 'Jackets',
    description: 'Officiis iusto cum voluptate incidunt, inventore culpa.',
    endTime: 1689000000000,
    id: '6',
    image: PRODUCT_1_IMAGE.src,
    price: 1000,
    startTime: 1687600000000,
    stock: { small: 2, medium: 2, large: 2, extraLarge: 2 },
    title: 'Tokyo Sleek Jackets',
    metaData: {
      newDrop: true,
      limited: false,
    },
  },
  {
    collection: 'Tshirts',
    description: 'Adipisci architecto earum aperiam optio numquam dolorem.',
    endTime: 1688200000000,
    id: '7',
    image: PRODUCT_1_IMAGE.src,
    price: 1000,
    startTime: 1687600000000,
    stock: { small: 3, medium: 3, large: 3, extraLarge: 3 },
    title: 'London Trendy Tshirt',
    metaData: {
      newDrop: true,
      limited: true,
    },
  },
  {
    collection: 'Shoes',
    description: 'Saepe non ut voluptatum adipisci architecto.',
    endTime: 1689900000000,
    id: '8',
    image: PRODUCT_1_IMAGE.src,
    price: 1000,
    startTime: 1687600000000,
    stock: { small: 4, medium: 4, large: 4, extraLarge: 4 },
    title: 'Sydney Comfy Shoes',
    metaData: {
      newDrop: false,
      limited: false,
    },
  },
  {
    collection: 'Tshirts',
    description: 'Earum aperiam optio numquam dolorem nemo sapiente.',
    endTime: 1689000000000,
    id: '9',
    image: PRODUCT_1_IMAGE.src,
    price: 1000,
    startTime: 1687600000000,
    stock: { small: 1, medium: 3, large: 0, extraLarge: 2 },
    title: 'Berlin Classic Tshirt',
    metaData: {
      newDrop: true,
      limited: false,
    },
  },
  {
    collection: 'Shoes',
    description: 'Officiis iusto cum voluptate incidunt, inventore culpa saepe non ut.',
    endTime: 1687800000000,
    id: '10',
    image: PRODUCT_1_IMAGE.src,
    price: 1000,
    startTime: 1687600000000,
    stock: { small: 2, medium: 0, large: 1, extraLarge: 3 },
    title: 'Parisn Official Shoes',
    metaData: {
      newDrop: true,
      limited: false,
    },
  },
];
