import { Link } from "react-router";
import { Check, Package } from "../../components/common/Icons";

export default function OrderSuccess() {
    const orderNumber = `LC${Math.floor(100000 + Math.random() * 900000)}`;

    return (
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                <Check size={28} className="text-green-600" strokeWidth={2.5} />
            </div>

            <h1 className="font-display text-3xl font-semibold text-ink">Order placed!</h1>
            <p className="text-slate text-sm mt-2">
                Thanks for your order. A confirmation has been sent to your email.
            </p>

            <div className="bg-white border border-ink/10 rounded-xl p-5 mt-8 flex items-center gap-4 text-left">
                <div className="w-11 h-11 rounded-lg bg-amber/10 flex items-center justify-center shrink-0">
                    <Package size={20} className="text-amber" />
                </div>
                <div>
                    <p className="text-xs text-slate">Order number</p>
                    <p className="text-sm font-semibold text-ink">{orderNumber}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                    to="/my-orders"
                    className="flex-1 py-2.5 rounded-lg bg-ink text-paper text-sm font-semibold hover:bg-ink/90 transition-colors"
                >
                    Track Order
                </Link>
                <Link
                    to="/products"
                    className="flex-1 py-2.5 rounded-lg border border-ink/15 text-ink text-sm font-semibold hover:bg-ink/5 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};