"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";
import { NavbarDashboard } from "@/components/NavbarDashboard";

export default function DistributorProfilePage() {
    const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        if (!authUser) {
            checkAuth()
        }
    }, [authUser, checkAuth])

    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full"></div>
            </div>
        )
    }

    if (!authUser) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Not Logged In</h1>
                <p className="text-accent-content">Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <>
            <NavbarDashboard />
            <div className="flex flex-col items-center py-8 px-4 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Profile</h1>

                <div className="w-full bg-base-200 rounded-lg shadow-lg p-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center text-accent-content text-4xl font-bold">
                                {authUser.username ? authUser.username.charAt(0).toUpperCase() : "U"}
                            </div>
                        </div>

                        <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold">{authUser.username || authUser.name || "User"}</h2>
                                <span className="px-4 py-1 bg-accent text-accent-content rounded-full text-sm font-medium">
                                    {authUser.accountType || authUser.role || "Standard"} Account
                                </span>
                            </div>

                            <div className="space-y-2">
                                <p className="flex items-center gap-2">
                                    <span className="font-medium">Email:</span> {authUser.email || "No email provided"}
                                </p>
                                {authUser.createdAt && (
                                    <p className="flex items-center gap-2">
                                        <span className="font-medium">Member since:</span>
                                        {formatDate(authUser.createdAt)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-base-100 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-4">Account Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(authUser)
                                .filter(([key]) => !['password', 'token', '__v', '_id'].includes(key))
                                .map(([key, value]) => (
                                    <div key={key} className="flex flex-col">
                                        <span className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                        <span>{typeof value === 'object' ? JSON.stringify(value) : value.toString()}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}