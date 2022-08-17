import { useParams } from "react-router-dom";
import {useQuery} from "react-query"
import {useState,useEffect} from "react"
import {useRecoilState } from "recoil";
import {cartAtom} from "../atoms/cartAtom"
import {ReviewForm} from "../components/ReviewForm"
import {getDistinctProduct} from "../apis/ProductsApi"
import {getAllReviews} from "../apis/ReviewsApi"
import '../App.css';

export const Products = ()=>{
  
    const [cart,setCart] = useRecoilState(cartAtom)

    const {id} = useParams()  //getting data from url

    const { isLoading, isError, data, error }= useQuery(['product',id],getDistinctProduct)
      
    const {data:reviewdata}=useQuery(['review',id],getAllReviews)
      
    const [imgsrc,setImgsrc]=useState('')
    useEffect(()=>
    {
      if (data) 
      {
        setImgsrc(data.data.image);
        console.log(data); 
      }
    }, [data]);
    

    const [currentQty,setCurrentQty]=useState(0)
    useEffect(()=>
    {
      if (data) 
      {
        setCurrentQty(data?.data.quantity-(Object.values(cart)[0]?Object.values(cart)[0]:0));
      }

    }, [data,cart]);

    if (isLoading) {
      return <h3 className = "err">Loading...</h3>
    }
    if (isError) {
      console.log(error)
      return <h3 className = "err">Error: {error.message}</h3>
    }

    const {id:i,name,price,quantity,variants,image} = data.data;
    
    const addToCart = ()=>{                         //cart structure {id:quantity} NOTE:either we can fetch data again for cart or store data in cartState
      if(typeof cart[id]==="undefined")
      {
        setCart({
          ...cart,
          [id]:1
        })
      }
      else
      {
        setCart({
          ...cart,
          [id]:cart[id]+1
        });
      }
      setCurrentQty(currentQty-1);
      }

    const remFromCart = ()=> {
      if(cart[id]===1)    //if there is only 1 item then delete entry from cart
        {
          let prevCart={...cart}
          delete prevCart[id]
          setCart(prevCart);
        }
        else
        {
          setCart({
            ...cart,
            [data.data.id]:cart[data.data.id]-1
          });
          setCurrentQty(currentQty+1);
        }
    }
    
    const getCurrQtyTxt = ()=>{
      if(currentQty>10) {return "available"}
      else if(currentQty>0) {return "sellingFast"}
      else {return "unavailable"}
    }
    return (
      
      data.data?
        <div className = "item" style = {{height:"100px"}}>
            <img className = "link" width = {400} height = {400} src = {imgsrc} alt = "product-1"/>
            <div  className = "description">
                <h3>{data.data.name}</h3>
                <p>Description: {data.data.description}</p>
                <p>Price:<strong>${data.data.price}</strong></p>
               
                <p>Variants: </p>
                {
                  (variants.length>0)?variants.map((variant)=>{
                    return <button id = "btnd" key = {variant.color} style = {{backgroundColor:variant.color,width:"40px",height:"40px",}}
                    onClick = {() => setImgsrc(variant.image)}></button>
                  }):<div>No variants</div>
                }

                <p>Quantity:{getCurrQtyTxt()}</p> 
                <p>currentQuantity:{currentQty}</p>
                { 
                (cart[data.data.id]>0)?
                    (
                    <div className = 'counter'>    
                      <button id = "btn" disabled={currentQty===data.data.quantity?true:false} onClick = {remFromCart}>-</button>
                      {cart[data.data.id]}
                      <button id = "btn" disabled = {currentQty===0?true:false} onClick = {addToCart}>+</button>
                    </div>
                    )
                    :
                    <button id = "btn" onClick = {addToCart}>Add to Cart</button>
                }
                <h3 className = "reviewHead">Add a Review:</h3>
                <div>
                  <ReviewForm id = {data.data.id}/>
                </div>
                <h3 className = "reviewHead">Customer Reviews:</h3> 
                <div className = "reviews">
                  {
                      reviewdata?reviewdata.data.map((review)=>
                      (<div key = {review.id}>
                            <p><b>Customer</b>:{review.name}</p>
                            <p>Rating:{String.fromCharCode(11088).repeat(review.rating)}</p>
                            <p>Review:{review.review}</p>
                        </div>))
                        :
                        <h3>Loading..</h3>
                  }   
                </div>
            </div>
        </div>:"undefined"

        
    );

}