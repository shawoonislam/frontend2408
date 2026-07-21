import { Link } from "react-router";
import { Trash2 } from "../common/Icons";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
    const { incrementQuantity, decrementQuantity, removeFromCart, isPending } = useCart();
    const pending = isPending(item.productId);

    return (
        <div className="flex gap-4 py-5 border-b border-ink/10 last:border-0">
            <Link to={`/products/${item.productId}`} className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-ink/5 shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </Link>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-3">
                    <Link to={`/products/${item.productId}`} className="text-sm font-semibold text-ink hover:text-amber transition-colors line-clamp-2">
                        {item.title}
                    </Link>
                    <button
                        onClick={() => removeFromCart(item.productId)}
                        disabled={pending}
                        className="text-slate/50 hover:text-red-500 transition-colors shrink-0 disabled:opacity-30"
                        aria-label="Remove item"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                <p className="text-sm text-slate mt-1">৳{item.price.toLocaleString()}</p>

                <div className="flex items-center justify-between mt-3">
                    <QuantitySelector
                        value={item.quantity}
                        onIncrement={() => incrementQuantity(item.productId)}
                        onDecrement={() => decrementQuantity(item.productId)}
                        disabled={pending}
                    />
                    <span className="font-display text-base font-semibold text-ink">
                        ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                </div>

                {item.quantity >= item.stock && (
                    <p className="text-xs text-amber mt-1.5">Max available stock reached</p>
                )}
            </div>
        </div>
    );
};