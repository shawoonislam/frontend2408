import { useParams, Link } from "react-router";
import { Mail, Phone, User as UserIcon, Package } from "../../components/common/Icons";
import { mockUser } from "../../utils/mockUsers";
import { mockOrders } from "../../utils/mockOrders";
import OrderStatusBadge from "../../components/common/OrderStatusBadge";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDetails() {
    const { id } = useParams();
    let [user,setUser] = useState({})
    useEffect(()=>{
        async function getData(){
            let data = await axios.get(`http://localhost:5000/singleuser/${id}`)
            setUser(data.data.userData)
           
        }
         getData()
    },[])

    if (!user) {
        return (
            <div className="py-16 text-center">
                <p className="text-slate">User not found.</p>
                <Link to="/admin/users" className="inline-block mt-2 font-medium text-amber hover:underline">
                    Back to users
                </Link>
            </div>
        );
    }

    

    return (
        <div>
            <Link to="/admin/users" className="text-sm transition-colors text-slate hover:text-ink">
                ← Back to Users
            </Link>

            <div className="flex items-center gap-4 mt-4 mb-8">
                
                <div>
                    <h1 className="text-2xl font-semibold font-display text-ink">{user.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${user.role === "admin" ? "text-amber bg-amber/10" : "text-slate bg-ink/5"}`}>
                            {user.role}
                        </span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${user.status === "active" ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"}`}>
                            {user.status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="p-5 bg-white border lg:col-span-1 rounded-xl border-ink/10">
                    <h2 className="mb-4 text-lg font-semibold font-display text-ink">Contact Info</h2>
                    <div className="flex flex-col gap-3 text-sm">
                        <div className="flex items-center gap-3 text-slate">
                            <Mail size={16} className="text-ink/40 shrink-0" />
                            {user.email}
                        </div>
                        <div className="flex items-center gap-3 text-slate">
                            <Phone size={16} className="text-ink/40 shrink-0" />
                            {user.phone}
                        </div>
                        <div className="flex items-center gap-3 text-slate">
                            <UserIcon size={16} className="text-ink/40 shrink-0" />
                            Joined {new Date(user.createdAt).toString()}
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-white border lg:col-span-2 rounded-xl border-ink/10">
                    <h2 className="mb-4 text-lg font-semibold font-display text-ink">Order History</h2>
                    
                </div>
            </div>
        </div>
    );
};