'use client'
import React, { useState } from 'react'
import { useAuth } from "@/contexts/AuthContext";


export default function GiginfoPage() {
  const [thumbnail, setThumbnail] = useState(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const { user } = useAuth();
  console.log("Current User:", user);

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0])
  }

   const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("desc", description);
  formData.append("price", price);
  formData.append("thumbnail", thumbnail);
   formData.append("seller", user._id); 

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gigs`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    
    if (!res.ok) {
  const text = await res.text();
  console.error(text);
  throw new Error("Request failed");
}
    const data = await res.json();
   

    alert("Gig created!");
  } catch (err) {
    console.error(err);
    alert("Error creating gig");
  }
};


  return (
    <div className="min-h-screen bg-zinc-900 text-white py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Create a New Gig</h1>

        {/* Form Starts */}
        <form className="space-y-10" onSubmit={handleSubmit}>

          {/* Gig Title */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="md:w-1/2">
              <label className="block text-lg font-semibold">Gig Title</label>
              <p className="text-sm text-zinc-400 mt-1">
                As your gig storefront, your title is the most important place to include keywords buyers would likely search for.
              </p>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter gig title"
              className="md:w-1/2 w-full bg-zinc-800 p-3 rounded-lg border border-zinc-700 focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="md:w-1/2">
              <label className="block text-lg font-semibold">Category</label>
              <p className="text-sm text-zinc-400 mt-1">
                Choose a category which is most suitable for your gig.
              </p>
            </div>
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
              className="md:w-1/2 w-full bg-zinc-800 p-3 rounded-lg border border-zinc-700 text-white"
            >
              <option>Select Category</option>
              <option>Website Development</option>
              <option>Android App Development</option>
              <option>iOS App Development</option>
              <option>UI/UX Design</option>
              <option>Logo Design</option>
              <option>Marketing</option>
              <option>Writing</option>
              <option>Video and animation</option>
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-1/2">
              <label className="block text-lg font-semibold">Description</label>
              <p className="text-sm text-zinc-400 mt-1">
                Write a description to tell buyers everything about your service.
              </p>
            </div>
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={5}
              className="md:w-1/2 w-full bg-zinc-800 p-3 rounded-lg border border-zinc-700 text-white"
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-1/2">
              <label className="block text-lg font-semibold">Gig Thumbnail</label>
              <p className="text-sm text-zinc-400 mt-1">
                Upload a thumbnail image for your gig.
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="md:w-1/2 w-full text-sm text-white file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0"
            />
          </div>

          {/* Pricing */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-1/2">
              <label className="block text-lg font-semibold">Price</label>
              <p className="text-sm text-zinc-400 mt-1">
                Set a suitable price for your gig.
              </p>
            </div>
            <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Enter price in $"
              className="md:w-1/2 w-full bg-zinc-800 p-3 rounded-lg border border-zinc-700 text-white"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-lg font-semibold"
            >
              Create Gig
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
