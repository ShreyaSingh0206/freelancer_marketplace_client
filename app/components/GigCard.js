"use client";
import Link from "next/link";

export default function GigCard({ gig }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition-all duration-200">
      <h2 className="text-lg font-semibold text-white mb-2">{gig.title}</h2>

      <p className="text-sm text-neutral-400 mb-2">
        Category: <span className="text-primary">{gig.category}</span>
      </p>

      {gig.description && (
        <p className="text-sm text-neutral-300 mb-3 line-clamp-3">
          {gig.description}
        </p>
      )}

      <div className="flex justify-between items-center">
        <span className="text-green-400 font-bold">₹{gig.price}</span>

        <Link
          href={`/gig/${gig._id}`}
          className="text-sm text-primary-400 hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
