"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState(null);
  const [gigId, setGigId] = useState(null);

  // ✅ Read query params safely in browser
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id"));
    setGigId(params.get("gigId"));
  }, []);

  // ✅ Call backend only after params are available
  useEffect(() => {
    if (!sessionId || !gigId) return;

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-session`,
        { sessionId, gigId },
        { withCredentials: true }
      )
      .then((res) => console.log("Order created:", res.data))
      .catch((err) => console.error("Payment verify failed:", err));
  }, [sessionId, gigId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-green-600 text-5xl mb-3">✅</div>
      <h1 className="text-2xl font-bold text-green-700">
        Payment Successful!
      </h1>

      <button
        onClick={() => router.push("/buyer/dashboard")}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
      >
        Finish
      </button>
    </div>
  );
}



