/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function profilePage() {
    const router = useRouter();
    const [data, setData] = React.useState([])

    const logout = async () => {
        try {
            axios.get("api/users/logout");
            router.push('/login')
        } catch (error: any) {
            toast(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res?.data?.data)
        setData(res?.data?.data);
    }
    useEffect(() => {
      getUserDetails();
    }, [])
    

    return (
        <>
            <div className="flex items-center min-h-screen flex-col justify-center py-2">
                <h1>profile</h1>
                <p>Profile page</p>
                <h2 className="p-1 rounded bg-green-500">

                {data && data.map((item) => (
                  <h1>{item}</h1>
                ))}
                </h2>

                <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>

                <button onClick={getUserDetails} className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">GetUserDetalis</button>
            </div>
        </>
    )
}