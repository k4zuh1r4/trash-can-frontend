'use client'
import React, { useState } from 'react'
import { MenuNavbar } from '@/components/menuNavbar'
import { useRouter } from 'next/navigation'
import { Mail, Key, Blocks, User, Phone, Users } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/authStore'
import { Toaster } from 'react-hot-toast'

export default function Register() {
    const router = useRouter()
    const { register, isRegistering } = useAuthStore()

    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        contactNumber: '',
        password: '',
        walletAddress: '',
        role: 'user' // default
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const success = await register(formData)
            if (success) {
                router.push('/login')
            }
        } catch (error) {
            console.error('Error during registration process:', error)
        }
    }

    return (
        <div>
            <Toaster position="top-center" />
            <MenuNavbar />
            <div className='m-5 p-8 flex justify-center'>
                <div className="card w-full max-w-md justify-center items-center mb-5 bg-white shadow-xl">
                    <h1 className="text-4xl font-bold text-center text-primary py-5 my-5" style={{ fontFamily: 'Instrument Sans' }}>Register</h1>
                    <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                        <label className="input mb-4">
                            <User className="h-[1em] opacity-50" />
                            <input
                                className='px-3 py-2 my-2 text-primary-content'
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                placeholder="Full name"
                                minLength="3"
                                maxLength="30"
                                title="Please enter your full name"
                            />
                        </label>
                        <label className="input mb-4">
                            <Phone className="h-[1em] opacity-50" />
                            <input
                                className='px-3 py-2 my-2 text-primary-content'
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                required
                                placeholder="Contact number"
                                minLength="8"
                                maxLength="12"
                                title="Please enter a valid contact number"
                            />
                        </label>
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
                                maxLength="50"
                                title="Please enter a valid email address"
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
                        <label className="input mb-4">
                            <Blocks className="h-[1em] opacity-50" />
                            <input
                                className='px-3 py-2 my-2 text-primary-content'
                                type="text"
                                name="walletAddress"
                                value={formData.walletAddress}
                                onChange={handleChange}
                                required
                                placeholder="Wallet Address"
                                title="Please enter your wallet address"
                            />
                        </label>
                        <div className="form-control w-full max-w-md mb-4">
                            <label className="label">
                                <span className="label-text flex items-center">
                                    <Users className="h-[1em] opacity-50 mr-2" />
                                    Account Type
                                </span>
                            </label>
                            <div className="flex flex-col gap-4 w-fit">
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 flex-1">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="user"
                                        checked={formData.role === 'user'}
                                        onChange={handleChange}
                                        className="radio radio-primary mr-2"
                                    />
                                    <div>
                                        <div className="font-medium">User</div>
                                        <div className="text-xs text-gray-500">Contribute trash and earn tokens</div>
                                    </div>
                                </label>
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 flex-1">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="distributor"
                                        checked={formData.role === 'distributor'}
                                        onChange={handleChange}
                                        className="radio radio-primary mr-2"
                                    />
                                    <div>
                                        <div className="font-medium">Distributor</div>
                                        <div className="text-xs text-gray-500">Review and approve contributions</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className='flex items-center'>
                            <Link href="/login" className="link link-primary text-center my-3 text-sm px-3">I already have an account.</Link>
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-primary text-primary-content my-8 py-5"
                                type="submit"
                                disabled={isRegistering}
                            >
                                {isRegistering ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}