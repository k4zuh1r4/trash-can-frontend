import React from 'react'
import Link from 'next/link'
export const MenuNavbar = () => {
    return (
        <div className="navbar bg-white shadow-sm">
            <div className="flex-1">
                <div className="text-xl font-bold px-3.5">Green Cypher</div>
            </div>
            <div className="flex justify-center">
                <ul className="menu menu-horizontal px-1">
                    <Link href="/details" className="text-center p-3 text-primary-content"><li>Program</li></Link>
                    <Link href="/about" className="text-center p-3 text-primary-content"><li>About</li></Link>
                    <Link href="/contact" className="text-center p-3 text-primary-content"><li>Connect</li></Link>
                </ul>
            </div>
            <div className="flex-none">
                <Link href="/login"><button className="btn btn-primary mx-2">Login</button></Link>
            </div>
        </div>
    )
}
