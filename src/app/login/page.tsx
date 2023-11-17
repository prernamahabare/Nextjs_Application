/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Loading";

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
            // toast('Sucessfully Login')
            router.push('/users')
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error(error.response.data.error);
                }
                else {
                    toast.error('An error occurred. Please try again later.');
                }
            }
        } finally {
            setLoading(false);
        }

    };
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setbuttonDisabled(false);
        } else {
            setbuttonDisabled(true);
        }
    }, [user])


    return (
        <>
            <div><Toaster /></div>
            {loading ? (
                <Loading />
            ) : (
                <div className="h-screen w-full flex items-center justify-center">
                    <div className="flex flex-col gap-y-4 w-1/3">
                        <h1 className="text-center text-3xl">{loading ? "Processing" : "Login"}</h1>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="email" className="text-base">Email Id</label>
                            <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm
                    hover:bg-gray-900 input-field" type="email" id="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder="Email Id" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="password" className="text-base">Password</label>
                            <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm
                    hover:bg-gray-900 input-field" type="password" id="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder="Password" />
                        </div>
                        <button onClick={onLogin}
                            className={`btn-lg px-3 py-3 leading-6 my-5 text-lg rounded-md  ${buttonDisabled ? 'bg-[#d75d7f] cursor-not-allowed' : 'bg-[#fd386e]'
                                }`}>Login</button>

                        <h2 className="text-center flex justify-center gap-9">
                        <Link href="/forgotpassword">Forgot Password ?</Link>
                            <span className="text-slate-400">|</span>
                            <Link href="/signup">Sign Up</Link>
                        </h2>
                    </div>
                </div>
            )}
        </>

    )
}