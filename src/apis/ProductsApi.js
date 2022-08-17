import axios from "axios";

export const getAllProducts = async () => {
  return await axios.get(
    "https://reactapisforproducts.herokuapp.com/api/products"
  );
};

export const getDistinctProduct = async ({ queryKey }) => {
  return await axios.get(
    `https://reactapisforproducts.herokuapp.com/api/products/${queryKey[1]}`
  )
};