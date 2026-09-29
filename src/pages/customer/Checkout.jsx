import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router";
import { useCart } from "../../context/CartContext";
import AddressForm from "../../components/checkout/AddressForm";
import PaymentMethodSelector from "../../components/checkout/PaymentMethodSelector";
import OrderSummary from "../../components/checkout/OrderSummary";
import Button from "../../components/common/Button";

export default function Checkout() {
    // const { items, subtotal, clearCart } = useCart();
    const navigate = useNavigate();
    let [searchParams] = useSearchParams()
    console.log("params",searchParams.get('subTotal'))
    console.log("params",searchParams.get('itemCount'))

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
        // console.log("Place order:", { form, paymentMethod, items, subtotal });

        setTimeout(() => {
            setPlacing(false);
            const success = Math.random() > 0.15; // simulated outcome until real payment gateway is wired
            if (success) {
                // clearCart();
                navigate("/order-success");
            } else {
                navigate("/order-failed");
            }
        }, 1200);
    };

  

    return (
        <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="mb-6 text-3xl font-semibold font-display text-ink">Checkout</h1>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <AddressForm form={form} errors={errors} onChange={handleChange} />
                    <PaymentMethodSelector selected={paymentMethod} onChange={setPaymentMethod} />
                </div>

                <div className="flex flex-col gap-4">
                    <OrderSummary items={searchParams.get('itemCount')} subtotal={searchParams.get('subTotal')} />
                    <Button type="submit" variant="accent" loading={placing}>
                        Place Order
                    </Button>
                    <p className="text-xs text-center text-slate/60">
                        By placing this order, you agree to our terms of service.
                    </p>
                </div>
            </form>
        </div>
    );
};