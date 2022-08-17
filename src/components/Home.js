import {useQuery} from "react-query"
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {getAllProducts} from "../apis/ProductsApi"
import '../App.css';

export const Home=()=>{
  const navigate=useNavigate();
  const {isLoading,isError,data, error }= useQuery (['productss'], getAllProducts)
      
  if (isLoading) {
    return <span>Loading...</span>
  }
    
  if (isError) {
    console.log(error)
    return <span>Error: {error.message}</span>
  }

  function handleClick()
  {
    navigate('/createproduct')
  }
  
  return (
    <>
      <div className="nav2">
          <h1>Products</h1>
          <button id="btn" onClick={handleClick}>Create Product</button>
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
}