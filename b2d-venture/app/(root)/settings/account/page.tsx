"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Separator } from "@/components/ui/separator"
import { InvestorAccountForm } from "@/components/shared/AccountForms/InvestorAccountForm"
import { BusinessAccountForm } from "@/components/shared/AccountForms/BusinessAccountForm"

export default function SettingsAccountPage() {
  const router = useRouter()
  const { id } = router.query // Get the id from the dynamic route
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (id) {
      const fetchUserRole = async () => {
        try {
          const response = await fetch(`/api/getUserRole/${id}`) 
          const data = await response.json()
          
          setRole(data.role) 
        } catch (error) {
          console.error("Failed to fetch user role:", error)
        } finally {
          setLoading(false) 
        }
      }

      fetchUserRole()
    }
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!role) {
    return <div>Unable to fetch user role.</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <Separator />

      {/* Render form based on user role */}
      {role === "investor" && <InvestorAccountForm />}
      {role === "business" && <BusinessAccountForm />}
    </div>
  )
}
