import { create } from "zustand"
import { axiosInstance } from "./axios.js"
import toast from "react-hot-toast"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoggingIn: false,
    isRegistering: false,
    isUpdatingProfile: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const token = localStorage.getItem("jwt")
            if (!token) {
                set({ authUser: null, isCheckingAuth: false })
                return false
            }

            // Explicitly set auth header
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

            const res = await axiosInstance.get("/auth/check")
            if (res.status === 200 && res.data) {
                set({ authUser: res.data, isCheckingAuth: false })
                return true
            }
            // If we got here without returning true, something went wrong
            localStorage.removeItem("jwt")
            delete axiosInstance.defaults.headers.common['Authorization']
            set({ authUser: null, isCheckingAuth: false })
            return false
        } catch (error) {
            console.error("Auth check error:", error)
            localStorage.removeItem("jwt")
            delete axiosInstance.defaults.headers.common['Authorization']
            set({ authUser: null, isCheckingAuth: false })
            return false
        }
    },
    register: async (data) => {
        set({ isRegistering: true })
        try {
            const res = await axiosInstance.post("/auth/register", data)
            if (res.status === 201) {
                // For registration, we store the returned data but might not have a token yet
                set({ authUser: res.data })
                toast.success("Registration successful")
                return true
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration failed"
            toast.error(errorMessage)
            console.error("Registration error:", error)
            return false
        } finally {
            set({ isRegistering: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            if (res.status === 200) {
                const userData = res.data
                const token = userData.token

                // Store the token in localStorage
                if (token) {
                    localStorage.setItem("jwt", token)
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
                }

                set({ authUser: userData, isLoggingIn: false, isCheckingAuth: false })
                toast.success("Logged in successfully")
                return true
            }
            return false
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Invalid credentials"
            toast.error(errorMessage)
            console.error("Login error:", error)
            set({ isLoggingIn: false })
            return false
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            // Always clear local state regardless of server response
            localStorage.removeItem("jwt")
            delete axiosInstance.defaults.headers.common['Authorization']
            set({ authUser: null })
            toast.success("Logged out successfully")
            return true
        }
    }
}))