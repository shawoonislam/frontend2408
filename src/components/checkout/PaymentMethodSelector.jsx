import { CreditCard, Check } from "../common/Icons";

const methods = [
    { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives" },
    { id: "bkash", label: "bKash", desc: "Pay via bKash mobile banking" },
    { id: "nagad", label: "Nagad", desc: "Pay via Nagad mobile banking" },
    { id: "card", label: "Debit / Credit Card", desc: "Visa, Mastercard, and more" },
];

export default function PaymentMethodSelector({ selected, onChange }) {
    return (
        <div className="bg-white rounded-xl border border-ink/10 p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">Payment Method</h2>

            <div className="flex flex-col gap-3">
                {methods.map((method) => (
                    <button
                        type="button"
                        key={method.id}
                        onClick={() => onChange(method.id)}
                        className={`flex items-center justify-between text-left p-4 rounded-lg border transition-colors ${selected === method.id
                                ? "border-amber bg-amber/5"
                                : "border-ink/15 hover:border-ink/25"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${selected === method.id ? "bg-amber text-ink" : "bg-ink/5 text-ink/50"
                                    }`}
                            >
                                <CreditCard size={16} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-ink">{method.label}</p>
                                <p className="text-xs text-slate">{method.desc}</p>
                            </div>
                        </div>

                        <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected === method.id ? "border-amber bg-amber" : "border-ink/20"
                                }`}
                        >
                            {selected === method.id && <Check size={12} className="text-ink" strokeWidth={3} />}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};