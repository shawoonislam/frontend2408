import { Link } from "react-router";
import { ShoppingCart } from "../../components/common/Icons";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import { PageLoader } from "../../components/common/Loader";

export default function Cart() {
    const { items, subtotal, totalItems, loading } = useCart();

    if (loading) return <PageLoader />;

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <div className="w-20 h-20 rounded-full bg-ink/5 flex items-center justify-center mx-auto mb-5">
                    <ShoppingCart size={28} className="text-ink/30" />
                </div>
                <h1 className="font-display text-2xl font-semibold text-ink">Your cart is empty</h1>
                <p className="text-slate text-sm mt-2">Looks like you haven't added anything yet.</p>
                <Link
                    to="/products"
                    className="inline-block mt-6 px-6 py-2.5 rounded-lg bg-ink text-paper text-sm font-semibold hover:bg-ink/90 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="font-display text-3xl font-semibold text-ink mb-6">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl border border-ink/10 px-5">
                    {items.map((item) => (
                        <CartItem key={item.productId} item={item} />
                    ))}
                </div>

                <div>
                    <CartSummary subtotal={subtotal} itemCount={totalItems} />
                </div>
            </div>
        </div>
    );
};