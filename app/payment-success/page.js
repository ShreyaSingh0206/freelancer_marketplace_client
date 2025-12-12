'use client';

import dynamic from "next/dynamic";
import { Suspense } from "react";

const PaymentSuccessContent = dynamic(
  () => import("./payment-success-content"),
  { ssr: false }
);

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

