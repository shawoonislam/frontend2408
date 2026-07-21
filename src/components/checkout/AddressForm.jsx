import InputField from "../common/InputField";
import { MapPin, Phone, User } from "../common/Icons";

export default function AddressForm({ form, errors, onChange }) {
    return (
        <div className="bg-white rounded-xl border border-ink/10 p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">Shipping Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                    label="Full name"
                    name="fullName"
                    icon={User}
                    value={form.fullName}
                    onChange={onChange}
                    error={errors.fullName}
                    placeholder="Jane Doe"
                />
                <InputField
                    label="Phone number"
                    name="phone"
                    icon={Phone}
                    value={form.phone}
                    onChange={onChange}
                    error={errors.phone}
                    placeholder="01XXXXXXXXX"
                />

                <div className="sm:col-span-2">
                    <InputField
                        label="Street address"
                        name="address"
                        icon={MapPin}
                        value={form.address}
                        onChange={onChange}
                        error={errors.address}
                        placeholder="House, road, area"
                    />
                </div>

                <InputField
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={onChange}
                    error={errors.city}
                    placeholder="Dhaka"
                />
                <InputField
                    label="Postal code"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={onChange}
                    error={errors.postalCode}
                    placeholder="1207"
                />
            </div>

            <div className="mt-4">
                <label className="text-sm font-medium text-ink block mb-1.5">Order notes (optional)</label>
                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={onChange}
                    rows={2}
                    placeholder="Delivery instructions, landmark, etc."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ink/15 bg-white text-sm placeholder:text-slate/40
            focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all resize-none"
                />
            </div>
        </div>
    );
};