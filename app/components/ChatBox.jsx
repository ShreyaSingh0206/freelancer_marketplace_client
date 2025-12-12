"use client";

import { useEffect, useState, useRef } from "react";
import { useSocket } from "../../contexts/SocketContext";



export default function ChatBox({ conversationId, loggedInUserId, receiverId }) {
  const socket = useSocket();
  console.log("✅ Socket object:", socket);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);


  // ✅ Join room
  useEffect(() => {
    if (socket && conversationId) {
      socket.emit("joinConversation", conversationId);
    }
  }, [socket, conversationId]);

    // ✅ 2. FETCH OLD MESSAGES
   useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/chat/${conversationId}/messages`,
          { credentials: "include" }
        );

        const data = await res.json();
        console.log("✅ Loaded messages:", data);
        setMessages(data);
      } catch (err) {
        console.error("❌ Failed to load messages:", err);
      }
    };

    if (conversationId) fetchMessages();
  }, [conversationId]);

  // ✅ Receive messages
  useEffect(() => {
  if (!socket) return;

  const handleNewMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  socket.on("newMessage", handleNewMessage);

  return () => {
    socket.off("newMessage", handleNewMessage);
  };
}, [socket]);

  // ✅ Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send message
 const sendMessage = () => {
  if (!text.trim() || !socket || !receiverId || !conversationId) return;

  socket.emit("sendMessage", {
    conversationId,              
    sender: loggedInUserId,     
    receiver: receiverId,      
    text,     
  });

  setText("");
};

  return (
  <div className="flex flex-col h-full max-h-full w-full bg-gray-950 overflow-hidden">

    {/* ✅ CHAT HEADER */}
    <div className="px-6 py-4 border-b border-gray-800 bg-gray-900">
      <h2 className="text-white font-semibold text-lg">Chat</h2>
      <p className="text-xs text-gray-400">You're connected</p>
    </div>

    {/* ✅ CHAT MESSAGES */}
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 ">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender?.toString() === loggedInUserId
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow ${
              msg.sender?.toString() === loggedInUserId
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none"
                : "bg-gray-800 text-gray-200 rounded-bl-none"
            }`}
          >
            <p>{msg.text}</p>
            <span className="text-[10px] opacity-60 block text-right mt-1">
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>

    {/* ✅ INPUT AREA */}
    <div className="px-4 py-3 border-t border-gray-800 bg-gray-950 flex items-center gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={sendMessage}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
      >
        Send
      </button>
    </div>
  </div>
);

}

