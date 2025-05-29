'use client'
import React, { useEffect, useState } from 'react'
import { useTransactionStore } from '@/lib/transactionStore'
import { Toaster } from 'react-hot-toast'
import { NavbarDashboard } from '@/components/NavbarDashboard'
import { Check, X, Image } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
export default function AdminTransactions() {
    const {
        allTransactions,
        getAllTransactions,
        approveTransaction,
        rejectTransaction,
        isLoadingAllTransactions,
        isApprovingTransaction,
        isRejectingTransaction
    } = useTransactionStore()

    const [isLoaded, setIsLoaded] = useState(false)
    const [processingId, setProcessingId] = useState(null)
    const [filterStatus, setFilterStatus] = useState('all')

    useEffect(() => {
        const loadTransactions = async () => {
            await getAllTransactions()
            setIsLoaded(true)
        }
        loadTransactions()
    }, [getAllTransactions])

    //approve
    const handleApprove = async (id) => {
        setProcessingId(id)
        await approveTransaction(id)
        setProcessingId(null)
    }

    //reject
    const handleReject = async (id) => {
        setProcessingId(id)
        await rejectTransaction(id)
        setProcessingId(null)
    }

    // Transaction status
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

    //Filter
    const filteredTransactions = filterStatus === 'all'
        ? allTransactions
        : allTransactions.filter(t => t.status === filterStatus)

    return (
        <>
            <NavbarDashboard />
            <div className="flex justify-center items-start min-h-screen p-6 bg-base-100">
                <Toaster position="top-center" />
                <div className="w-full max-w-7xl">
                    <h1 className="text-3xl font-bold text-center text-primary mb-6">All Transactions</h1>
                    <div className="flex justify-center mb-6">
                        <div className="btn-group">
                            <button
                                className={`btn btn-sm ${filterStatus === 'all' ? 'btn-active' : ''}`}
                                onClick={() => setFilterStatus('all')}
                            >
                                All
                            </button>
                            <button
                                className={`btn btn-sm ${filterStatus === 'pending' ? 'btn-active btn-warning' : ''}`}
                                onClick={() => setFilterStatus('pending')}
                            >
                                Pending
                            </button>
                            <button
                                className={`btn btn-sm ${filterStatus === 'approved' ? 'btn-active btn-success' : ''}`}
                                onClick={() => setFilterStatus('approved')}
                            >
                                Approved
                            </button>
                            <button
                                className={`btn btn-sm ${filterStatus === 'rejected' ? 'btn-active btn-error' : ''}`}
                                onClick={() => setFilterStatus('rejected')}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>
                    {isLoadingAllTransactions ? (
                        <div className="flex justify-center my-12">
                            <div className="loading loading-spinner loading-lg text-primary"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-2xl shadow-lg border border-base-content/5 bg-base-200">
                            {filteredTransactions && filteredTransactions.length > 0 ? (
                                <table className="table w-full">
                                    <thead>
                                        <tr className="bg-base-300">
                                            <th className="rounded-tl-2xl">Date</th>
                                            <th>Contributor</th>
                                            <th>Trash Details</th>
                                            <th>Image</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th className="rounded-tr-2xl">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTransactions.map((transaction) => (
                                            <tr key={transaction._id} className="hover:bg-base-300">
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
                                                    {getStatusBadge(transaction.status)}
                                                    {transaction.status !== 'pending' && transaction.reviewedBy && (
                                                        <div className="text-xs mt-1 opacity-70">
                                                            By: {transaction.reviewedBy}
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    {transaction.status === 'pending' ? (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleApprove(transaction._id)}
                                                                disabled={isApprovingTransaction && processingId === transaction._id}
                                                                className="btn btn-xs btn-success"
                                                            >
                                                                {isApprovingTransaction && processingId === transaction._id ? (
                                                                    <span className="loading loading-spinner loading-xs"></span>
                                                                ) : (
                                                                    <Check size={14} />
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(transaction._id)}
                                                                disabled={isRejectingTransaction && processingId === transaction._id}
                                                                className="btn btn-xs btn-error"
                                                            >
                                                                {isRejectingTransaction && processingId === transaction._id ? (
                                                                    <span className="loading loading-spinner loading-xs"></span>
                                                                ) : (
                                                                    <X size={14} />
                                                                )}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs">
                                                            {transaction.reviewedAt ? formatDate(transaction.reviewedAt) : 'N/A'}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : isLoaded ? (
                                <div className="p-8 text-center">
                                    <p className="text-lg text-primary">No transactions found.</p>
                                    <p className="text-sm text-accent-content mt-2">
                                        {filterStatus !== 'all'
                                            ? `No ${filterStatus} transactions available.`
                                            : 'No transactions have been submitted yet.'}
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