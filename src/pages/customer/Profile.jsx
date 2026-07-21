import { useEffect, useState } from "react";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { User, Mail, Phone, MapPin } from "../../components/common/Icons";
import axios from "axios";

export default function Profile() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        postalCode: ""
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    let [userInfo,setUserInfo] = useState({})
    
        useEffect(()=>{
            let data = JSON.parse(localStorage.getItem('userinfo'))
            setUserInfo(data)
        },[])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
  
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.email) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
        if (!form.phone.trim()) errs.phone = "Phone is required";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) return setErrors(errs);

        let data = await axios.post(`http://localhost:5000/update/${userInfo._id}`,form)

 
        
    };

    // const initials = form.name
    //     .split(" ")
    //     .map((n) => n[0])
    //     .slice(0, 2)
    //     .join("")
    //     .toUpperCase();

    
    const initials = (form.name || "")
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "?";


    useEffect(()=>{
        async function getData() {
            if(userInfo._id){
                let data = await axios.get(`http://localhost:5000/singleuser/${userInfo?._id}`)
            console.log(userInfo)
            console.log(data.data.userData)
            setForm({
                 name: data?.data?.userData?.name,
                 email: data?.data?.userData?.email,
                 phone: data?.data?.userData?.phone,
                 city: data?.data?.userData?.city,
                 address: data?.data?.userData?.address,
                 postalCode: data?.data?.userData?.postalCode
            })
            }
        }
        getData()
    },[userInfo])

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <div className=" h-16 rounded-full bg-ink text-paper flex items-center justify-center font-display text-xl font-semibold shrink-0">
                    {userInfo?.name}
                </div>
                <div>
                    <h1 className="font-display text-2xl font-semibold text-ink">{form.name}</h1>
                    <p className="text-sm text-slate">
                        Member since {new Date(form.joined).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-ink/10 p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-ink mb-5">Personal Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Full name" name="name" icon={User} value={form.name} onChange={handleChange} error={errors.name} />
                    <InputField label="Email" name="email" type="email" icon={Mail} value={form.email} onChange={handleChange} error={errors.email} />
                    <InputField label="Phone" name="phone" icon={Phone} value={form.phone} onChange={handleChange} error={errors.phone} />
                    <InputField label="City" name="city" value={form.city} onChange={handleChange} />
                    <div className="sm:col-span-2">
                        <InputField label="Address" name="address" icon={MapPin} value={form.address} onChange={handleChange} />
                    </div>
                    <InputField label="Postal code" name="postalCode" value={form.postalCode} onChange={handleChange} />
                </div>

                <div className="flex items-center gap-4 mt-6">
                    <Button type="submit" loading={saving} className="w-auto px-6">
                        Save Changes
                    </Button>
                    {saved && <span className="text-sm text-green-600 font-medium">Saved successfully</span>}
                </div>
            </form>
        </div>
    );
};