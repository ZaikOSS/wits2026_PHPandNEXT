"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import AdminLogin from "@/components/admin/AdminLogin"
import AdminDashboard from "@/components/admin/AdminDashboard"

export default function AdminPage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return <AdminDashboard />
}
