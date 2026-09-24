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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="font-display text-3xl font-semibold text-ink mb-6">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl border border-ink/10 px-5">
                    
                        <CartItem  items={items} />
                       
                   
                  
                </div>

                {/* <div>
                    <CartSummary subtotal={subtotal} itemCount={totalItems} />
                </div> */}
            </div>
        </div>
    );
};