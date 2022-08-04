
import { atom,useRecoilState } from "recoil";

export const cartAtom=atom({
    key:'cart',
    default:{},
  })

export const useCart=()=>{
    const [cart,setCart]=useRecoilState(cart);
    return [cart,setCart]
}