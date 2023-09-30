/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/users/signup", user);
            console.log(response);
            router.push("/login");
            
        } catch (error: any) {
            toast.error(error.message);
            console.log("Signup failed", error.message);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length >0 ){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);
    

    return (
        <div className="flex items-center min-h-screen flex-col justify-center py-2">
            <h1>{loading ? "Processing":"Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username" />

            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="email" id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email" />

            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="password" id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password" />

            <button onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Signup" : "Signup"}</button>
            <Link href="/login">Visit Login page</Link>
        </div>

    )
}