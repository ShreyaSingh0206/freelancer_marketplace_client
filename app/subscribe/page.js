'use client'

import React, { useState } from 'react'

const plans = [
  { name: "basic", price: 199 },
  { name: "pro", price: 499, popular: true },
  { name: "premium", price: 999 },
]

export default function SubscribePage() {
  const [loading, setLoading] = useState(null)

  const handleSubscribe = async (plan) => {
    try {
      setLoading(plan)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-subscription-session`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan })
        }
      )

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")

      window.location.href = data.url

    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#0f2a44] to-[#020c1b] text-white flex items-center justify-center px-6">

      <div className="max-w-6xl w-full">
        <h1 className="text-4xl font-bold text-center mb-10">
          Choose Your Plan
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative p-8 rounded-2xl backdrop-blur-lg border
                bg-white/10 border-white/20 shadow-xl
                hover:scale-105 transition duration-300
                ${plan.popular ? "ring-2 ring-green-400" : ""}
              `}
            >

              {/* Popular badge */}
              {plan.popular && (
                <span className="absolute -top-3 right-4 bg-green-500 text-xs px-3 py-1 rounded-full font-semibold">
                  MOST POPULAR
                </span>
              )}

              <h2 className="text-3xl font-bold capitalize mb-4 text-center">
                {plan.name}
              </h2>

              <p className="text-4xl font-extrabold text-center mb-6">
                ₹{plan.price}
                <span className="text-sm font-medium text-gray-300"> /month</span>
              </p>

              <ul className="mb-8 space-y-3 text-gray-200">
                <li>✔ Create gigs</li>
                <li>✔ Get orders</li>
                <li>
                  ✔ {plan.name === "basic"
                    ? "2 gigs"
                    : plan.name === "pro"
                    ? "10 gigs"
                    : "Unlimited gigs"}
                </li>
                <li>✔ Priority support</li>
              </ul>

              <button
                onClick={() => handleSubscribe(plan.name)}
                disabled={loading === plan.name}
                className={`
                  w-full py-3 rounded-lg font-semibold transition
                  ${plan.popular
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-white/20 hover:bg-white/30"}
                `}
              >
                {loading === plan.name ? "Processing..." : "Buy Now"}
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}