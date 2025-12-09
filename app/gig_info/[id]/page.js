"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditGigPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [gigData, setGigData] = useState({
    title: "",
    desc: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchGig = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/gigs/${id}`, {
          withCredentials: true,
        });
        setGigData({
          title: res.data.title,
          desc: res.data.desc,
          price: res.data.price,
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to load gig data", err);
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  const handleChange = (e) => {
    setGigData({ ...gigData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/gigs/${id}`, gigData, {
        withCredentials: true,
      });
      router.push("/seller/dashboard"); // or wherever your dashboard route is
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) return <p className="text-center text-white mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Edit Gig</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={gigData.title}
            onChange={handleChange}
            placeholder="Gig Title"
            className="bg-gray-700 p-3 rounded"
            required
          />
          <textarea
            name="desc"
            value={gigData.desc}
            onChange={handleChange}
            placeholder="Gig Description"
            className="bg-gray-700 p-3 rounded h-32"
            required
          />
          <input
            type="number"
            name="price"
            value={gigData.price}
            onChange={handleChange}
            placeholder="Price"
            className="bg-gray-700 p-3 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Update Gig
          </button>
        </form>
      </div>
    </div>
  );
}
