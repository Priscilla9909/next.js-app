"use client"

import React, {useState} from 'react'

    function Counter(){
        const [count, setCount] = useState(0)

        return (
            <div className='flex flex-col items-center justify-center min-In-screen bg-gray-1000'>
              <p className='text-2xl font-semibold mb-4'>You clicked <span className='text-blue-600'>{count}</span> times</p>
                <button onClick={() => setCount(count + 1)} className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300' >Increase</button>
                <button onClick={() => setCount(count - 1)} className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600focus:outline-none focus:ring-2 focus:ring-blue-30 mt-2' >Decrease</button>
            </div>
          )
    }



export default Counter

