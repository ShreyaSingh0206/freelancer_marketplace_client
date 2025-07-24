'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CategoryGigsPage() {
  const { slug } = useParams();
  const [gigs, setGigs] = useState([]);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gigs/category/${slug}`);
        const data = await res.json();
        setGigs(data.gigs);
      } catch (err) {
        console.error("Error fetching gigs:", err);
      }
    };
    fetchGigs();
  }, [slug]);

  return (
    <main className="min-h-screen px-4 py-10 text-white bg-gradient-to-b from-[#0f0f1b] via-[#1c1c2b] to-[#0f0f1b]">
      {/* Seller Info */}

      {/* Page Title */}
      
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Gigs in "{slug.replace(/-/g, ' ')}"
      </h1>
      

      {/* Gig Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {gigs.map((gig) => (
          <Link href={`/gigs/${gig._id}`} key={gig._id}>
            <div className="bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 rounded-2xl p-4 shadow-lg border border-white/10 cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl">
                {/* Seller */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={gig.seller?.profilePic || "/default-avatar.jpg"}
                  alt={gig.seller?.fullName || "Seller"}
                  className="h-10 w-10 rounded-full object-cover border border-white/10"
                />
                <div>
                <span className="text-sm text-white font-medium">
                  {gig.seller?.fullName || "Unknown Seller"}
                </span>
                 <br />
    <span className="text-xs text-gray-400">
      {gig.seller?.occupations?.join(", ") || "Occupation not set"}
    </span>
                </div>
              </div>
              <img
                src={gig.thumbnail || "/default-thumbnail.jpg"}
                alt={gig.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">{gig.title}</h3>
              <p className="text-sm text-gray-300 mb-2 line-clamp-2">{gig.desc}</p>
              <p className="text-green-400 font-semibold">₹ {gig.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
