'use client'
import React, { useState } from 'react'
import { MenuNavbar } from '@/components/menuNavbar'
import { useRouter } from 'next/navigation'
import { Mail, Key } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/authStore'
import { Toaster } from 'react-hot-toast'

export default function Login() {
    const router = useRouter()
    const { login, isLoggingIn } = useAuthStore()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const success = await login(formData)
            if (success) {
                // Get user from store after login
                const { authUser } = useAuthStore.getState()

                // Redirect based on role
                if (authUser?.role === 'admin') {
                    router.push('/dashboard/admin')
                } else if (authUser?.role === 'distributor') {
                    router.push('/dashboard/distributor')
                } else {
                    router.push('/dashboard/user')
                }
            }
        } catch (error) {
            console.error('Error during login process:', error)
        }
    }

    return (
        <div>
            <Toaster position="top-center" />
            <MenuNavbar />
            <div className='m-5 p-8 flex justify-center'>
                <div className="card w-full max-w-md justify-center items-center mb-5 bg-white shadow-xl">
                    <h1 className="text-4xl font-bold text-center text-primary py-5 my-5" style={{ fontFamily: 'Instrument Sans' }}>Login</h1>
                    <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                        <label className="input mb-4">
                            <Mail className="h-[1em] opacity-50" />
                            <input
                                className='px-3 py-2 my-2 text-primary-content'
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Email"
                                minLength="3"
                                maxLength="30"
                                title="Enter a valid email address"
                            />
                        </label>
                        <label className="input mb-4">
                            <Key className="h-[1em] opacity-50" />
                            <input
                                className='px-3 py-2 my-2 text-primary-content'
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Password"
                                minLength="6"
                                title="Password must be at least 6 characters"
                            />
                        </label>
                        <div className='flex items-center'>
                            <Link href="/register" className="link link-primary text-center my-3 text-sm px-3">I do not have an account.</Link>
                            <Link href="/" className="link link-primary text-center my-3 text-sm px-3">Forgot password?</Link>
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-primary text-primary-content my-8 py-5"
                                type="submit"
                                disabled={isLoggingIn}
                            >
                                {isLoggingIn ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}