"use client";

import { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const searchParams = useSearchParams();
const conversationId = searchParams.get("conversationId");


  // ✅ Get logged-in user
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  // ✅ Get conversations
  useEffect(() => {
    if (!user) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setConversations(data);
        setSelectedConversation(data[0]);
      });
  }, [user]);

useEffect(() => {
  if (!conversationId) return;

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/${conversationId}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      setSelectedConversation(data); // ✅ now has participants
    })
    .catch((err) => console.error("Failed to fetch conversation:", err));
}, [conversationId]);

  if (!user || !selectedConversation) {
    return <p className="text-center mt-10">Loading chat...</p>;
  }

  return (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
    <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Chat Room 💬
      </h2>

      <ChatBox
        conversationId={selectedConversation._id}
        loggedInUserId={user._id}
        receiverId={
          selectedConversation.participants.find(
            (p) => p._id !== user._id
          )._id
        }
      />
    </div>
  </div>
);

}
