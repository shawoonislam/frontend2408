import { Link } from "react-router";
import { ShieldCheck } from "../common/Icons";

export default function CartSummary({ subtotal, itemCount }) {
    const shipping = subtotal > 2000 || subtotal === 0 ? 0 : 100;
    const total = subtotal + shipping;

    return (
        <div className="bg-white rounded-xl border border-ink/10 p-5 sticky top-24">
            <h3 className="font-display text-lg font-semibold text-ink mb-4">Order Summary</h3>

            <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between text-slate">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                    <span className="text-ink font-medium">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate">
                    <span>Shipping</span>
                    <span className="text-ink font-medium">{shipping === 0 ? "Free" : `৳${shipping}`}</span>
                </div>
                {subtotal > 0 && subtotal < 2000 && (
                    <p className="text-xs text-amber bg-amber/10 rounded-lg px-3 py-2 mt-1">
                        Add ৳{(2000 - subtotal).toLocaleString()} more for free shipping
                    </p>
                )}
            </div>

            <div className="flex justify-between items-center pt-4 mt-4 border-t border-ink/10">
                <span className="text-sm font-semibold text-ink">Total</span>
                <span className="font-display text-2xl font-semibold text-ink">৳{total.toLocaleString()}</span>
            </div>

            <Link
                to="/checkout"
                className={`block text-center w-full py-3 rounded-lg text-sm font-semibold mt-5 transition-colors ${itemCount === 0
                        ? "bg-ink/10 text-ink/30 pointer-events-none"
                        : "bg-ink text-paper hover:bg-ink/90"
                    }`}
            >
                Proceed to Checkout
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate/60 mt-4">
                <ShieldCheck size={14} />
                Secure checkout
            </div>
        </div>
    );
};