"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code,
  Smartphone,
  Apple,
  PenTool,
  Palette,
  Megaphone,
  Pencil,
} from "lucide-react";

const categories = [
  {
    slug: "website-development",
    label: "Website Development",
    icon: Code,
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
  },
  {
    slug: "android-app-development",
    label: "Android App Development",
    icon: Smartphone,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
  },
  {
    slug: "ios-app-development",
    label: "iOS App Development",
    icon: Apple,
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
  },
  {
    slug: "logo-design",
    label: "Logo Design",
    icon: PenTool,
    gradient: "from-yellow-400 via-orange-500 to-red-500",
  },
  {
    slug: "ui-ux-design",
    label: "UI/UX Design",
    icon: Palette,
    gradient: "from-indigo-500 via-violet-500 to-purple-600",
  },
  {
    slug: "marketing",
    label: "Marketing",
    icon: Megaphone,
    gradient: "from-pink-600 via-rose-500 to-red-500",
  },
  {
    slug: "writing",
    label: "Writing",
    icon: Pencil,
    gradient: "from-amber-400 via-yellow-500 to-lime-500",
  },
  {
    slug: "Video and Animation",
    label: "Vieo and Animation",
    icon: Pencil,
    gradient: "from-amber-400 via-yellow-500 to-lime-500",
  },
];

export default function CategoryPage() {
  return (
    <main className="min-h-screen w-full bg-neutral-950 py-16 px-4">
      {/* Page Title */}
      <h1 className="mb-10 text-center text-3xl font-semibold text-neutral-100">
        Explore Categories
      </h1>

      {/* Category Grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ slug, label, icon: Icon, gradient }) => (
          <Link key={slug} href={`/categories/${slug}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-md`}
            >
              {/* Gradient Glow */}
              <div
                className={`absolute inset-0 z-0 h-full w-full bg-gradient-to-br ${gradient} opacity-20`}
              />

              {/* Card Content */}
              <div className="relative z-10 flex flex-col items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900/70">
                  <Icon className="h-6 w-6 text-neutral-100" />
                </div>
                <h3 className="text-lg font-medium text-neutral-100">{label}</h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </main>
  );
}

