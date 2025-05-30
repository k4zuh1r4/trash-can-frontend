import { create } from "zustand"
import { axiosInstance } from "./axios.js"
import toast from "react-hot-toast"

export const useTransactionStore = create((set, get) => ({
    transactions: [],
    allTransactions: [],
    pendingTransactions: [],
    currentTransaction: null,

    isLoadingTransactions: false,
    isCreatingTransaction: false,
    isApprovingTransaction: false,
    isRejectingTransaction: false,
    isLoadingAllTransactions: false,
    isLoadingPendingTransactions: false,

    // user transactions
    getUserTransactions: async () => {
        set({ isLoadingTransactions: true })
        try {
            const res = await axiosInstance.get("/transactions/list")
            if (res.status === 200) {
                set({ transactions: res.data.accountTransactions })
                return res.data.accountTransactions
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to load transactions"
            toast.error(errorMessage)
            console.error("Error loading transactions:", error)
            return null
        } finally {
            set({ isLoadingTransactions: false })
        }
    },

    //(admin only)
    getAllTransactions: async () => {
        set({ isLoadingAllTransactions: true })
        try {
            const res = await axiosInstance.get("/transactions/all")
            if (res.status === 200) {
                set({ allTransactions: res.data.transactions })
                return res.data.transactions
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to load all transactions"
            toast.error(errorMessage)
            console.error("Error loading all transactions:", error)
            return null
        } finally {
            set({ isLoadingAllTransactions: false })
        }
    },
    createTransaction: async (transactionData) => {
        set({ isCreatingTransaction: true })
        try {
            const res = await axiosInstance.post("/transactions/create", transactionData)
            if (res.status === 201) {
                const updatedTransactions = [res.data.transaction, ...get().transactions]
                set({ transactions: updatedTransactions, currentTransaction: res.data.transaction })
                toast.success(res.data.message || "Transaction created and pending approval")
                return res.data.transaction
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to create transaction"
            toast.error(errorMessage)
            console.error("Error creating transaction:", error)
            return null
        } finally {
            set({ isCreatingTransaction: false })
        }
    },

    //distributor/admin only)
    getPendingTransactions: async () => {
        set({ isLoadingPendingTransactions: true })
        try {
            const res = await axiosInstance.get("/transactions/pending")
            if (res.status === 200) {
                set({ pendingTransactions: res.data.pendingTransactions })
                return res.data.pendingTransactions
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to load pending transactions"
            toast.error(errorMessage)
            console.error("Error loading pending transactions:", error)
            return null
        } finally {
            set({ isLoadingPendingTransactions: false })
        }
    },

    //(distributor/admin only)
    approveTransaction: async (transactionId) => {
        set({ isApprovingTransaction: true })
        try {
            const res = await axiosInstance.put(`/transactions/approve/${transactionId}`)
            if (res.status === 200) {
                //update transactions
                const updatedPendingTransactions = get().pendingTransactions.filter(
                    transaction => transaction._id !== transactionId
                )

                //update all transactions if loaded
                let updatedAllTransactions = [...get().allTransactions]
                const transactionIndex = updatedAllTransactions.findIndex(t => t._id === transactionId)
                if (transactionIndex !== -1) {
                    updatedAllTransactions[transactionIndex] = res.data.transaction
                }

                set({
                    pendingTransactions: updatedPendingTransactions,
                    allTransactions: updatedAllTransactions
                })

                toast.success(res.data.message || "Transaction approved successfully")
                return res.data.transaction
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to approve transaction"
            toast.error(errorMessage)
            console.error("Error approving transaction:", error)
            return null
        } finally {
            set({ isApprovingTransaction: false })
        }
    },

    //distributor/admin only
    rejectTransaction: async (transactionId) => {
        set({ isRejectingTransaction: true })
        try {
            const res = await axiosInstance.put(`/transactions/reject/${transactionId}`)
            if (res.status === 200) {
                const updatedPendingTransactions = get().pendingTransactions.filter(
                    transaction => transaction._id !== transactionId
                )
                let updatedAllTransactions = [...get().allTransactions]
                const transactionIndex = updatedAllTransactions.findIndex(t => t._id === transactionId)
                if (transactionIndex !== -1) {
                    updatedAllTransactions[transactionIndex] = res.data.transaction
                }

                set({
                    pendingTransactions: updatedPendingTransactions,
                    allTransactions: updatedAllTransactions
                })

                toast.success(res.data.message || "Transaction rejected successfully")
                return res.data.transaction
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to reject transaction"
            toast.error(errorMessage)
            console.error("Error rejecting transaction:", error)
            return null
        } finally {
            set({ isRejectingTransaction: false })
        }
    },

    // Clean up 
    clearTransactionState: () => {
        set({
            transactions: [],
            allTransactions: [],
            pendingTransactions: [],
            currentTransaction: null
        })
    }
}))