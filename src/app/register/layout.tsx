import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Create Account",
  description: "Register a PhoneFarm ICU account to place hardware orders and track payment.",
  path: "/register",
  noIndex: true,
});

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
