'use client'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { NavbarDashboard } from '@/components/NavbarDashboard'
import { Phone, Wallet } from 'lucide-react'
import { axiosInstance } from '@/lib/axios'
import toast from 'react-hot-toast'
import { formatDate } from '@/utils/formatDate'
export default function AdminAccountsList() {
    const [accounts, setAccounts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const loadAccounts = async () => {
            setIsLoading(true)
            try {
                const res = await axiosInstance.get("/admin/accounts")
                if (res.status === 200) {
                    setAccounts(res.data.accounts)
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Failed to load accounts"
                toast.error(errorMessage)
                console.error("Error loading accounts:", error)
            } finally {
                setIsLoading(false)
                setIsLoaded(true)
            }
        }
        loadAccounts()
    }, [])

    // Role badge helper
    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin':
                return <span className="badge badge-secondary badge-sm">Admin</span>
            case 'distributor':
                return <span className="badge badge-primary badge-sm">Distributor</span>
            case 'user':
                return <span className="badge badge-info badge-sm">User</span>
            default:
                return <span className="badge badge-ghost badge-sm">Unknown</span>
        }
    }
    return (
        <>
            <NavbarDashboard />
            <div className="flex justify-center items-center min-h-screen p-6 bg-base-100">
                <Toaster position="top-center" />
                <div className="w-full max-w-6xl">
                    <h1 className="text-3xl font-bold text-center text-primary mb-6">User Accounts</h1>

                    {isLoading ? (
                        <div className="flex justify-center my-12">
                            <div className="loading loading-spinner loading-lg text-primary"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-2xl shadow-lg border border-base-content/5 bg-base-200">
                            {accounts.length > 0 ? (
                                <table className="table w-full">
                                    <thead>
                                        <tr className="bg-base-300">
                                            <th className="rounded-tl-2xl">User</th>
                                            <th>Contact</th>
                                            <th>Wallet</th>
                                            <th>Balance</th>
                                            <th>Role</th>
                                            <th className="rounded-tr-2xl">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accounts.map((account) => (
                                            <tr key={account._id} className="hover:bg-base-300">
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar placeholder">
                                                            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                                                <span className="text-xl">{account.fullName.charAt(0)}</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{account.fullName}</div>
                                                            <div className="text-sm opacity-70">{account.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <Phone size={16} className="mr-2 opacity-70" />
                                                        {account.contactNumber}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <Wallet size={16} className="mr-2 opacity-70" />
                                                        <span className="text-xs font-mono">
                                                            {account.walletAddress ?
                                                                `${account.walletAddress.substring(0, 6)}...${account.walletAddress.substring(account.walletAddress.length - 4)}` :
                                                                'Not set'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="font-semibold">
                                                    {typeof account.balance === 'number' ?
                                                        account.balance.toFixed(2) :
                                                        account.balance || '0.00'} &#36;
                                                </td>
                                                <td>{getRoleBadge(account.role)}</td>
                                                <td>{formatDate(account.createdAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : isLoaded ? (
                                <div className="p-8 text-center">
                                    <p className="text-lg text-primary">No accounts found.</p>
                                    <p className="text-sm text-accent-content mt-2">
                                        There are no registered accounts in the system.
                                    </p>
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <p className="text-lg text-accent-content">Loading accounts...</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}