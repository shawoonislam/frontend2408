import { Link, useNavigate } from "react-router";
import { AlertCircle } from "../../components/common/Icons";

export default function OrderFailed() {
    const navigate = useNavigate();

    return (
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={28} className="text-red-500" strokeWidth={2.5} />
            </div>

            <h1 className="font-display text-3xl font-semibold text-ink">Payment failed</h1>
            <p className="text-slate text-sm mt-2">
                Something went wrong processing your payment. Your cart items are still saved — nothing was lost.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                    onClick={() => navigate("/checkout")}
                    className="flex-1 py-2.5 rounded-lg bg-ink text-paper text-sm font-semibold hover:bg-ink/90 transition-colors"
                >
                    Try Again
                </button>
                <Link
                    to="/cart"
                    className="flex-1 py-2.5 rounded-lg border border-ink/15 text-ink text-sm font-semibold hover:bg-ink/5 transition-colors"
                >
                    Back to Cart
                </Link>
            </div>
        </div>
    );
};