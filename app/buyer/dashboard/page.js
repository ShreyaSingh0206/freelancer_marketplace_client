"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function BuyerDashboard() {
  const [purchasedGigs, setPurchasedGigs] = useState([]);
  const [wishlistedGigs, setWishlistedGigs] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [purchasedRes, wishlistRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/my-orders`, { withCredentials: true }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/my-wishlist`, { withCredentials: true }),
      ]);
      setPurchasedGigs(purchasedRes.data);
      setWishlistedGigs(wishlistRes.data);
    } catch (err) {
      console.error("Error loading buyer dashboard:", err);
    }
  };

  const handleBecomeSeller = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/become-seller`,
        {},
        { withCredentials: true }
      );
      window.location.href = "/creategig";
    } catch (err) {
      console.error("Failed to become seller:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleRemoveFromWishlist = async (gigId) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/remove/${gigId}`, {
        withCredentials: true,
      });
      setWishlistedGigs(prev => prev.filter(gig => gig._id !== gigId));
    } catch (err) {
      console.error("Failed to remove gig from wishlist:", err);
    }
  };

  const handleChatWithSeller = async (sellerId) => {
    if (!sellerId) {
    console.error("❌ Seller USER ID missing:", sellerId);
    return;
  }
  try {
   const res = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/api/chat/create`,
  { receiverId: sellerId },
  { withCredentials: true }
);

    const conversationId = res.data._id;

    window.location.href = `/chat?conversationId=${conversationId}`;
  } catch (err) {
    console.error("Failed to start chat:", err);
  }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={handleBecomeSeller}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Become a Seller
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Purchased Gigs ({purchasedGigs.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {purchasedGigs.map(order => (
  <div
    key={order._id}
    className="relative bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
  >
    {/* ✅ Chat Button at Top-Right */}
    <button
      onClick={() => handleChatWithSeller(order.gig.seller.user)}
      className="absolute top-3 right-3 bg-blue-600 text-white px-4 py-2 rounded text-xs hover:bg-blue-700"
    >
      💬 Chat
    </button>

    <h3 className="text-xl font-bold mb-2">{order.gig.title}</h3>
    <p className="text-gray-300 mb-3">{order.gig.desc}</p>

    <Link
      href={`/gigs/${order.gig._id}`}
      className="text-blue-400 hover:underline"
    >
      View Gig
    </Link>
  </div>
))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Wishlisted Gigs ({wishlistedGigs.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlistedGigs.map(gig => (
            <div key={gig._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition relative">
              <h3 className="text-xl font-bold mb-2">{gig.title}</h3>
              <p className="text-gray-300 mb-3">{gig.desc}</p>
              <div className="flex justify-between items-center">
                <Link href={`/gigs/${gig._id}`} className="text-blue-400 hover:underline">
                  View Gig
                </Link>
                <button
                  onClick={() => handleRemoveFromWishlist(gig._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
