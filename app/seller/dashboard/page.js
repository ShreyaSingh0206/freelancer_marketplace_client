"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SellerDashboard() {
  const [gigs, setGigs] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
const [gigToDelete, setGigToDelete] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [gigsRes, orderRes /*, messageRes */] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/gigs`, { withCredentials: true }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/orders/count`, { withCredentials: true }),
        // axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/messages/count`, { withCredentials: true }),
      ]);

      setGigs(gigsRes?.data || []);
      setOrderCount(orderRes?.data?.orderCount || 0);
      setMessageCount(0); // Temporarily hardcoded
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {}, { withCredentials: true });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

 
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <div className="flex gap-4">
          <Link href="/gig_info">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              + Create New Gig
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-200">Total Gigs</h2>
          <p className="text-2xl text-white">{gigs.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-200">Total Orders</h2>
          <p className="text-2xl text-white">{orderCount}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-200">Client Messages</h2>
          <p className="text-2xl text-white">{messageCount}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Gigs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gigs.map((gig) => (
            <div key={gig._id} className="bg-gray-800 rounded shadow p-4 flex flex-col justify-between">
  <div>
    <h3 className="text-lg font-bold text-white">{gig.title}</h3>
    <p className="text-gray-400 truncate">{gig.desc}</p>
    <p className="mt-2 font-medium text-green-400">$ {gig.price}</p>
  </div>
  <div className="mt-4 flex gap-2">
    <Link href={`/gig_info/${gig._id}`}>
      <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm">
        Update
      </button>
    </Link>
    <button
      onClick={() => {
    setGigToDelete(gig._id);
    setShowModal(true);
  }}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
    >
      Delete
    </button>
  </div>
</div>

          ))}
        </div>
      </div>

      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm bg-black/30 bg-opacity-50">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-80">
      <h2 className="text-xl font-semibold text-white mb-4">Delete Gig?</h2>
      <p className="text-gray-300 mb-6">Are you sure you want to delete this gig? This action cannot be undone.</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            try {
              await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/gigs/${gigToDelete}`, {
                withCredentials: true,
              });
              setGigs((prev) => prev.filter((g) => g._id !== gigToDelete));
            } catch (err) {
              console.error("Delete failed", err);
            } finally {
              setShowModal(false);
              setGigToDelete(null);
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
