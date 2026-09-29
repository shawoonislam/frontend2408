import { Link } from "react-router";
import { Trash2 } from "../common/Icons";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import CartSummary from "./CartSummary";

export default function CartItem({ items }) {

    let[totalPri,setTotalPri] = useState()
    useEffect(()=>{
       if(items?.totalCartPrice){
        setTotalPri(items?.totalCartPrice)
       } 
    },[items?.totalCartPrice])
    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="px-5 bg-white border lg:col-span-2 rounded-xl border-ink/10">
            {items?.cart?.map(item=>(
 <div className="flex gap-4 py-5 border-b border-ink/10 last:border-0">
            <Link to={`/products/${item.product.productId}`} className="w-20 h-20 overflow-hidden rounded-lg sm:w-24 sm:h-24 bg-ink/5 shrink-0">
                <img src={`http://localhost:5000/${item.product.images[0].url}`} alt={item.product.title} className="object-cover w-full h-full" />
            </Link>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-3">
                    <Link to={`/products/${item.product.productId}`} className="text-sm font-semibold transition-colors text-ink hover:text-amber line-clamp-2">
                        {item.product.title}  {item.product._id}
                    </Link>
                    <button
                        onClick={() => removeFromCart(item.product.productId)}
                        // disabled={pending}
                        className="transition-colors text-slate/50 hover:text-red-500 shrink-0 disabled:opacity-30"
                        aria-label="Remove item"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                <p className="mt-1 text-sm text-slate">৳{item.product.price}</p>

                <div className="flex items-center justify-between mt-3">
                    <QuantitySelector id={item._id} quantity={item.quantity} price={item.product.price} totalPri={totalPri} setTotalPri={setTotalPri}/>
                   
                   
                </div>

                {item.quantity >= item.product.stock && (
                    <p className="text-xs text-amber mt-1.5">Max available stock reached</p>
                )}
                
            </div>
            
        </div>
        ))}
       
        <h1 className="font-bold text-black tex-xl bg-amber-200">Total: {totalPri}  </h1>
        </div>
        <div>
            <CartSummary subtotal={totalPri} itemCount={items?.cart?.length} />
        </div>

        </div>
    );
};