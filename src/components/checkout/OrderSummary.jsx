export default function OrderSummary({ items, subtotal }) {
    const shipping = subtotal > 2000 || subtotal === 0 ? 0 : 100;
    const total = subtotal + shipping;

    return (
        <div className="bg-white rounded-xl border border-ink/10 p-5 sticky top-24">
            <h3 className="font-display text-lg font-semibold text-ink mb-4">
                Your Order ({items.length} {items.length === 1 ? "item" : "items"})
            </h3>

            <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                    <div key={item._id} className="flex gap-3">
                        <div className="relative shrink-0">
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-ink/5">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="absolute -top-2 -right-2 bg-ink text-paper text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-ink font-medium line-clamp-1">{item.name}</p>
                            <p className="text-xs text-slate mt-0.5">
                                ৳{item.price.toLocaleString()} × {item.quantity}
                            </p>
                        </div>
                        <span className="text-sm font-semibold text-ink shrink-0">
                            ৳{(item.price * item.quantity).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2.5 text-sm pt-4 mt-4 border-t border-ink/10">
                <div className="flex justify-between text-slate">
                    <span>Subtotal</span>
                    <span className="text-ink font-medium">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate">
                    <span>Shipping</span>
                    <span className="text-ink font-medium">{shipping === 0 ? "Free" : `৳${shipping}`}</span>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 mt-4 border-t border-ink/10">
                <span className="text-sm font-semibold text-ink">Total</span>
                <span className="font-display text-2xl font-semibold text-ink">৳{total.toLocaleString()}</span>
            </div>
        </div>
    );
};