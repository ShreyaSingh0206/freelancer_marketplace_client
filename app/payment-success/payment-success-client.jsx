"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams.get("session_id");
  const gigId = searchParams.get("gigId");

  useEffect(() => {
    if (sessionId && gigId) {
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-session`,
        { sessionId, gigId },
        { withCredentials: true }
      )
      .then((res) => console.log("Order created:", res.data))
      .catch((err) => console.error("Order creation failed:", err));
    }
  }, [sessionId, gigId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <div className="text-green-600 text-6xl mb-4">✅</div>
      <h1 className="text-3xl font-bold text-green-700">Payment Successful!</h1>
      <p className="text-gray-600 mt-2 mb-6">
        Your order has been placed successfully.
      </p>
      <button
        onClick={() => router.push("/buyer/dashboard")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl text-lg shadow-md transition"
      >
        Finish
      </button>
    </div>
  );
}
