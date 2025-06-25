import React from 'react'

export default function Navbar() {
    return (
        <nav className="py-4 shadow">
            <div className="container mx-auto px-4 flex justify-between items-baseline">
                <h2 className="text-xl font-bold">Quiz App</h2>
                <ul className="flex space-x-4">
                    <li><a href="/">Home</a></li>
                </ul>
            </div>
        </nav>

    )
}
