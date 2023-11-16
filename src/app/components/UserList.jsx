import React, { useEffect } from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import Loading from '../Loading';


const UserList = ({ users } ) => {
  const [copiedData, setCopiedData] = React.useState('');

  // const copyData = async () => {
  //   const response = await axios.get('/api/users/allusers');
  //   const dataToCopy = response?.data?.data._id;
  //   // console.log(data._id)
  //   console.log(dataToCopy)
  //   navigator.clipboard.writeText(dataToCopy);
  //   setCopiedData(dataToCopy);
  // }

  // useEffect(() => {
  //   getUsers();
  // }, []);
  console.log(users.username)

  return (
    <div className="flex p-10 flex-col items-center justify-center">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 w-3/4">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {users.length != 0 ? (
              <table className="min-w-full text-left text-sm font-light table-fixed">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">NAME</th>
                    <th scope="col" className="px-6 py-4">USERNAME</th>
                    <th scope="col" className="px-6 py-4">IDENTIFIERS</th>
                    <th scope="col" className="px-6 py-4">STATUS</th>
                    <th scope="col" className="px-6 py-4">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr className="border-b dark:border-neutral-500                    transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{item.name}</td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{item.username}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                      <td className="whitespace-nowrap px-6 py-4 " ><h4 className='bg-gray-400 rounded-full p-2 text-center'>{item.isVerified ? "verified" : "Unverified"}</h4></td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {/* {item._id} */}
                        <button className="bg-blue-500 text-white p-2"
                        //  onClick={copyData}
                          >
                          Copy id
                        </button>
                      </td>
                    </tr>

                  ))}
                </tbody>
              </table>
            ) : (
              <div className='flex justify-center items-center border dark:border-neutral-500 p-5 text-lg rounded-lg'>No User Avaliable!</div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default UserList