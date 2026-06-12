import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Order Details",
  description: "View phone farm hardware order and USDT payment status.",
  path: "/orders",
  noIndex: true,
});

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
