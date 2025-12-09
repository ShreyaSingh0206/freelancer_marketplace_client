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
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col h-[500px]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-3 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender?.toString() === loggedInUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg ${
                msg.sender?.toString() === loggedInUserId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs opacity-70 block text-right">
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

      {/* Input Box */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

