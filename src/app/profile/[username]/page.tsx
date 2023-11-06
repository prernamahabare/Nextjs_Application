/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect } from "react";
import Usernav from "@/app/components/Usernav";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function userprofile({ params }: any) {
    const router = useRouter();

    let currentuser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    // user = JSON.parse(user)

    const [user, setUser] = React.useState({
        username: currentuser.username,
        email: currentuser.email,
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);


    const logout = async () => {
        try {
            axios.get("api/users/logout");
            router.push('/login')
        } catch (error: any) {
            toast(error.message);
        }
    };
    
    const onUpdate = async () => {
        try {
            const response = await axios.put("/api/users/updateuser", user);
            // router.push("/login");

        } catch (error: any) {
            toast.error(error.message);
            console.log(error)
        }
    };

    useEffect(() => {
        if (user.username == currentuser.username && user.email == currentuser.email) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    return (
        <>
            <Usernav />
            <div className="flex flex-col">
                <div className="flex justify-between bg-[#18181b] py-8 px-10 font-semibold mb-10  border border-[#424248] ">
                    <h1 className="text-2xl">{currentuser.username}</h1>
                    <button className='btn-sm leading-6 text-sm rounded-md py-2 
                    px-5 rounded-md border border-[#424248]' onClick={logout}>Logout</button>
                </div>
                <div className="flex w-11/12 border border-[#424248] m-auto rounded-lg bg-[#18181b] justify-center p-10 flex-col gap-y-4 items-center">
                    <div className="flex gap-x-3 items-center w-1/2">
                        <label htmlFor="username" className="text-base">UserID</label>
                        <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] 
                        text-sm hover:bg-gray-900 "
                            value={currentuser._id}
                            type="text" id="username"
                        />
                    </div>
                    <div className="flex gap-x-3 items-center  w-1/2">
                        <label htmlFor="username" className="text-base">Username</label>
                        <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm hover:bg-gray-900 "
                            placeholder="Enter Username"
                            value={user.username}
                            type="text" id="username"
                            onChange={(e) => setUser({ ...user, username: e.target.value })} />
                    </div>
                    <div className="flex gap-x-3 items-center  w-1/2">
                        <label htmlFor="email" className="text-base">Email</label>
                        <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm hover:bg-gray-900 " placeholder="Enter Email"
                            value={user.email}
                            type="text" id="email"
                            onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </div>

                    <button 
                    // onClick={onUpdate}
                        className={`btn-lg px-3 py-3 leading-6 my-5 text-lg rounded-md  ${buttonDisabled ? 'bg-[#fd386e]' : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >Update</button>
                </div>
            </div>


        </>
    )
}