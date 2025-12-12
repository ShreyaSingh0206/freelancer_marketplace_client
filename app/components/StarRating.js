"use client";
import { useState } from "react";

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
     <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`text-2xl transition ${
            star <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
