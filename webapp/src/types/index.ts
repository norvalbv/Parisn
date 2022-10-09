export interface Stock {
  small: number;
  medium: number;
  large: number;
  extralarge: number;
}
export interface MockData {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  stock: Stock;
}
