import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router";
import { useCart } from "../../context/CartContext";
import AddressForm from "../../components/checkout/AddressForm";
import PaymentMethodSelector from "../../components/checkout/PaymentMethodSelector";
import OrderSummary from "../../components/checkout/OrderSummary";
import Button from "../../components/common/Button";
import axios from "axios";

export default function Checkout() {
  // const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  console.log("params", searchParams.get("subTotal"));
  console.log("params", searchParams.get("itemCount"));

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
    email: "",
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
    else if (!/^01[3-9]\d{8}$/.test(form.phone.trim()))
      errs.phone = "Enter a valid BD phone number";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.postalCode.trim()) errs.postalCode = "Postal code is required";
    return errs;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    const shipping =
      searchParams.get("subTotal") > 2000 || searchParams.get("subTotal") === 0
        ? 0
        : 100;

    let data = await axios.post("http://localhost:5000/payment", {
      userId: JSON.parse(localStorage.getItem("userinfo"))._id,
      cus_name: form.fullName,
      cus_email: form.email,
      cus_add1: form.address,
      cus_city: form.city,
      cus_postcode: form.postalCode,
      cus_phone: form.phone,
      shipping: shipping,
    });

    window.location.href = data.data.payment_url;
  };

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-semibold font-display text-ink">
        Checkout
      </h1>

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        <div className="flex flex-col gap-6 lg:col-span-2">
          <AddressForm form={form} errors={errors} onChange={handleChange} />
          <PaymentMethodSelector
            selected={paymentMethod}
            onChange={setPaymentMethod}
          />
        </div>

        <div className="flex flex-col gap-4">
          <OrderSummary
            items={searchParams.get("itemCount")}
            subtotal={searchParams.get("subTotal")}
          />
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
}
