'use client'
import React from 'react'
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import {
  Search,
  ShoppingBag,
  Bell,
  CircleUserRound,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Navbar = () => {
   const { user, loading } = useAuth();
   const [query, setQuery] = useState("");

   if (loading) {
  return null; // or a skeleton header
}

  const onSearch = (e) => {
  e.preventDefault();
  if (!query.trim()) return;

  const formatted = query
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  window.location.href = `/categories/${formatted}`;
};

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border border-white/10 bg-gray-900 px-4 backdrop-blur-md shadow-md md:px-8 ">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className='flex items-center'>
        <img src="freelancer_logo.png" className='h-14' alt="" />
        <div  className="text-xl font-semibold text-primary-400 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent hover:opacity-90">
          HireHatch
        </div>
        </div>

      </div>

      {/* Search bar */}
      <form
        onSubmit={onSearch}
        className="relative hidden w-full max-w-lg items-center md:flex"
      >
        <Input
          type="text"
          placeholder="Find services…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-9 rounded-full border-none  bg-white/10 pl-12 pr-4 text-sm text-neutral-200 placeholder:text-neutral-500 focus:ring-2 focus:ring-primary-400"
        />
        <Search className="absolute left-4 h-4 w-4 text-neutral-500" />

         <Button
      type="submit"
      size="icon"
      className="m-1 h-8 w-8 shrink-0 rounded-full bg-white/10 p-0 backdrop-blur-md transition hover:bg-white/20"
    >
      <Search className="h-4 w-4 text-neutral-200" />
    </Button>
      </form>

      {/* Right‑side actions */}
      <div className="flex items-center gap-2">
        {/* Orders */}
        <Link href="/buyer/dashboard" className="group relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-800">
          <ShoppingBag className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-white" />
        </Link>

         <Link href="/buyer/dashboard" className="group relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-800">
          <FaHeart  className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-white" />
        </Link>

       

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-9 w-9 items-center justify-center rounded-full p-0 hover:bg-neutral-800"
            >
              {user?.avatarUrl ? (
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatarUrl} alt={user.name ?? "User"} />
                  <AvatarFallback className="bg-primary-500/20 text-primary-400">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <CircleUserRound className="h-5 w-5 text-neutral-400" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-neutral-900 text-neutral-200">
            <DropdownMenuItem asChild>
              <Link href="/buyer/dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/buyer/dashboard" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" /> Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button className="flex items-center gap-2 text-red-400" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Navbar