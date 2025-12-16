"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ChatBox from "../components/ChatBox";

export default function ChatPageClient() {
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversationId");

  // Get logged-in user
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  // Get all conversations
  useEffect(() => {
    if (!user) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setConversations(data);

        // When URL has ?conversationId=...
        if (conversationId) {
          const match = data.find((c) => c._id === conversationId);
          if (match) setSelectedConversation(match);
          else setSelectedConversation(data[0]);
        } else {
          setSelectedConversation(data[0]);
        }
      });
  }, [user, conversationId]);

  if (!user || !selectedConversation) {
    return <p className="text-center mt-10">Loading chat...</p>;
  }

  const receiver = selectedConversation.participants?.find(
  (p) => p?._id && p._id !== user._id
);

if (!receiver) {
  console.log("No receiver found:", selectedConversation);
  return <p className="text-center mt-10">Loading chat...</p>;
}

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      <div className="h-[90vh] w-[650px] max-w-[95vw] bg-gray-800 rounded-lg shadow-lg flex flex-col overflow-hidden">

        <h2 className="text-xl font-semibold text-center py-4 border-b border-gray-700">
          Chat Room 💬
        </h2>

        <div className="flex-1 overflow-hidden">
          <ChatBox
            conversationId={selectedConversation._id}
            loggedInUserId={user._id}
             receiverId={receiver._id}
          />
        </div>

      </div>
    </div>
  );
}
