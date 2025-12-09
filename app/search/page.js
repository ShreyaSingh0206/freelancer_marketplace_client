"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import GigCard from "../components/GigCard"; // Adjust this import to your card UI

export default function SearchPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // from URL: ?category=Design

  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const fetchGigs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/search?category=${encodeURIComponent(category)}`);
        setGigs(res.data);
      } catch (err) {
        console.error("Error fetching gigs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [category]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Results for: <span className="text-primary">{category}</span>
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : gigs.length === 0 ? (
        <p>No gigs found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      )}
    </div>
  );
}
