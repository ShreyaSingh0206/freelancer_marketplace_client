import { Suspense } from "react";
import PaymentSuccessClient from "./PaymentSuccessClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PaymentSuccessClient />
    </Suspense>
  );
}


