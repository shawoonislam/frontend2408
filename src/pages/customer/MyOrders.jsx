import { useState } from "react";
import { Link } from "react-router";
import { Package } from "../../components/common/Icons";
import OrderCard from "../../components/order/OrderCard";
import { mockOrders } from "../../utils/mockOrders";

const filters = ["all", "processing", "shipped", "delivered", "cancelled"];

export default function MyOrders() {
    const [filter, setFilter] = useState("all");

    // TODO: replace mockOrders with data fetched from GET /get-order (needs a :userId param on backend)
    const orders = mockOrders;
    const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

    return (
        <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-1">My Orders</h1>
            <p className="text-sm text-slate mb-6">Track and manage your recent orders.</p>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors capitalize ${filter === f ? "bg-ink text-paper" : "bg-ink/5 text-ink/60 hover:bg-ink/10"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-ink/10">
                    <div className="w-14 h-14 rounded-full bg-ink/5 flex items-center justify-center mx-auto mb-4">
                        <Package size={22} className="text-ink/30" />
                    </div>
                    <p className="text-slate text-sm">No {filter !== "all" ? filter : ""} orders found.</p>
                    <Link to="/products" className="text-amber text-sm font-medium hover:underline mt-2 inline-block">
                        Start shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {filtered.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
};