/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react"
import toast from "react-hot-toast";

export default function forgotpasswordPage() {
    const router = useRouter();
    const [user, setuser] = React.useState({
        email: ""
    });
    console.log(user.email)

    // const onForgotPassword = async () => {
    //     try {
    //         const response = await axios.post("api/users/forgotpassword", email);
    //         console.log(response);
    //         router.push("/login");
    //     } catch (error: any) {
    //         toast.error(error.message);
    //         console.log(error);
    //     }
    // }

    const onForgotPassword = async () => {
        try {
            const response = await axios.post("/api/users/forgotpassword", user);
            router.push("/login")
        } catch (error: any) {
            toast.error(error.message);
            console.log(error)
        }

    };
    // useEffect(() => {
    //     if (email.length > 0 ) {

    //     }
    // }, [user]);
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="flex flex-col w-1/3 gap-y-2">
                <h1 className="text-center text-3xl">Forgot Password</h1>
                <label htmlFor="email" className="text-base">Email Id</label>
                <input placeholder="Email Id" className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm hover:bg-gray-900"
                    type="email" id="email"
                    value={user.email} onChange={(e) => setuser({ ...user, email: e.target.value })} />
                <button onClick={onForgotPassword}
                    className="btn-lg px-3 py-3 leading-6 my-5 text-lg rounded-md  bg-[#fd386e]">Send Email</button>
            </div>
        </div >
    )
}
