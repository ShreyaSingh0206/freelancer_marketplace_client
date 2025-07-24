'use client'
import Link from 'next/link';

export default function CreateGigPage() {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 h-full w-full object-cover z-0"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex h-full w-full items-center justify-center px-6">
        <div className="max-w-2xl text-center text-white">
          <h1 className="text-4xl font-roboto font-bold mb-4">Start Selling Your Skills</h1>
          <p className="mb-6 text-lg font-poppins text-neutral-300">
            Join our freelancer platform to showcase your talents, reach clients, and grow your freelance business.
            Creating a gig is your first step toward freedom and opportunity.
          </p>
          <Link href="/seller/personal_info" >
            <button className="rounded-full bg-teal-500 px-6 py-3 text-white hover:bg-teal-600 transition">
              Create a Gig
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
