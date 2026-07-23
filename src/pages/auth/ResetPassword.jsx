import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import axios from "axios";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const errs = {};
        if (!form.password) errs.password = "Password is required";
        else if (form.password.length < 6) errs.password = "At least 6 characters";
        if (form.confirmPassword !== form.password) errs.confirmPassword = "Passwords don't match";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello")
        const errs = validate();
        if (Object.keys(errs).length) return setErrors(errs);

        // setLoading(true);
        // TODO: connect to POST /resetpassword/:token
        console.log("Reset password submit:", { token, ...form });
        let data = await axios.post(`http://localhost:5000/resetpassword/${token}`,form)
        console.log(data)
      
    };

    return (
        <AuthLayout title="Set a new password" subtitle="Make sure it's something you'll remember.">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputField
                    label="New password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="At least 6 characters"
                />
                <InputField
                    label="Confirm new password"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    placeholder="••••••••"
                />
                <Button type="submit" loading={loading}>Reset Password</Button>
            </form>
        </AuthLayout>
    );
};