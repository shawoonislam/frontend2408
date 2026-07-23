import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import AuthLayout from "../../layouts/AuthLayout";
import axios from "axios";

export default function VerifyEmail() {
    const { token } = useParams();
    const [status, setStatus] = useState("verifying"); // verifying | success | error

    useEffect(() => {
        console.log("Verifying token:", token);
        let data = axios.post(`http://localhost:5000/verifyemail/${token}`)
        setStatus("success")
    }, [token]);

    return (
        <AuthLayout
            title={
                status === "verifying"
                    ? "Verifying your email..."
                    : status === "success"
                        ? "Email verified"
                    : "Verification failed"
            }
            subtitle={
                status === "verifying"
                    ? "This will just take a moment."
                    : status === "success"
                        ? "Your account is now active."
                        : "This link may be expired or invalid."
            }
        >
            {status === "success" && (
                <Link to="/login" className="inline-block text-sm font-semibold text-amber hover:underline">
                    Continue to login →
                </Link>
            )}
            {status === "error" && (
                <Link to="/resend-verification" className="inline-block text-sm font-semibold text-amber hover:underline">
                    Resend verification email →
                </Link>
            )}
        </AuthLayout>
    );
};