'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/authStore'

export const NavbarDashboard = () => {
    const router = useRouter()
    const { authUser, logout } = useAuthStore()
    const [userRole, setUserRole] = useState(null)

    //get role on mount
    useEffect(() => {
        if (authUser) {
            setUserRole(authUser.role)
        }
    }, [authUser])

    const handleLogout = async () => {
        try {
            const success = await logout()
            if (success) {
                router.push('/login')
            }
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }

    // Render correct navigation links based on role
    const getNavLinks = () => {
        switch (userRole) {
            case 'admin':
                return (
                    <>
                        <li><Link href="/dashboard/admin/accounts" className="text-center p-3 text-primary-content">Users</Link></li>
                        <li><Link href="/dashboard/admin/transactions" className="text-center p-3 text-primary-content">Transactions</Link></li>
                        <li><Link href="/dashboard/admin/roles" className="text-center p-3 text-primary-content">Update Roles</Link></li>
                    </>
                )
            case 'distributor':
                return (
                    <>
                        <li><Link href="/dashboard/distributor/pending" className="text-center p-3 text-primary-content">Pending</Link></li>
                        <li><Link href="/dashboard/distributor/profile" className="text-center p-3 text-primary-content">Profile</Link></li>
                    </>
                )
            case 'user':
            default:
                return (
                    <>
                        <li><Link href="/dashboard/user/contribute" className="text-center p-3 text-primary-content">Contribute</Link></li>
                        <li><Link href="/dashboard/user/list" className="text-center p-3 text-primary-content">Transactions</Link></li>
                        <li><Link href="/dashboard/user/profile" className="text-center p-3 text-primary-content">Profile</Link></li>
                    </>
                )
        }
    }

    return (
        <div className="navbar bg-white shadow-sm">
            <div className="navbar-start dropdown">
                <div className="text-xl px-3.5 font-bold">Green Cypher</div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-3">
                    {getNavLinks()}
                </ul>
            </div>
            <div className="navbar-end">
                <button
                    onClick={handleLogout}
                    className="btn px-3.5"
                >
                    Sign out
                </button>
            </div>
        </div>
    )
}