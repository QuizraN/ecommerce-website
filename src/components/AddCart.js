import "./AddCart.css"
import axios from "axios";
import {useQuery} from "react-query";
import {cartState} from "./Products"

export const AddCart=({id,quantity})=>{
    const {data,status,isFetching}=useQuery([`cart${id}`], async () => 
    {const { data } = await axios.get(`https://reactapisforproducts.herokuapp.com/api/products/${id}`);
    return data;
    });
        if (status==='error' || status==='loading' || isFetching){
            return <p>Loading</p>
        }
    return (
            <div className = "card">
                <div>
                <img className = "c-image"src = {data.image} alt = 'product'/>    
                </div>
                
                <div className = "c-description">
                    <h3>{data.name}</h3>
                    <p>{data.description}</p>
                    <p>{quantity }</p>
                    <p>Price:<b>${quantity*data.price}</b></p>
                </div>
            </div>
            )
        
        
    
}