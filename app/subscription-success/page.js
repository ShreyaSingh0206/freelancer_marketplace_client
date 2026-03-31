'use client'

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function SuccessPage() {
  const router = useRouter()
  const params = useSearchParams()
  const { fetchUser } = useAuth() // 🔥 IMPORTANT

  useEffect(() => {
    const verify = async () => {
      const sessionId = params.get("session_id")

      if (!sessionId) return

      // Step 1: verify payment
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-subscription`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId })
        }
      )

      // 🔥 Step 2: refresh user
      await fetchUser()

      // Step 3: redirect
      router.push("/gig_info")
    }

    verify()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <h1 className="text-2xl">Processing your subscription...</h1>
    </div>
  )
}