/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, {useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = React.useState(false);
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/users/login", user);
            console.log("Login Sucess", response.data);
            router.push("/profile")
        } catch (error: any) {
            toast.error(error.message);
            console.log("Login failed", error.message);
        }finally{
            setLoading(false);
        }

    };
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setbuttonDisabled(false);
        }else{
            setbuttonDisabled(true);
        }
    }, [user])
    

    return (
        <div className="flex items-center min-h-screen flex-col justify-center py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr/>
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

            <button onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Login" : "Login"}</button>
            <Link href="/signup">Visit SignUp page</Link>
        </div>

    )
}