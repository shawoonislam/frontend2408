import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useCart } from "../../context/CartContext";
import AddressForm from "../../components/checkout/AddressForm";
import PaymentMethodSelector from "../../components/checkout/PaymentMethodSelector";
import OrderSummary from "../../components/checkout/OrderSummary";
import Button from "../../components/common/Button";

export default function Checkout() {
    const { items, subtotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "", phone: "", address: "", city: "", postalCode: "", notes: "",
    });
    const [errors, setErrors] = useState({});
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [placing, setPlacing] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const errs = {};
        if (!form.fullName.trim()) errs.fullName = "Name is required";
        if (!form.phone.trim()) errs.phone = "Phone number is required";
        else if (!/^01[3-9]\d{8}$/.test(form.phone.trim())) errs.phone = "Enter a valid BD phone number";
        if (!form.address.trim()) errs.address = "Address is required";
        if (!form.city.trim()) errs.city = "City is required";
        if (!form.postalCode.trim()) errs.postalCode = "Postal code is required";
        return errs;
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) return setErrors(errs);

        setPlacing(true);
        // TODO: connect to POST /payment with { form, paymentMethod, items, total }
        console.log("Place order:", { form, paymentMethod, items, subtotal });

        setTimeout(() => {
            setPlacing(false);
            const success = Math.random() > 0.15; // simulated outcome until real payment gateway is wired
            if (success) {
                clearCart();
                navigate("/order-success");
            } else {
                navigate("/order-failed");
            }
        }, 1200);
    };

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <h1 className="font-display text-2xl font-semibold text-ink">Your cart is empty</h1>
                <p className="text-slate text-sm mt-2">Add something to your cart before checking out.</p>
                <Link
                    to="/products"
                    className="inline-block mt-6 px-6 py-2.5 rounded-lg bg-ink text-paper text-sm font-semibold hover:bg-ink/90 transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="font-display text-3xl font-semibold text-ink mb-6">Checkout</h1>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <AddressForm form={form} errors={errors} onChange={handleChange} />
                    <PaymentMethodSelector selected={paymentMethod} onChange={setPaymentMethod} />
                </div>

                <div className="flex flex-col gap-4">
                    <OrderSummary items={items} subtotal={subtotal} />
                    <Button type="submit" variant="accent" loading={placing}>
                        Place Order
                    </Button>
                    <p className="text-xs text-slate/60 text-center">
                        By placing this order, you agree to our terms of service.
                    </p>
                </div>
            </form>
        </div>
    );
};