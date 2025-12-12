'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import StarRating from "../../components/StarRating";

export default function GigDetailPage() {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gigs/${id}`,
          {credentials: 'include'}
        );
        const data = await res.json();
        setGig(data);
      } catch (err) {
        console.error('Error fetching gig:', err);
      }
    };
    fetchGig();
  }, [id]);

  useEffect(() => {
  if (!gig?._id) return;

  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${gig._id}`)
    .then((res) => setReviews(res.data));
}, [gig]);

  if (!gig) return <div className="text-white p-10">Loading...</div>;

  const handleBuyNow = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-checkout-session`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gigId: gig._id }),
    });

    const data = await res.json();

   if (res.ok && data.url) {
  window.location.href = data.url;
} else {
  console.error("Stripe session error:", data);
  alert(data.message || "Failed to start checkout");
}
  } catch (err) {
    console.error("Error starting checkout:", err);
  }
};

const handleAddToWishlist = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/add`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gigId: gig._id }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Gig added to wishlist!");
    } else {
      alert(data.message || "Failed to add to wishlist");
    }
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    alert("Something went wrong");
  }
};

const submitReview = async () => {
  try {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/`,
    {
      gigId: gig._id,
      rating,
      comment,
    },
    { withCredentials: true }
  );

  alert("Review Submitted!");
  window.location.reload();
} catch (err) {
    console.error(err.response?.data);
    alert(err.response?.data || "Review failed");
  }
};



  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f1b] via-[#1a1a2f] to-[#0f0f1b] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Section */}
        <div className="lg:col-span-2">
          {/* Seller Info */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={gig.seller?.profilePic || '/default-avatar.png'}
              alt={gig.seller?.fullName}
              className="h-16 w-16 rounded-full object-cover border border-white/10"
            />
            <div>
              <h2 className="text-xl font-semibold">{gig.seller?.fullName}</h2>
              <p className="text-sm text-gray-400">{gig.seller?.occupations?.join(', ')}</p>
            </div>
          </div>

          {/* Thumbnail */}
          <img
            src={gig.thumbnail || '/default-thumbnail.jpg'}
            alt={gig.title}
            className="w-full h-80 object-cover rounded-xl mb-6"
          />

          {/* Gig Description */}
          <h1 className="text-3xl font-bold mb-4">{gig.title}</h1>
          <p className="text-gray-300 text-sm">{gig.desc}</p>

          {/* Seller Info Section */}
          <div className="mt-10 bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-4">About the Seller</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-300">
              <div>
                <p><span className="font-medium text-white">Full Name:</span> {gig.seller?.fullName}</p>
                <p><span className="font-medium text-white">Education:</span> {gig.seller?.education}</p>
                <p><span className="font-medium text-white">Occupation:</span> {gig.seller?.occupations?.join(', ')}</p>
                <p><span className="font-medium text-white">Description:</span> {gig.seller?.description}</p>
              </div>
              <div>
                <p><span className="font-medium text-white">Email:</span> {gig.seller?.contact?.email}</p>
                <p><span className="font-medium text-white">Phone:</span> {gig.seller?.contact?.phone || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-8">
        <aside className="bg-white/5 border border-white/10 rounded-xl p-6 h-fit">
          <h3 className="text-2xl font-semibold mb-4">Get this Gig</h3>
          <p className="text-green-400 text-xl font-bold mb-4">$ {gig.price}</p>
          <button
  onClick={handleBuyNow}
  className="w-full bg-green-500 hover:bg-green-600 transition text-white py-2 rounded-xl font-medium mb-3"
>
  Buy Now
</button>
          <button 
          onClick={handleAddToWishlist}
          className="w-full border border-white/20 hover:bg-white/10 transition text-white py-2 rounded-xl font-medium">
            ❤️ Add to Wishlist
          </button>
          </aside>
<aside className="bg-white/5 border border-white/10 rounded-xl p-6 h-fit">
                  <div className="mt-10">
  <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

  {reviews.length === 0 && <p>No reviews yet.</p>}

  {reviews.map((review) => (
    <div key={review._id} className="border p-4 rounded mb-3">
      <div className="flex justify-between">
        <p className="font-medium">{review.buyer.name}</p>

        <div className="flex">
  {[...Array(5)].map((_, i) => (
    <span
      key={i}
      className={
        i < review.rating
          ? "text-yellow-400 text-lg"
          : "text-gray-300 text-lg"
      }
    >
      ★
    </span>
  ))}
</div>

      </div>
      <p className="text-gray-600 mt-2">{review.comment}</p>
    </div>
  ))}

  <div className="mt-10">
  <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>

  <div className="mt-4">
  <p className="font-medium mb-1">Your Rating</p>
  <StarRating rating={rating} setRating={setRating} />
</div>

  <textarea
    className="border w-full mt-3 p-2"
    placeholder="Write your review..."
    onChange={(e) => setComment(e.target.value)}
  />

  <button
    onClick={submitReview}
    className="bg-black text-white px-4 py-2 mt-3 rounded"
  >
    Submit Review
  </button>
</div>

</div>
        </aside>
        </div>

      </div>
    </main>
  );
}
