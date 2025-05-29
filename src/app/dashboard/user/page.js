'use client'
import { NavbarDashboard } from '@/components/NavbarDashboard'
import { ProtectRoute } from '@/lib/ProtectRoute'
import { useAuthStore } from '@/lib/authStore'
export default function UserDashboard() {
    const { authUser } = useAuthStore()

    return (
        <ProtectRoute allowedRoles={['user']}>
            <NavbarDashboard />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <div className="stat-title">Current Balance</div>
                        <div className="stat-value text-primary">{authUser?.balance || 0} &#36;</div>
                        <div className="stat-desc">Your available money</div>
                    </div>
                </div>
            </div>
        </ProtectRoute>
    )
}