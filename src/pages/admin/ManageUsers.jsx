import { useState, useMemo, useEffect } from "react";
import { Search } from "../../components/common/Icons";
import UserTable from "../../components/admin/UserTable";
import Modal from "../../components/common/Modal";
import { mockUser } from "../../utils/mockUsers";
import axios from "axios";

const roleFilters = ["all", "customer", "DUser"];

export default function ManageUsers() {
    // TODO: replace with data fetched from GET /getallusers
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    

    useEffect(()=>{
        async function getUsers(){
            let data = await axios.get('http://localhost:5000/allusers')
            setUsers(data.data.userData)
        }
        getUsers()
    },[])


        let handleDelete = async (id)=>{
            await axios.delete(`http://localhost:5000/deleteuser/${id}`)
            
            let data = await axios.get('http://localhost:5000/allusers')
            setUsers(data.data.userData)
        }

        let handleDeleteUser = async ()=>{
            
             let data = await axios.get('http://localhost:5000/alldeleteusers')
            setUsers(data.data.userData)
        }
        let handleActiveUser = async ()=>{
            
             let data = await axios.get('http://localhost:5000/allusers')
            setUsers(data.data.userData)
        }

        let handleActive = async (id)=>{

            await axios.post(`http://localhost:5000/update/${id}`,{
                isDelete: false

            })

            let data = await axios.get('http://localhost:5000/allusers')
            setUsers(data.data.userData)

        }

        let handleSearch = async ()=>{
            console.log(search.toLowerCase())

            let data = await axios.post('http://localhost:5000/search',{
                name: search
            }) 
            console.log(data)
            
        }


    return (
        <div>
            <div className="mb-6">
                <h1 className="font-display text-2xl font-semibold text-ink">Users</h1>
                <p className="text-sm text-slate mt-1">{users.length} registered users</p>
            </div>

            <div className="flex items-center gap-3 flex-wrap mb-5">
                <div className="relative flex-1 max-w-sm">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/50" />
                    <input
                        type="text"
                        // value={search}
                        onChange={(e)=> setSearch(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-ink/15 bg-white text-sm
              focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all"
                    />
                    <button onClick={handleSearch}>search</button>
                </div>

                <div className="flex gap-2">
                     <button
                            onClick={handleActiveUser}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-colors`}
                        >
                            Auser
                        </button>
                     <button
                            onClick={handleDeleteUser}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-colors`}
                        >
                            Duser
                        </button>
                </div>
            </div>

            <UserTable users={users} handleDelete={handleDelete} handleActive={handleActive} onDeleteClick={setDeleteTarget} />

            <Modal
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                title="Delete user?"
                footer={
                    <>
                        <button
                            onClick={() => setDeleteTarget(null)}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-ink/70 hover:bg-ink/5 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-60"
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </button>
                    </>
                }
            >
                <p className="text-sm text-slate">
                    Are you sure you want to delete <strong className="text-ink">{deleteTarget?.name}</strong>? This can't be undone.
                </p>
            </Modal>
        </div>
    );
};