"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ChatBox from "../../components/ChatBox";
import { motion } from "framer-motion";

export default function SellerMessages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchMe();
    fetchConversations();
  }, []);

  const fetchMe = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
      { withCredentials: true }
    );
    setUser(res.data);
  };

  const fetchConversations = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/seller-conversations`,
      { withCredentials: true }
    );
    setConversations(res.data);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      
      <div className="w-[280px] border-r border-gray-800 bg-gray-950/80 backdrop-blur-md">

        {/* HEADER */}
        <div className="p-5 border-b border-gray-800">
          <h2 className="text-lg font-bold tracking-wide text-purple-400">
            Messages
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Your active chats
          </p>
        </div>

        {/* CONVERSATION LIST */}
        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          {conversations.map((conv) => {
            const otherUser = conv.participants.find(
              (p) => p._id !== user?._id
            );

            const isActive = selectedConversation?._id === conv._id;

            return (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={conv._id}
                onClick={() => setSelectedConversation(conv)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                      : "hover:bg-gray-800/60"
                  }
                `}
              >
                {/* Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-sm uppercase">
                  {otherUser?.name?.charAt(0)}
                </div>

                {/* Name */}
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {otherUser?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    Click to chat
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      
      <div className="flex-1 h-screen bg-gray-900 relative flex flex-col">

      {!selectedConversation ? (
  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
    Select a conversation to start chatting 💬
  </div>
) : (
  <div className="absolute inset-0 flex">
    <ChatBox
      conversationId={selectedConversation._id}
      loggedInUserId={user._id}
      receiverId={selectedConversation.participants.find(
        (p) => p._id !== user._id
      )._id}
    />
  </div>
)}

      </div>
    </div>
  );
}
