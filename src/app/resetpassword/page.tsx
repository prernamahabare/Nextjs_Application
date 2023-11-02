/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, {useEffect} from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function resetpasswordpage() {
    const [user, setUser] = React.useState({
        newpassword: "",
        confirmpassword: "",
        token: window.location.search.split("=")[1],
    });
    // const [token, setToken] = React.useState("");

    const onChangepassword = async () => {
        try {
            const response = await axios.post("api/users/resetpassword", user);
        } catch (error: any) {
            toast.error(error.message);
        }

    };
    
    return(
        <>
         <h1>Change password</h1>
            <hr/>
            <label htmlFor="email">New Password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="email" id="email"
                value={user.newpassword}
                onChange={(e) => setUser({ ...user, newpassword: e.target.value })}
                placeholder="newpassword" />
                
                <label htmlFor="email">Confirm Password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="email" id="email"
                value={user.confirmpassword}
                onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
                placeholder="confirmpassword" />

            <button onClick={onChangepassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Change Password</button>
            <Link href="/signup">Visit SignUp page</Link>

        </>
    )
}