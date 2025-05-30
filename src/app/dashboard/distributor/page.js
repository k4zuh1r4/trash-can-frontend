'use client'
import { ProtectRoute } from '@/lib/ProtectRoute'
import Link from 'next/link'
import { useAuthStore } from '@/lib/authStore'
import { useTransactionStore } from '@/lib/transactionStore'
import { useEffect, useState } from 'react'
import { NavbarDashboard } from '@/components/NavbarDashboard'

export default function DistributorDashboard() {
    const { authUser } = useAuthStore()
    const { pendingTransactions, getPendingTransactions } = useTransactionStore()
    const [pendingCount, setPendingCount] = useState(0)

    useEffect(() => {
        const loadPending = async () => {
            const transactions = await getPendingTransactions()
            setPendingCount(transactions?.length || 0)
        }

        loadPending()
    }, [getPendingTransactions])
    return (
        <ProtectRoute allowedRoles={['distributor']}>
            <NavbarDashboard />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Distributor Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Pending Approvals</div>
                            <div className="stat-value">{pendingCount}</div>
                            <div className="stat-desc">Transactions waiting for review</div>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Quick Actions</h2>
                            <div className="flex flex-col gap-2 mt-4">
                                <Link href="/dashboard/distributor/pending" className="btn btn-primary">
                                    Review Pending Transactions
                                </Link>
                                <Link href="/dashboard/distributor/list" className="btn btn-outline">
                                    View All Transactions
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectRoute>
    )
}
