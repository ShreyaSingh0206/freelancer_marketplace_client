export const dynamic = "force-dynamic";

'use client';

import dynamicImport from "next/dynamic";
import { Suspense } from "react";

const PaymentSuccessContent = dynamicImport(
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

