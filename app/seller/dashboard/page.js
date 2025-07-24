"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function SellerDashboard() {
  const [gigs, setGigs] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [gigsRes, orderRes, messageRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/gigs`, { withCredentials: true }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/orders/count`, { withCredentials: true }),
        // axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/messages/count`, { withCredentials: true }),
      ]);

        console.log("Gigs response:", gigsRes);
    console.log("Order response:", orderRes);
    console.log("Message response:", messageRes);
    
      setGigs(gigsRes?.data || []);
    setOrderCount(orderRes?.data?.orderCount || 0);
    setMessageCount(messageRes?.data?.messageCount || 0);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <Link href="/seller/create-gig">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + Create New Gig
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Gigs</h2>
          <p className="text-2xl">{gigs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">{orderCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Client Messages</h2>
          <p className="text-2xl">{messageCount}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Gigs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gigs.map((gig) => (
            <div key={gig._id} className="bg-white rounded shadow p-4">
              <h3 className="text-lg font-bold">{gig.title}</h3>
              <p className="text-gray-600 truncate">{gig.desc}</p>
              <p className="mt-2 font-medium text-blue-700">₹ {gig.price}</p>
              <Link href={`/gig/${gig._id}`}>
                <button className="mt-3 text-sm text-blue-500 hover:underline">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

