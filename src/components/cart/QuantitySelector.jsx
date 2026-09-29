import axios from "axios";
import { Minus, Plus, Loader2 } from "../common/Icons";
import { useState } from "react";

export default function QuantitySelector({id, quantity,price,totalPri,setTotalPri}) {

    let [quan,setQuan] = useState(quantity)

    let onDecrement = async (type)=>{
        console.log("quantity",id)

        let data = await axios.post(`http://localhost:5000/cart/update/${id}`,{
            type:type
        })
        if(data.data.message == "Out of Stock"){
            return alert("Out of stock")
        }
        if(type== 'plus'){
            quan++
            setTotalPri(price+totalPri)
            setQuan(quan)
        }else{
            quan--
            setTotalPri(totalPri-price)
            setQuan(quan)
        }


        console.log(data)
    }
    return (
        <>
            <div className="flex items-center border rounded-lg border-ink/15 w-fit">
            <button
                onClick={()=>onDecrement('minus')}
                // disabled={disabled || value <= min}
                className="flex items-center justify-center transition-colors w-9 h-9 text-ink/60 hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <Minus size={14} />
            </button>
            <span className="flex items-center justify-center w-10 text-sm font-medium">
                {quan}
            </span>
            <button
                 onClick={()=>onDecrement('plus')}
                // onClick={onIncrement}
                // disabled={disabled}
                className="flex items-center justify-center transition-colors w-9 h-9 text-ink/60 hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <Plus size={14} />
            </button>
        </div>
         <span className="text-base font-semibold font-display text-ink">
            ৳{(price * quan).toLocaleString()}
        </span>

        
        </>
    );
};