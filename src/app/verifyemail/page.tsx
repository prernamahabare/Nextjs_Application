"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true);
        } catch (error: any) {
            setError(true);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="h-screen p-5">
            <div className="flex flex-col items-center justify-center gap-y-4 p-5">
                <h1 className="text-4xl">Verify Email</h1>
                <h2 className="p-2 bg-[#fd386e] text-black">{token ? `${token}` : "no token"}</h2>

                {verified && (
                    <div className="flex items-center flex-col gap-y-3">
                        <h2 className="text-2xl">Email Verified Successfully!</h2>
                        <Link href="/login" className="underline decoration-sky-500 text-sky-500">
                            Sign_in
                        </Link>
                    </div>
                )}
                {error && (
                    <div>
                        <h2 className="text-2xl p-3 bg-red-500 text-black">Oops.. Error Occured!</h2>
                    </div>
                )}
            </div>
        </div>
    )

}