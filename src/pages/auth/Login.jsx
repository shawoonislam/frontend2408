import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Mail, Lock } from "../../components/common/Icons";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const { login, devLoginAs } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        setSubmitError("");
    };

    const validate = () => {
        const errs = {};
        if (!form.email) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
        if (!form.password) errs.password = "Password is required";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) return setErrors(errs);

        setLoading(true);
        setSubmitError("");
        // TODO: connect to POST /login
        try {
            let data = await axios.post('http://localhost:5000/login',form)
          
            if(data.data.success){
                localStorage.setItem('userinfo', JSON.stringify(data.data.data))
                navigate('/')
            }
        } catch (err) {
            setLoading(false);
            setSubmitError(err.message);
        }
    };

    const handleDevLogin = (role) => {
        devLoginAs(role);
        navigate(role === "admin" ? "/admin" : "/");
    };

    return (
        <AuthLayout title="Welcome back" subtitle="Log in to continue to your account.">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    icon={Mail}
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="you@example.com"
                />
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    icon={Lock}
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="••••••••"
                />

                <div className="flex justify-end -mt-1">
                    <Link to="/forgot-password" className="text-xs font-medium text-amber hover:underline underline-offset-2">
                        Forgot password?
                    </Link>
                </div>

                {submitError && (
                    <p className="py-2 text-sm text-center text-red-500 rounded-lg bg-red-50">{submitError}</p>
                )}

                <Button type="submit" className="mt-1">
                    Log In
                </Button>
            </form>

            <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-ink/10" />
                <span className="text-xs text-slate/60">OR</span>
                <div className="flex-1 h-px bg-ink/10" />
            </div>

            <p className="text-sm text-center text-slate">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold text-ink hover:underline underline-offset-2">
                    Register
                </Link>
            </p>

            {/* DEV ONLY — remove once real backend auth is wired */}
            <div className="pt-6 mt-8 border-t border-dashed border-ink/15">
                <p className="mb-3 text-xs text-center text-slate/50">Dev quick login (testing only)</p>
                <div className="grid grid-cols-3 gap-2">
                    {["customer", "manager", "admin"].map((role) => (
                        <button
                            key={role}
                            type="button"
                            onClick={() => handleDevLogin(role)}
                            className="py-2 text-xs font-semibold capitalize transition-colors border rounded-lg border-ink/15 text-ink/60 hover:bg-ink/5"
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>
        </AuthLayout>
    );
};