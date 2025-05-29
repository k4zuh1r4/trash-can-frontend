'use client'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { NavbarDashboard } from '@/components/NavbarDashboard'
import { Phone, Wallet, UserCog } from 'lucide-react'
import { axiosInstance } from '@/lib/axios'
import toast from 'react-hot-toast'
import { formatDate } from '@/utils/formatDate'

export default function AdminRolesManagement() {
    const [accounts, setAccounts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdating, setIsUpdating] = useState(false)
    const [updatingId, setUpdatingId] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        loadAccounts()
    }, [])

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

    const updateUserRole = async (userId, newRole) => {
        setIsUpdating(true)
        setUpdatingId(userId)
        try {
            const res = await axiosInstance.put(`/admin/accounts/${userId}/role`, { role: newRole })
            if (res.status === 200) {
                // Update the user in the accounts array
                const updatedAccounts = accounts.map(account =>
                    account._id === userId ? { ...account, role: newRole } : account
                )
                setAccounts(updatedAccounts)
                toast.success(`User role updated to ${newRole} successfully`)
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update user role"
            toast.error(errorMessage)
            console.error("Error updating user role:", error)
        } finally {
            setIsUpdating(false)
            setUpdatingId(null)
        }
    }

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
                    <h1 className="text-3xl font-bold text-center text-primary mb-6">Manage User Roles</h1>

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
                                            <th>Current Role</th>
                                            <th className="rounded-tr-2xl">Change Role</th>
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
                                                        <UserCog size={16} className="mr-2 opacity-70" />
                                                        {getRoleBadge(account.role)}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            className="select select-bordered select-sm"
                                                            defaultValue=""
                                                            disabled={isUpdating && updatingId === account._id}
                                                            onChange={(e) => {
                                                                if (e.target.value) {
                                                                    updateUserRole(account._id, e.target.value)
                                                                    e.target.value = ""
                                                                }
                                                            }}
                                                        >
                                                            <option value="" disabled>Change role...</option>
                                                            <option value="user">User</option>
                                                            <option value="distributor">Distributor</option>
                                                            <option value="admin">Admin</option>
                                                        </select>
                                                        {isUpdating && updatingId === account._id && (
                                                            <span className="loading loading-spinner loading-sm"></span>
                                                        )}
                                                    </div>
                                                </td>
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