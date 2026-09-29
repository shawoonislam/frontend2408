import { Link } from "react-router";
import { ShieldCheck } from "../common/Icons";

export default function CartSummary({ subtotal, itemCount }) {
    const shipping = subtotal > 2000 || subtotal === 0 ? 0 : 100;
    const total = subtotal + shipping;

    return (
        <div className="sticky p-5 bg-white border rounded-xl border-ink/10 top-24">
            <h3 className="mb-4 text-lg font-semibold font-display text-ink">Order Summary</h3>

            <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between text-slate">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                    <span className="font-medium text-ink">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-slate">
                    <span>Shipping</span>
                    <span className="font-medium text-ink">{shipping === 0 ? "Free" : `৳${shipping}`}</span>
                </div>
                {subtotal > 0 && subtotal < 2000 && (
                    <p className="px-3 py-2 mt-1 text-xs rounded-lg text-amber bg-amber/10">
                        Add ৳{(2000 - subtotal)} more for free shipping
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-ink/10">
                <span className="text-sm font-semibold text-ink">Total</span>
                <span className="text-2xl font-semibold font-display text-ink">৳{total}</span>
            </div>

            <Link
                to={`/checkout?subTotal=${subtotal}&itemCount=${itemCount}`}
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