'use client'
import { NavbarDashboard } from '@/components/NavbarDashboard'
import { ProtectRoute } from '@/lib/ProtectRoute'
import { useAuthStore } from '@/lib/authStore'
export default function UserDashboard() {
    const { authUser } = useAuthStore()

    return (
        <ProtectRoute allowedRoles={['user']}>
            <NavbarDashboard />
            <div className="container mx-auto p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
                <div className="stats shadow bg-base-200">
                    <div className="stat">
                        <div className="stat-title">Current Balance</div>
                        <div className="stat-value text-primary">{authUser?.balance || 0} &#36;</div>
                        <div className="stat-desc">Your available money</div>
                    </div>
                </div>
            </div>
        </ProtectRoute>
    )
}