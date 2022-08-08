import axios from 'axios';

export const useProducts = async () => {
  const d = await axios('http://localhost:8000/products')
    .then((response) => response.data)
    .catch((err) => console.log(err));

  const data = Object.values(d);

  return { data };
};

export const useProductById = async (productid: string) => {
  const d = await axios(`http://localhost:8000/products/${productid}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));

  const data = Object.values(d);

  // const temp = t.findIndex((x) => x.id === productid);

  return { data };
};
