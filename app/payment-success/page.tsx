
import { log } from 'console';
import React from 'react'

function Page({searchParams}: {searchParams: {amount: number}}) {
  log(searchParams);
  const amount = searchParams.amount;
  return (
    <main className=" max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="mb-10">
            <h1 className="text-4xl font-bold">Payment Success</h1>
            <p className="text-lg">Your payment was successful</p>
        </div>
        <div className='bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold'>
            ${amount}
        </div>  
    </main>
  )
}

export default Page
