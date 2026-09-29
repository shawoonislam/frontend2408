import { Link } from "react-router";
import { ShoppingCart } from "../../components/common/Icons";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import { PageLoader } from "../../components/common/Loader";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
    // const { items, subtotal, totalItems, loading } = useCart();
let [items,setItems] = useState([])
   useEffect(()=>{
    let user = JSON.parse(localStorage.getItem('userinfo'))
        async function cart(){
            let data = await axios.get(`http://localhost:5000/cart/${user._id}`)
            setItems(data.data)
            console.log("asdasd",data.data)

        }
        cart()
   },[])

    return (
        <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="mb-6 text-3xl font-semibold font-display text-ink">Shopping Cart</h1>

            <div >
                <div >
                    
                        <CartItem  items={items} />
                       
                   
                  
                </div>

                {/* <div>
                    <CartSummary subtotal={140} itemCount={1200} />
                </div> */}
            </div>
        </div>
    );
};