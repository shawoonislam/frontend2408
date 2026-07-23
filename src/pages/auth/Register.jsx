import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Mail, Lock } from "../../components/common/Icons";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";

function getPasswordStrength(password) {
    if (!password) return { label: "", width: "0%", color: "" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
        { label: "Weak", width: "25%", color: "bg-red-400" },
        { label: "Fair", width: "50%", color: "bg-amber" },
        { label: "Good", width: "75%", color: "bg-amber" },
        { label: "Strong", width: "100%", color: "bg-green-500" },
    ];
    return levels[Math.min(score, 3)];
}

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const navigate = useNavigate();
    const { register } = useAuth();

    const strength = getPasswordStrength(form.password);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        setSubmitError("");
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.email) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
        if (!form.password) errs.password = "Password is required";
        else if (form.password.length < 6) errs.password = "At least 6 characters";
        if (form.confirmPassword !== form.password) errs.confirmPassword = "Passwords don't match";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const errs = validate();
        if (Object.keys(errs).length) return setErrors(errs);

        setLoading(true);
        setSubmitError("");
        // TODO: connect to POST /registration
        try {
            let data = await axios.post('http://localhost:5000/registration',form)
            setLoading(false)
            navigate('/login')
        } catch (err) {
            setLoading(false);
            setSubmitError(err.message);
        }
    };

    return (
        <AuthLayout title="Create your account" subtitle="Start shopping in a couple of minutes.">
        
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputField
                    label="Full name"
                    name="name"
                    icon={User}
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Jane Doe"
                />
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

                <div>
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        icon={Lock}
                        value={form.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="At least 6 characters"
                    />
                    {form.password && (
                        <div className="mt-1.5 flex items-center gap-2">
                            <div className="h-1 flex-1 rounded-full bg-ink/10 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                                    style={{ width: strength.width }}
                                />
                            </div>
                            <span className="text-xs text-slate/60 w-12">{strength.label}</span>
                        </div>
                    )}
                </div>

                <InputField
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    icon={Lock}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    placeholder="••••••••"
                />
                
                <input type="checkbox" />asdasd

                {submitError && (
                    <p className="text-sm text-red-500 text-center bg-red-50 py-2 rounded-lg">{submitError}</p>
                )}
   
                {loading 
                ? 
                <Button  className="mt-1 disabled:bg-gray-400">
                      <FidgetSpinner
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="fidget-spinner-loading"
                        wrapperStyle={{}}
                        wrapperClass="fidget-spinner-wrapper"
                    />
                </Button>
                
                :
                <Button type="submit" loading={loading} className="mt-1">
                    Create Account
                </Button>
                }
            </form>

            <div className="flex items-center gap-3 my-6">
                <div className="h-px bg-ink/10 flex-1" />
                <span className="text-xs text-slate/60">OR</span>
                <div className="h-px bg-ink/10 flex-1" />
            </div>

            <p className="text-sm text-slate text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-ink font-semibold hover:underline underline-offset-2">
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
};