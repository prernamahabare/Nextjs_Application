/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Loading";

export default function resetpasswordpage() {
    const [user, setUser] = React.useState({
        newpassword: "",
        confirmpassword: "",
        token: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);



    const onChangepassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/users/resetpassword", user);
            setUser({ ...user, newpassword: "", confirmpassword: "" })
            toast("Password Updated Successfully")
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
        const urlToken = window.location.search.split("=")[1];
        setUser({ ...user, token: urlToken || "" });
    }, []);

    useEffect(() => {
        if (user.confirmpassword.length > 0 && user.newpassword.length > 0) {
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
                    ) : ( " ")}

            <div className="h-screen w-full flex items-center justify-center">
                <div className="flex flex-col gap-y-4 w-1/3">
                    <h1 className="text-center text-3xl">Change password</h1>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="password" className="text-base">New Password</label>
                        <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm hover:bg-gray-900" type="password" id="password"
                            value={user.newpassword}
                            onChange={(e) => setUser({ ...user, newpassword: e.target.value })}
                            placeholder="New password" />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="confirmpassword" className="text-base">Confirm Password</label>
                        <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm hover:bg-gray-900" type="password" id="confirmpassword"
                            value={user.confirmpassword}
                            onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
                            placeholder="Confirm password" />
                    </div>
                   
                    <button onClick={onChangepassword}
                            className={`btn-lg px-3 py-3 leading-6 my-5 text-lg rounded-md  ${buttonDisabled ? 'bg-[#d75d7f] cursor-not-allowed' : 'bg-[#fd386e]'
                                }`}>Change Password</button>
             
                    <h2 className="text-center">
                        <Link href="/login" className="underline">Sign in</Link>
                    </h2>

                </div>
            </div>


        </>
    )
}