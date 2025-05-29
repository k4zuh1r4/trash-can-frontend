'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/authStore'
import { Toaster } from 'react-hot-toast'
import { NavbarDashboard } from '@/components/NavbarDashboard'

export default function DashboardLayout({ children }) {
    const router = useRouter()
    const { authUser, checkAuth } = useAuthStore()
    const [isAuthChecked, setIsAuthChecked] = useState(false)

    useEffect(() => {
        // Only run auth check once
        if (!isAuthChecked) {
            const verifyAuth = async () => {
                if (!authUser) {
                    const isLoggedIn = await checkAuth()
                    if (!isLoggedIn) {
                        router.push('/login')
                        return
                    }
                }

                setIsAuthChecked(true)
            }

            verifyAuth()
        }
    }, [authUser, router, checkAuth, isAuthChecked])

    // Redirect to role-specific dashboard if we're at the root dashboard
    useEffect(() => {
        if (isAuthChecked && authUser && window.location.pathname === '/dashboard') {
            if (authUser.role === 'admin') {
                router.push('/dashboard/admin')
            } else if (authUser.role === 'distributor') {
                router.push('/dashboard/distributor')
            } else {
                router.push('/dashboard/user')
            }
        }
    }, [isAuthChecked, authUser, router])

    // Show loading when checking auth
    if (!isAuthChecked) {
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