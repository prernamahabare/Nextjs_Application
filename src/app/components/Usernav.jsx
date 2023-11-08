import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import FeatherIcon from "feather-icons-react"
import axios from "axios";


const Usernav = () => {
    const [data, setData] = React.useState([])

    const logout = async () => {
        try {
            axios.get("api/users/logout");
            router.push('/login')
        } catch (error) {
            toast(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        // console.log(res?.data?.data)
        setData(res?.data?.data.username);
        sessionStorage.setItem("currentUser", JSON.stringify(res.data.data))
    }
    let user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    // user = JSON.parse(user)
    // console.log(user._id)

    useEffect(() => {
        getUserDetails();
    }, [])
    return (
        <>
            <div className='flex justify-between text-slate-100 py-4 px-7'>
                <div className="flex gap-x-3">
                    <Link href="#" className="flex gap-x-3 items-center">
                        <span><img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=rose&shade=500" alt="img" /></span>
                        <span className='font-extrabold text-lg'>Authentication</span>
                    </Link>
                </div>
                <div className='flex gap-x-12 font-semibold items-center'>
                    <div>Feedback</div>
                    <div>Support</div>
                    <div><FeatherIcon icon="search" /></div>
                    <div className='flex gap-2'>
                    <div className='gap-0'><Link href={`/profile/${data}`}><FeatherIcon icon="user" /></Link></div>
                    <div>{user.name}</div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Usernav


