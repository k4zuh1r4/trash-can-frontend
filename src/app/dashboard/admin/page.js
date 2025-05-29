'use client'
import { ProtectRoute } from '@/lib/ProtectRoute'
import Link from 'next/link'
import { NavbarDashboard } from '@/components/NavbarDashboard'

export default function AdminDashboard() {
    return (
        <ProtectRoute allowedRoles={['admin']}>
            <NavbarDashboard />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">User Management</h2>
                            <div className="flex flex-col gap-2 mt-4">
                                <Link href="/dashboard/admin/accounts" className="btn btn-primary">
                                    Manage Accounts
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Transaction Management</h2>
                            <div className="flex flex-col gap-2 mt-4">
                                <Link href="/dashboard/admin/transactions" className="btn btn-primary">
                                    Manage Transactions
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectRoute>
    )
}