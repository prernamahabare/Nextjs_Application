'use client'
import React, { useEffect } from 'react'
import Usernav from "../components/Usernav";
import UserList from "../components/UserList";
import Loading from '../Loading';

const Users = () => {
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    })

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <Usernav />
                    <UserList />
                </div>

            )}
        </>
    )
}

export default Users