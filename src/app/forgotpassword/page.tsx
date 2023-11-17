/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Loading";

export default function forgotpasswordPage() {
    const router = useRouter();
    const [buttonDisabled, setbuttonDisabled] = React.useState(true);
    const [user, setuser] = React.useState({
        email: ""
    });
    const [loading, setLoading] = React.useState(false);

    const onForgotPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", user);
            toast('Email Send Sucessfully')
            router.push("/login")
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error(error.response.data.error);
                }
                else {
                    toast.error('An error occurred. Please try again later.');
                }
            }
        }finally{
            setLoading(false);
        }

    };
    useEffect(() => {
        if (user.email.length > 0) {
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
            ) : ("")}
            <div className="h-screen w-full flex items-center justify-center">
                <div className="flex flex-col w-1/3 gap-y-4">
                    <h1 className="text-center text-3xl">Forgot Password</h1>
                    <label htmlFor="email" className="text-base">Email Id</label>
                    <input placeholder="Email Id" className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm hover:bg-gray-900"
                        type="email" id="email"
                        value={user.email} onChange={(e) => setuser({ ...user, email: e.target.value })} />
                    <button onClick={onForgotPassword}
                        className={`btn-lg px-3 py-3 leading-6 my-5 text-lg rounded-md  ${buttonDisabled ? 'bg-[#d75d7f] cursor-not-allowed' : 'bg-[#fd386e]'}`}>Send Email</button>
                         <h2 className="text-center flex justify-center gap-9">
                        <Link href="/login">Sign in</Link>
                            <span className="text-slate-400">|</span>
                            <Link href="/signup">Sign Up</Link>
                        </h2>
                </div>
               
            </div >
        </>
    )
}
