'use client'
import React, { useEffect } from 'react'
import Usernav from "../components/Usernav";
import UserList from "../components/UserList"; import axios from "axios";
import toast from 'react-hot-toast';
import Loading from '../Loading';


const Users = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [logedInUserInfo, setlogedInUserInfo] = React.useState('')

    const getUsers = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/users/allusers');
            setData(response?.data?.data);
        } catch (error) {
            toast(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        setlogedInUserInfo(res?.data?.data.username);
    }

    useEffect(() => {
        getUsers();
        getUserDetails();
    }, [])

    return (
        <>
            <div>
                <Usernav user={logedInUserInfo} />
                {/* {loading ? <Loading /> :
                    <UserList users={data} />} */}
            </div>
        </>
    )
}

export default Users