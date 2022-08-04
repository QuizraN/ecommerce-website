import { useParams } from "react-router-dom";
import {useQuery} from "react-query"
import {useState,useEffect} from "react"
import axios from "axios";
import { atom,useRecoilState } from "recoil";
import {AddCart} from "./AddCart"
import {cartAtom, useCart} from "../atoms/cartAtom"
import '../App.css';


//this logic should be present in a separate file under Store folder (teja)


export const Products=()=>{
  

  
    const [count,setCount]=useState(0)
    
    const [cart,setCart]=useRecoilState(cartAtom)

    //this logic can be moved to the Store file under custom hook named "useCart"
    const {id}=useParams()
    const [cartvalue,setCartValue]=useState(0);


    //console.log(id)
    const { isLoading, isError, data, error }= useQuery(['product', id],async ()=>{
        return  await axios.get(`https://obscure-refuge-62167.herokuapp.com/products/${id}`);
      })
      
    const {data:reviewdata,status}=useQuery(['review',id],async ()=>{
      return  await axios.get(`https://obscure-refuge-62167.herokuapp.com/products/${id}/reviews`);

})
      
    const [imgsrc,setImgsrc]=useState('')
    useEffect(()=>
    {
      if (data) 
      {
        setImgsrc(data.data.image);
      }
    }, [data]);
    
    const [currentQty,setCurrentQty]=useState(0)
    useEffect(()=>
    {
      
      if (data) 
      {
        setCurrentQty(data?.data.quantity-(Object.values(cart)[0]?Object.values(cart)[0]:0));
      }
      console.log(currentQty)
    }, [data,cart]);
      
    
     // const handleChange =(img)=>
     // {
     //   setImgsrc(img);
     // };
     // const handleDisable =(count)=>
     // {
     //  return count===0?"true":"false" 
     // };
      
      if (isLoading) {
        return <span>Loading...</span>
      }
    
      if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
      }
      //let t=""
      console.log(data.data.quantity)
      console.log(count)
      
      
     
      const {id:i,name,price,quantity,variants,image} = data.data;
      //setText(quantity>10?"available":quantity>=1?"sellingfast":"unavailable")
      // console.log(variants.image)
      //disabled={dis}
      //setDis(
       // (count ===0) ? "true":"false" 
      //)
      console.log(count)
     // const addToCart2=()=>{
     //   setCart({
     //     ...cart,
     //    
     // {...cart,cart[id]:cart[id]+1}// cart[id]:cart[id]+1
     //   });
     //   setCurrentQty({currentQty-1})
     // }
     
     //array to object
      const initialaddToCart=()=>{          //cart structure {id:quantity}
        setCart({...cart,[data.data.id]:1})
        setCurrentQty(currentQty-1)
      };

      //const remFromCart=()=>{
      //  
      //  setCart(()=>[
      //      {
      //        id:i,
      //        image:image,
      //        name:name,
      //        quantity:count+1,
      //        price:price * (count+1),
      //      }
      //    ]);
      //  }
      //const remCart=()=>{
      //  setCart(()=>[
      //  ]);
      //}

      
      
      const addToCart=()=>{
          setCart({...cart,[data.data.id]:cart[data.data.id]+1});
          setCurrentQty(currentQty-1);
        }
      const remFromCart=()=>{
        if(cart[data.data.id]===1)    //if there is only 1 item delete entry from cart
          {
            let temp={...cart}
            delete temp[data.data.id]
            setCart(temp);
            setCurrentQty(data['quantity']);
          }
          else
          {
            setCart({...cart,[data.data.id]:cart[data.data.id]-1});
            setCurrentQty(currentQty-1);
          }

      }
      const getcurrqtytxt=()=>{
        if(currentQty>10)
        {return "available"}
        else if(currentQty>0)
        {return "sellingFast"}
        else
        {return "unavailable"}
      }

      const text=getcurrqtytxt()
      console.log(text)
      //const loadCart=()=>{
      //  return <AddCart id={i}/>
      //}
      console.log(cart)
      console.log(Object.keys(cart))
     // console.log(count)
     // let cname=cart.length>0?"dshow":"show"
     // cname=cart.length==0?"show":"dshow"
      //const handleCart=()=>{
      //  return <div className="cartDisplay">Hello</div>
      //  
      //}
      //data.data.id in cart
    return (
      
      data.data?
        
        <div className="item">
          
            <img className="link" width={400} height={400} src={imgsrc} alt="product-1" />
            <div  className="description">
                <h3>{data.data.name}</h3>
                <p>Description: {data.data.description}</p>
                <p>Price:<strong>${data.data.price}</strong></p>
               
                <p>Variants: </p>
                {
                  variants.map((variant)=>{
                    return <button id="btnd" key={variant.color} style={{backgroundColor:variant.color,width:"40px",height:"40px"}}
                    onClick={() => setImgsrc(variant.image)}></button>
                  })
                }

                <p>Quantity:{getcurrqtytxt()}</p> 
                <p>currentQuantity:{currentQty}</p>
                { 
                
                (cart[data.data.id]>0)?
                    (<div className='counter'>    
                      <button id="btn" disabled={currentQty===data.data.quantity?true:false} onClick={remFromCart}>-</button>
                      {cart[data.data.id]}
                      <button id="btn" disabled={currentQty===0?true:false} onClick={addToCart}>+</button>
                    </div>)
                    :
                    <button id="btn" onClick={initialaddToCart}>Add to Cart</button>
                }
                <p>Reviews:</p> 
                <div className="reviews">
                  {
                      reviewdata?reviewdata.data.ratings.map((review)=>
                      (<div key={review.id}>
                            <p><b>Customer</b>:{review.name}</p>
                            <p>Rating:{review.rating}⭐</p>
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