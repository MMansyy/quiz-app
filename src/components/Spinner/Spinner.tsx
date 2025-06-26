import React from 'react'
import './Spinner.css'

export default function Spinner() {
    return (
        <div className='fixed top-0 left-0 w-full h-full z-50'>
            <div className='flex  justify-center items-center h-screen bg-white bg-opacity-50 absolute top-0 left-0 right-0 bottom-0 z-50'>
                <span className="loader">Loading</span>
            </div>
        </div>
    )
}
