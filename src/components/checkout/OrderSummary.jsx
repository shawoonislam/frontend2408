export default function OrderSummary({ items, subtotal }) {
    const shipping = subtotal > 2000 || subtotal === 0 ? 0 : 100;
    const total = Number(subtotal) + shipping;

    return (
        <div className="sticky p-5 bg-white border rounded-xl border-ink/10 top-24">
            <h3 className="mb-4 text-lg font-semibold font-display text-ink">
                Your Order ({items > 1 ? items + " items": items + " item"})
            </h3>

            <div className="flex flex-col gap-3 pr-1 overflow-y-auto max-h-72">
                {/* {items.map((item) => (
                    <div key={item._id} className="flex gap-3">
                        <div className="relative shrink-0">
                            <div className="overflow-hidden rounded-lg w-14 h-14 bg-ink/5">
                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                            </div>
                            <span className="absolute -top-2 -right-2 bg-ink text-paper text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-ink line-clamp-1">{item.name}</p>
                            <p className="text-xs text-slate mt-0.5">
                                ৳{item.price.toLocaleString()} × {item.quantity}
                            </p>
                        </div>
                        <span className="text-sm font-semibold text-ink shrink-0">
                            ৳{(item.price * item.quantity).toLocaleString()}
                        </span>
                    </div>
                ))} */}
            </div>

            <div className="flex flex-col gap-2.5 text-sm pt-4 mt-4 border-t border-ink/10">
                <div className="flex justify-between text-slate">
                    <span>Subtotal</span>
                    <span className="font-medium text-ink">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate">
                    <span>Shipping</span>
                    <span className="font-medium text-ink">{shipping === 0 ? "Free" : `৳${shipping}`}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-ink/10">
                <span className="text-sm font-semibold text-ink">Total</span>
                <span className="text-2xl font-semibold font-display text-ink">৳{total}</span>
            </div>
        </div>
    );
};