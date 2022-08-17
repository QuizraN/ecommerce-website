import axios from "axios";
//https://prducts-api.herokuapp.com/api/products/1/reviews
export const getAllReviews = async ({ queryKey }) => {
    return await axios.get(`https://reactapisforproducts.herokuapp.com/api/products/${queryKey[1]}/reviews`)
};