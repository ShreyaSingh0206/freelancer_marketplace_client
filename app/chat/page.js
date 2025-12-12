import { Suspense } from "react";
import ChatPageClient from "./ChatPageClient";

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading chat...</div>}>
      <ChatPageClient />
    </Suspense>
  );
}
