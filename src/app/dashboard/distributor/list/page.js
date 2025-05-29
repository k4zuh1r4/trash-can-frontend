'use client'
import React, { useEffect, useState } from 'react'
import { useTransactionStore } from '@/lib/transactionStore'
import { Toaster } from 'react-hot-toast'
import { formatDate } from '@/utils/formatDate'
import { NavbarDashboard } from '@/components/NavbarDashboard'
import { Image } from 'lucide-react'

export default function DistributorTransactionList() {
    const {
        pendingTransactions,
        getPendingTransactions,
        isLoadingPendingTransactions,
        approveTransaction,
        rejectTransaction
    } = useTransactionStore()
    const [isLoaded, setIsLoaded] = useState(false)
    const [processingId, setProcessingId] = useState(null)

    useEffect(() => {
        const loadPendingTransactions = async () => {
            await getPendingTransactions()
            setIsLoaded(true)
        }
        loadPendingTransactions()
    }, [getPendingTransactions])

    // Handle approve transaction
    const handleApprove = async (id) => {
        setProcessingId(id)
        await approveTransaction(id)
        setProcessingId(null)
    }

    // Handle reject transaction
    const handleReject = async (id) => {
        setProcessingId(id)
        await rejectTransaction(id)
        setProcessingId(null)
    }

    // Transaction status badge
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="badge badge-warning badge-sm">Pending</span>
            case 'approved':
                return <span className="badge badge-success badge-sm">Approved</span>
            case 'rejected':
                return <span className="badge badge-error badge-sm">Rejected</span>
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
                    <h1 className="text-3xl font-bold text-center text-primary mb-6">Pending Transactions</h1>

                    {isLoadingPendingTransactions ? (
                        <div className="flex justify-center my-12">
                            <div className="loading loading-spinner loading-lg text-primary"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-2xl shadow-lg border border-base-content/5 bg-base-200">
                            {pendingTransactions && pendingTransactions.length > 0 ? (
                                <table className="table w-full">
                                    <thead>
                                        <tr className="bg-base-300">
                                            <th className="rounded-tl-2xl">Date</th>
                                            <th>Contributor</th>
                                            <th>Trash Details</th>
                                            <th>Image</th>
                                            <th>Amount</th>
                                            <th className="rounded-tr-2xl">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingTransactions.map((transaction, index) => (
                                            <tr key={transaction._id || index} className="hover:bg-base-300">
                                                <td>{formatDate(transaction.createdAt)}</td>
                                                <td>
                                                    <div className="font-medium">{transaction.contributorName}</div>
                                                    <div className="text-sm opacity-70">{transaction.contributorContactNumber}</div>
                                                </td>
                                                <td>
                                                    <div className="font-medium">{transaction.trashName}</div>
                                                    <div className="text-sm opacity-70">{transaction.trashType}</div>
                                                </td>
                                                <td>
                                                    {transaction.trashImage ? (
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <a
                                                                    href={transaction.trashImage}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center justify-center"
                                                                >
                                                                    <Image size={24} />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm opacity-70">No image</span>
                                                    )}
                                                </td>
                                                <td className="font-semibold">
                                                    {typeof transaction.addedBalance === 'number'
                                                        ? transaction.addedBalance.toFixed(2)
                                                        : transaction.addedBalance} &#36;
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleApprove(transaction._id)}
                                                            disabled={processingId === transaction._id}
                                                            className="btn btn-sm btn-success"
                                                        >
                                                            {processingId === transaction._id ? (
                                                                <span className="loading loading-spinner loading-xs"></span>
                                                            ) : (
                                                                'Approve'
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(transaction._id)}
                                                            disabled={processingId === transaction._id}
                                                            className="btn btn-sm btn-error"
                                                        >
                                                            {processingId === transaction._id ? (
                                                                <span className="loading loading-spinner loading-xs"></span>
                                                            ) : (
                                                                'Reject'
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : isLoaded ? (
                                <div className="p-8 text-center">
                                    <p className="text-lg text-primary">No pending transactions found.</p>
                                    <p className="text-sm text-accent-content mt-2">
                                        There are no transactions waiting for your approval.
                                    </p>
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <p className="text-lg text-accent-content">Loading transactions...</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}