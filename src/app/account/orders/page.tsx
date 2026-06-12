import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";
import { formatUsd, formatUsdt } from "@/lib/pricing";
import { paymentStatusBadgeClass, paymentStatusLabel } from "@/lib/payment-status";

export const metadata = buildMetadata({
  title: "My Orders",
  description: "View your phone farm hardware orders and payment status.",
  path: "/account/orders",
  noIndex: true,
});

function statusBadge(status: string) {
  const lower = status.toLowerCase();
  if (lower.includes("paid") || lower === "completed") {
    return "badge-green";
  }
  if (lower.includes("wait") || lower.includes("pending")) {
    return "badge-yellow";
  }
  return "badge-red";
}

export default async function AccountOrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.id },
    include: { items: { include: { product: { select: { name: true } } } }, payment: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="section section-light">
        <div className="container-hero max-w-3xl">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-1">Account</p>
              <h1 className="text-3xl font-bold text-[var(--text)]">My Orders</h1>
            </div>
            <LogoutButton />
          </div>

          {orders.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-lg text-[var(--text-muted)] mb-2">No orders yet</p>
              <p className="text-sm text-[var(--text-subtle)] mb-6">
                Request a bulk quote from sales, browse the catalog, or place a sample order online.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-accent">Request a Quote</Link>
                <Link href="/products" className="btn-secondary">Browse Catalog</Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const paymentStatus = order.payment?.paymentStatus;
                const needsPayment =
                  paymentStatus === "pending" ||
                  paymentStatus === "underpaid" ||
                  order.status.toLowerCase().includes("wait");
                return (
                  <article key={order.id} className="card card-hover p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div>
                        <p className="font-bold text-[var(--text)] text-lg">{order.orderNumber}</p>
                        <p className="text-sm text-[var(--text-subtle)] mt-1">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[var(--accent)]">{formatUsd(order.totalUsd)}</p>
                        {order.payment && (
                          <p className="text-xs text-[var(--text-subtle)] mt-1">
                            {formatUsdt(order.payment.expectedAmount)} USDT due
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                      {order.items.map((i) => `${i.product.name} × ${i.quantity}`).join(", ")}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`${statusBadge(order.status)} capitalize`}>{order.status}</span>
                      {paymentStatus && (
                        <span className={`${paymentStatusBadgeClass(paymentStatus)}`}>
                          Payment: {paymentStatusLabel(paymentStatus)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/orders/${order.id}`} className="btn-secondary text-sm py-2 px-4">
                        View Order
                      </Link>
                      {needsPayment && (
                        <Link href={`/orders/${order.id}`} className="btn-accent text-sm py-2 px-4">
                          Continue Payment
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
