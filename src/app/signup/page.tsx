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
            router.push("/login");

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="flex flex-col gap-y-2 w-1/3">
                <h1 className="text-center text-3xl">{loading ? "Processing" : "Signup"}</h1>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="username" className="text-base">Username</label>
                    <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm hover:bg-gray-900 "
                        type="text" id="username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="Username" />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="email" className="text-base">Email Id</label>
                    <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm hover:bg-gray-900"
                        type="email" id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email Id" />

                </div>
                <div className="flex flex-col gap-y-2 ">
                    <label htmlFor="password" className="text-base">Password</label>
                    <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm
                    hover:bg-gray-900"
                        type="password" id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Password" />
                </div>

                <button onClick={onSignup}
                    className="btn-lg px-3 py-3 leading-6 my-5 text-lg rounded-md  bg-[#fd386e]"
                >{buttonDisabled ? "No Signup" : "Signup"}</button>
                <h2 className="text-center">
                    <span>Already Have an account? </span> 
                    <Link href="/login" className="underline">Sign in</Link>
                </h2>
            </div>


        </div>
        // <div className="w-full max-w-xs mx-auto">
        //     <h1>{loading ? "Processing" : "Signup"}</h1>
        //     <hr />
        //     <label htmlFor="username" className="block text-sm font-medium leading-6">Username</label>
        //     <div className="mt-2">
        //         <input className="block w-full text-gray-900 py-1.5 placeholder:text-gray-400 px-1.5 rounded-md"
        //             type="text" id="username"
        //             value={user.username}
        //             onChange={(e) => setUser({ ...user, username: e.target.value })}
        //             placeholder="Username" />
        //     </div>

        // <label htmlFor="email" className="block text-sm font-medium leading-6 ">email</label>
        // <div className="mt-2">
        //     <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //         type="email" id="email"
        //         value={user.email}
        //         onChange={(e) => setUser({ ...user, email: e.target.value })}
        //         placeholder="email" />
        // </div>

        // <label htmlFor="password" className="block text-sm font-medium leading-6 ">password</label>
        // <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //     type="password" id="password"
        //     value={user.password}
        //     onChange={(e) => setUser({ ...user, password: e.target.value })}
        //     placeholder="password" />

        // <button onClick={onSignup}
        //     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        // >{buttonDisabled ? "No Signup" : "Signup"}</button>
        // <Link href="/login">Visit Login page</Link>
        // </div>

    )
}