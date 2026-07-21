import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown } from "../common/Icons";
import OrderStatusBadge from "../common/OrderStatusBadge";

export default function OrderCard({ order }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white rounded-xl border border-ink/10 overflow-hidden">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-5 text-left"
            >
                <div className="flex items-center gap-4 flex-wrap">
                    <div>
                        <p className="text-xs text-slate">Order</p>
                        <p className="text-sm font-semibold text-ink">{order._id}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate">Placed on</p>
                        <p className="text-sm text-ink">
                            {new Date(order.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-slate">Total</p>
                        <p className="text-sm font-semibold text-ink">৳{order.total.toLocaleString()}</p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                </div>

                <ChevronDown size={18} className={`text-ink/40 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>

            {expanded && (
                <div className="border-t border-ink/10 p-5">
                    <p className="text-xs text-slate mb-3">Paid via {order.paymentMethod}</p>
                    <div className="flex flex-col gap-3">
                        {order.items.map((item) => (
                            <div key={item._id} className="flex items-center gap-3">
                                <Link to={`/products/${item._id}`} className="w-12 h-12 rounded-lg overflow-hidden bg-ink/5 shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </Link>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-ink font-medium line-clamp-1">{item.name}</p>
                                    <p className="text-xs text-slate">Qty: {item.quantity}</p>
                                </div>
                                <span className="text-sm font-semibold text-ink">৳{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};