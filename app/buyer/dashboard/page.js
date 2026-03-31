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
  <div className="min-h-screen bg-gray-900 text-white px-6 py-4">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-semibold">Buyer Dashboard</h1>

      <div className="flex gap-3">
        <button
          onClick={handleBecomeSeller}
          className="bg-green-600 px-5 py-3 text-sm rounded hover:bg-green-700"
        >
          Become Seller
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1.5 text-sm rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>

    {/* Purchased Section */}
    <section className="mb-10">
      <h2 className="text-lg font-medium mb-4 text-gray-300">
        Purchased ({purchasedGigs.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {purchasedGigs.map(order => (
          <div
            key={order._id}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-500 transition"
          >

            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-md line-clamp-1">
                {order.gig.title}
              </h3>

             <button
  onClick={() => handleChatWithSeller(order.sellerId)}
  className="flex items-center gap-1 text-xs bg-purple-600 px-3 py-1.5 rounded hover:bg-purple-700 transition"
>
  <span>💬</span>
  <span>Chat</span>
</button>
            </div>

            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
              {order.gig.desc}
            </p>

            <Link
              href={`/gigs/${order.gig._id}`}
              className="text-sm text-blue-400 hover:underline"
            >
              View Gig
            </Link>

          </div>
        ))}

      </div>
    </section>

    {/* Wishlist */}
    <section>
      <h2 className="text-lg font-medium mb-4 text-gray-300">
        Wishlist ({wishlistedGigs.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {wishlistedGigs.map(gig => (
          <div
            key={gig._id}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-500 transition"
          >

            <h3 className="font-semibold text-md mb-1 line-clamp-1">
              {gig.title}
            </h3>

            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
              {gig.desc}
            </p>

            <div className="flex justify-between items-center">
              <Link
                href={`/gigs/${gig._id}`}
                className="text-sm text-blue-400 hover:underline"
              >
                View
              </Link>

              <button
                onClick={() => handleRemoveFromWishlist(gig._id)}
                className="text-xs bg-red-600 px-2 py-1 rounded hover:bg-red-700"
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
