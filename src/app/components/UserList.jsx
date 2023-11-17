import React, { useEffect } from 'react'
import FeatherIcon from "feather-icons-react"

const UserList = ({ users }) => {
  const copyData = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => {
        console.log('Value copied to clipboard:', value);
      })
      .catch((error) => {
        console.error('Failed to copy value to clipboard:', error);
      });
  };

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
                      <td className="whitespace-nowrap px-6 py-4 " ><h4 className='bg-gray-400 rounded-full p-2 text-center'>
                        {item.isVerified ? "verified" : "Unverified"}</h4></td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className='flex items-center '>
                          <button className=" group bg-[#252525] rounded-md gap-x-2 text-white p-2 flex items-center relative"
                            onClick={() => copyData(item._id)}
                          >
                            <div><FeatherIcon icon="copy" /></div>
                            <div>Copy id</div>
                            <span className="opacity-0 group-hover:opacity-100 absolute bottom-full right-0 transform translate-x-1/5 bg-[#252525] text-white px-2 py-1 rounded-md m-1">
                              Cilck to Copy
                            </span>
                          </button>
                        </div>
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