'use client'
import React, { useState, useEffect } from 'react'
import { Trash, Bookmark, Blocks, LinkIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransactionStore } from '@/lib/transactionStore'
import { useAuthStore } from '@/lib/authStore'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import { NavbarDashboard } from '@/components/NavbarDashboard'

export default function Contribute() {
    const router = useRouter()
    const { createTransaction, isCreatingTransaction } = useTransactionStore()
    const { authUser, checkAuth } = useAuthStore()

    const [formData, setFormData] = useState({
        trashName: '',
        trashType: '',
        trashImage: '', // Changed from trashURL to match backend
        addedBalance: '',
        contractID: 'default-contract'
    })

    // Check auth on page load
    useEffect(() => {
        const verifyAuth = async () => {
            if (!authUser) {
                const isLoggedIn = await checkAuth()
                if (!isLoggedIn) {
                    toast.error("Please log in to continue")
                    router.push('/login')
                }
            }
        }

        verifyAuth()
    }, [authUser, checkAuth, router])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate form
        if (!formData.trashName || !formData.trashType || !formData.trashImage || !formData.addedBalance) {
            toast.error("Please fill in all fields")
            return
        }

        // Convert addedBalance to number
        const transactionData = {
            ...formData,
            addedBalance: parseFloat(formData.addedBalance) || 0
        }

        try {
            const result = await createTransaction(transactionData)
            if (result) {
                toast.success("Contribution submitted successfully!")

                // Clear form
                setFormData({
                    trashName: '',
                    trashType: '',
                    trashImage: '',
                    addedBalance: '',
                    contractID: 'default-contract'
                })

                // Redirect to transaction list
                router.push('/dashboard/user/list')
            }
        } catch (error) {
            console.error('Error submitting contribution:', error)

            // Handle specific error cases
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error("Your session has expired. Please log in again.")
                    router.push('/login')
                } else {
                    toast.error(error.response.data?.message || "Failed to submit contribution")
                }
            } else {
                toast.error("Network error. Please try again.")
            }
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarDashboard />
            <Toaster position="top-center" />

            <div className="flex flex-grow flex-col md:flex-row">
                <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 py-8">
                    <div className="card w-full max-w-md justify-center items-center mb-5 bg-white shadow-xl">
                        <h1 className="text-4xl font-bold text-center text-primary py-5 my-5" style={{ fontFamily: 'Instrument Sans' }}>Contribute</h1>
                        <form className='flex flex-col items-center w-full px-6' onSubmit={handleSubmit}>
                            <label className="input input-bordered w-full mb-4">
                                <Trash className="h-[1em] opacity-50" />
                                <input
                                    className='px-3 py-2 my-2 text-primary-content w-full'
                                    type="text"
                                    name="trashName"
                                    value={formData.trashName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Trash name"
                                />
                            </label>
                            <label className="input input-bordered w-full mb-4">
                                <Bookmark className="h-[1em] opacity-50" />
                                <input
                                    className='px-3 py-2 my-2 text-primary-content w-full'
                                    type="text"
                                    name="trashType"
                                    value={formData.trashType}
                                    onChange={handleChange}
                                    required
                                    placeholder="Trash category"
                                />
                            </label>
                            <label className="input input-bordered w-full mb-4">
                                <LinkIcon className="h-[1em] opacity-50" />
                                <input
                                    className='px-3 py-2 my-2 text-primary-content w-full'
                                    type="text"
                                    name="trashImage" // Changed from trashURL to trashImage
                                    value={formData.trashImage}
                                    onChange={handleChange}
                                    required
                                    placeholder="Firebase URL to be uploaded"
                                />
                            </label>
                            <label className="input input-bordered w-full mb-4">
                                <Blocks className="h-[1em] opacity-50" />
                                <input
                                    className='px-3 py-2 my-2 text-primary-content w-full'
                                    type="number"
                                    name="addedBalance"
                                    value={formData.addedBalance}
                                    onChange={handleChange}
                                    required
                                    step="0.01"
                                    min="0"
                                    placeholder="Calculated balance"
                                />
                            </label>
                            <div className="flex justify-center items-center w-full">
                                <button
                                    className="btn btn-primary text-primary-content my-8 py-5 w-full"
                                    type="submit"
                                    disabled={isCreatingTransaction}
                                >
                                    {isCreatingTransaction ? 'Submitting...' : 'Submit Contribution'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="hidden md:block md:w-1/2 bg-cover bg-center bg-[url('/gallery1.png')] opacity-50">
                </div>
            </div>
        </div>
    )
}