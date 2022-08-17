import {Routes, Route, NavLink } from 'react-router-dom'
import {QueryClientProvider,QueryClient} from "react-query"
import {Home} from "./components/Home"
import {Products} from "./components/Products"
import {CreateProduct} from "./components/CreateProduct"
import {NotFound} from "./components/NotFound"
import {cartAtom} from "./atoms/cartAtom"
import { AddCart } from './components/AddCart'
import {useRecoilState} from "recoil"
import {useState} from "react"
import './App.css';

function App() {
  const [cart,setCart]=useRecoilState(cartAtom)
  const [visible,setVisible]=useState("none")
  const queryClient = new QueryClient();

  function getvisisble()
  {
    setVisible(prevState => {if(prevState === "none"){return "block" }else return "none"})
  }

  return (
    <QueryClientProvider client = {queryClient}>
    <div className = "main">
      <div className = "nav1">
            <div>
            <NavLink className = {(isActive)=>( isActive ? "ActiveLink" : undefined) } to = '/'>Home</NavLink>
            <NavLink className = {({isActive})=>( isActive ? "ActiveLink" : undefined) } style = {{marginLeft:"20px"}} to = '/products/:id'>Products</NavLink>
            </div>
            <div className = 'parent'>
              <button id = "btncart" onClick = {getvisisble} >Cart({Object.keys(cart).length})</button>
            
              <div className = "maincart" style = {{display:[visible]}}>
                  <div className = "childcart" style = {{border:"2px solid black"}}>
                    {Object.keys(cart).map((id)=><AddCart id = {id} quantity = {cart[`${id}`]} />)}
                  </div>
              </div> 
            </div>  
      </div>  
      <Routes className = "route">
            <Route exact path = "/" element = {<Home/>} />
            <Route path = "/products/:id" element = {<Products/>} />
              <Route path = "/createproduct" element = {<CreateProduct/>} />
              <Route exact path = "*" element = {<NotFound/>} />
      </Routes>
    </div>
    </QueryClientProvider>
    
  );
}
export default App;

