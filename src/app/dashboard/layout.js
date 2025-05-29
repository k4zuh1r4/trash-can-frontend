'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/authStore'
import { Toaster } from 'react-hot-toast'
import { NavbarDashboard } from '@/components/NavbarDashboard'

export default function DashboardLayout({ children }) {
    const router = useRouter()
    const { authUser, checkAuth } = useAuthStore()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyAuth = async () => {
            // Skip check if we already have a user
            if (!authUser) {
                const isLoggedIn = await checkAuth()
                if (!isLoggedIn) {
                    router.push('/login')
                    return
                }
            }

            setLoading(false)

            // Only redirect to role-specific dashboard if we're at the root dashboard
            if (window.location.pathname === '/dashboard') {
                const currentUser = useAuthStore.getState().authUser
                if (currentUser?.role === 'admin') {
                    router.push('/dashboard/admin')
                } else if (currentUser?.role === 'distributor') {
                    router.push('/dashboard/distributor')
                } else {
                    router.push('/dashboard/user')
                }
            }
        }

        verifyAuth()
    }, [authUser, router, checkAuth])

    // Show loading when checking auth
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        )
    }

    return (
        <>
            <Toaster position="top-center" />
            <main>{children}</main>
        </>
    )
}