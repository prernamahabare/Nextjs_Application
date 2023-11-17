/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function resetpasswordpage() {
    const [user, setUser] = React.useState({
        newpassword: "",
        confirmpassword: "",
        token: window.location.search.split("=")[1],
    });

    const onChangepassword = async () => {
        try {
            const response = await axios.post("api/users/resetpassword", user);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <div className="h-screen w-full flex items-center justify-center">
                <div className="flex flex-col gap-y-4 w-1/3">
                    <h1 className="text-center text-3xl">Change password</h1>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="email" className="text-base">New Password</label>
                        <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm hover:bg-gray-900" type="email" id="email"
                            value={user.newpassword}
                            onChange={(e) => setUser({ ...user, newpassword: e.target.value })}
                            placeholder="New password" />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="email" className="text-base">Confirm Password</label>
                        <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm hover:bg-gray-900" type="email" id="email"
                            value={user.confirmpassword}
                            onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
                            placeholder="Confirm password" />
                    </div>
                    <button onClick={onChangepassword}
                        className="btn-lg px-3 py-3 leading-6 my-5 text-lg rounded-md  bg-[#fd386e]">Change Password</button>
                    <h2 className="text-center">
                        <Link href="/login" className="underline">Sign in</Link>
                    </h2>
                </div>
            </div>

        </>
    )
}