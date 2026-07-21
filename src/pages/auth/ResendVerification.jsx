import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

export default function ResendVerification() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return setError("Email is required");
        if (!/\S+@\S+\.\S+/.test(email)) return setError("Enter a valid email");

        setLoading(true);
        // TODO: connect to POST /resendverificationemail
        console.log("Resend verification submit:", email);
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 800);
    };

    if (sent) {
        return (
            <AuthLayout title="Verification email sent" subtitle="Check your inbox for the new link.">
                <button onClick={() => setSent(false)} className="text-sm text-amber hover:underline">
                    Send to a different email
                </button>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title="Resend verification email" subtitle="Enter your email to get a new verification link.">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                    error={error}
                    placeholder="you@example.com"
                />
                <Button type="submit" loading={loading}>Resend Email</Button>
            </form>
        </AuthLayout>
    );
};