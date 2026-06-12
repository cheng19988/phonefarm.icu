import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sign In",
  description: "Sign in to your PhoneFarm ICU account to view orders and payment status.",
  path: "/login",
  noIndex: true,
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
