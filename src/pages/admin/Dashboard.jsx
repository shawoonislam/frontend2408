import { Package, Users, ShoppingBag } from "../../components/common/Icons";
import { mockProducts } from "../../utils/mockProducts";
import { mockUser } from "../../utils/mockUsers";
import { mockOrders } from "../../utils/mockOrders";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
    // const stats = [
    //     { label: "Total Products", value: mockProducts.length, icon: Package },
    //     { label: "Total Users", value: mockUser.length, icon: Users },
    //     { label: "Total Orders", value: mockOrders.length, icon: ShoppingBag },
    // ];

    let [users, setUsers] = useState(0)

    useEffect(()=>{
        async function getUsers(){
            let data = await axios.get('http://localhost:5000/allusers')
            setUsers(data.data.userData.length)
        }
        getUsers()
    },[])

    return (
        <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-1">Dashboard</h1>
            <p className="text-sm text-slate mb-6">Overview of your store.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* {stats.map(({ label, value, icon: Icon }) => ( */}
                    <div className="bg-white rounded-xl border border-ink/10 p-5 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-lg bg-amber/10 flex items-center justify-center shrink-0">
                            {/* <Icon size={20} className="text-amber" /> */}
                        </div>
                        <div>
                            <p className="text-xs text-slate">Total Users</p>
                            <p className="font-display text-2xl font-semibold text-ink">{users}</p>
                        </div>
                    </div>
                {/* ))} */}
            </div>
        </div>
    );
};