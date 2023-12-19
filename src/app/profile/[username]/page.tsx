/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect } from "react";
import Usernav from "@/app/components/Usernav";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/app/Loading";

export default function userprofile({ params }: any) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const [user, setUser] = React.useState({
        "name": "",
        "username": "",
        "email": "",
    }
    );
    const [buttonDisabled, setButtonDisabled] = React.useState(true);

    const logout = async () => {
        try {
            setLoading(true)
            await axios.get("/api/users/logout");
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message);
            console.log(error)
        } finally {
            setLoading(false)
        }
    };
      
    const onUpdate = async () => {
        try {
            setLoading(true)
            const response = await axios.put(`/api/users/updateuser/${user.username}`, user);
            toast("User Update Sucessfully")
        } catch (error: any) {
            toast.error(error.message);
            console.log(error)
        } finally {
            setLoading(false)
            setButtonDisabled(true)
        }

    };

    const getUserDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/users/me');
            setUser({ ...user, name: res.data.data.name, username: res.data.data.username, email: res.data.data.email });
        } catch (error: any) {
            toast.error(error.message);
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);
    return (
        <>
            {/* <Usernav user={user.username} /> */}
            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* <div><Toaster /></div> */}
                    <div className="flex flex-col">
                        <div className="flex justify-between bg-[#18181b] py-8 px-10 font-semibold mb-10  border border-[#424248] ">
                            <h1 className="text-2xl">{user?.username}</h1>
                            <button className='btn-sm leading-6 text-sm rounded-md py-2 
                    px-5 rounded-md border border-[#424248]' onClick={logout}>Logout</button>
                        </div>
                        <div className="flex w-11/12 border border-[#424248] m-auto rounded-lg bg-[#18181b] justify-center p-10 flex-col gap-y-4 items-center">
                            <div className="flex gap-x-3 items-center  w-1/2">
                                <label htmlFor="name" className="text-base">Name</label>
                                <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm hover:bg-gray-900 "
                                    placeholder="Enter Name"
                                    value={user.name}
                                    type="text" id="name"
                                    onChange={(e) => {
                                        setUser({ ...user, name: e.target.value });
                                        setButtonDisabled(false);
                                    }} />
                            </div>
                            <div className="flex gap-x-3 items-center  w-1/2">
                                <label htmlFor="email" className="text-base">Email</label>
                                <input className="w-full p-3 border border-[#424248] outline-none rounded-md bg-[#18181b] placeholder:text-[#65656a] text-sm hover:bg-gray-900 " placeholder="Enter Email"
                                    value={user.email}
                                    type="text" id="email"
                                    // setButtonDisabled(true);
                                    onChange={(e) => {
                                        setUser({ ...user, email: e.target.value });
                                        setButtonDisabled(false);
                                    }} />
                            </div>
                            <button onClick={onUpdate}
                                className={`btn-lg px-3 py-3 leading-6 my-5 text-lg rounded-md  ${buttonDisabled ? 'bg-[#d75d7f] cursor-not-allowed' : 'bg-[#fd386e]'
                                    }`}>Update</button>
                        </div>
                    </div>
                </>
            )}


        </>
    )
}