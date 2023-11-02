/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function profilePage() {
    const router = useRouter();
    const [data, setData] = useState("Nothing")

    const logout = async () => {
        try {
            axios.get("api/users/logout");
            router.push('/login')
        } catch (error: any) {
           toast(error.message);
        }

    };

    const getUserDetails = async ()=>{
        const res = await axios.get('/api/users/me');
        setData(res.data.data._id);
    }
    
    return (
        <>
            <div className="flex items-center min-h-screen flex-col justify-center py-2">
                <h1>profile</h1>
                <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>

                <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>

                <button onClick={getUserDetails} className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">GetUserDetalis</button>
            </div>
        </>
    )
}