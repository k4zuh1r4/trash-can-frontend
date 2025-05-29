'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/authStore'
import toast from 'react-hot-toast'

export function ProtectRoute({ children, allowedRoles = [] }) {
    const router = useRouter()
    const { authUser, checkAuth } = useAuthStore()
    const [authorized, setAuthorized] = useState(false)
    const [authChecked, setAuthChecked] = useState(false)

    useEffect(() => {
        // Only run this effect once per component mount
        if (!authChecked) {
            const verifyAuth = async () => {
                // If no user is logged in yet, try to verify from token
                if (!authUser) {
                    const isLoggedIn = await checkAuth()
                    if (!isLoggedIn) {
                        toast.error("Please log in to access this page")
                        router.push('/login')
                        setAuthorized(false)
                        setAuthChecked(true)
                        return
                    }
                }

                // Get current user state after auth check
                const user = useAuthStore.getState().authUser

                if (allowedRoles.length > 0) {
                    if (user && allowedRoles.includes(user.role)) {
                        setAuthorized(true)
                    } else {
                        toast.error("You don't have permission to access this page")
                        redirectBasedOnRole(user?.role)
                        setAuthorized(false)
                    }
                } else {
                    setAuthorized(true)
                }

                setAuthChecked(true)
            }

            verifyAuth()
        }
    }, [authChecked, authUser, router, allowedRoles, checkAuth])

    // Helper function to redirect based on role
    const redirectBasedOnRole = (role) => {
        switch (role) {
            case 'admin':
                router.push('/dashboard/admin')
                break
            case 'distributor':
                router.push('/dashboard/distributor')
                break
            case 'user':
            default:
                router.push('/dashboard/user')
                break
        }
    }

    // Show loading or render children
    if (!authChecked) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        )
    }

    return authorized ? children : null
}