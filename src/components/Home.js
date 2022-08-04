import {useQuery} from "react-query"
import axios from "axios"
import {Link,useParams } from "react-router-dom";
import '../App.css';

export const Home=()=>{
  //move the async function to a file called ProductsApi.js under Api folder
  //check with naga|teja
    const { isLoading, isError,status, data, error }= useQuery (['products'],async ()=>{
        return await axios.get('https://obscure-refuge-62167.herokuapp.com/products');
      })
      
    if (isLoading) {
        return <span>Loading...</span>
    }
    
    if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
    }
    console.log(data)
    console.log(isError)
    console.log(isLoading)
        
     //1
    return (
        <>
        
          <div className="nav2">
              <h1>Products</h1>
              <button style={{marginTop:"30px",backgroundColor:"blue",color:"white",height:"30px",borderRadius:"4px"}}>Create Product</button>
          </div>
          <div className="productslist">
          {
          data?.data.map((i)=>{
            const path=`/products/${i.id}`
            return (<>
            <Link className="link" to={path}><img width={250} height={250} src={i.image} alt="product" />
            <div className="description">
                <h3 className="namewrap">{i.name}</h3>
                <p className="namewrap">{i.description }</p>
                <p className="namewrap">Price:<b>$</b>{i.price}</p>
            </div>
            </Link> 
            </>)})
          }
          </div>
        
        </>
      )
      //  }
  
  
    }