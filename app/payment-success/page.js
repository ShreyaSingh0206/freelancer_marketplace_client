import dynamic from "next/dynamic";

const PaymentSuccessContent = dynamic(
  () => import("./payment-success-content"),
  {
    ssr: false, // IMPORTANT: disable SSR so no prerender happens
  }
);

export default function Page() {
  return <PaymentSuccessContent />;
}
