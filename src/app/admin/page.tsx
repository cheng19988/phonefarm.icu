import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminInquiryRow } from "@/components/admin-inquiry-row";
import { AdminProductRow } from "@/components/admin-product-row";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Dashboard",
  description: "Admin panel",
  path: "/admin",
  noIndex: true,
});

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  const [users, orders, contacts, products, inquiries] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.contactSubmission.count(),
    prisma.product.count(),
    prisma.contactSubmission.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const newInquiries = inquiries.filter((i) => i.status === "New").length;

  const recentOrders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true } }, payment: true, items: { include: { product: { select: { name: true } } } } },
  });

  const allProducts = await prisma.product.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Admin Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Users", value: users },
            { label: "Orders", value: orders },
            { label: "Inquiries", value: contacts },
            { label: "New Inquiries", value: newInquiries },
          ].map((s) => (
            <div key={s.label} className="card p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Hardware Inquiries</h2>
          <p className="text-slate-500 text-sm mb-4">Update status as you contact, quote, or close each lead.</p>
          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-left bg-slate-900/50">
                  <th className="p-3">Received</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Country</th>
                  <th className="p-3">Email / Chat</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-slate-500">No inquiries yet.</td>
                  </tr>
                ) : (
                  inquiries.map((inq) => <AdminInquiryRow key={inq.id} inquiry={inq} />)
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div key={o.id} className="card p-4 text-sm">
                  <div className="flex justify-between">
                    <Link href={`/orders/${o.id}`} className="text-cyan-400">{o.orderNumber}</Link>
                    <span className="text-white">{o.status}</span>
                  </div>
                  <p className="text-slate-400 mt-1">{o.user.email} · ${o.totalUsd}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Inquiry Status Guide</h2>
            <ul className="text-sm text-slate-400 space-y-2">
              <li><strong className="text-cyan-400">New</strong> — just received, not yet contacted</li>
              <li><strong className="text-yellow-400">Contacted</strong> — sales replied, gathering requirements</li>
              <li><strong className="text-green-400">Quoted</strong> — written quotation sent</li>
              <li><strong className="text-slate-500">Closed</strong> — won, lost, or no further action</li>
              <li><strong className="text-red-400">Spam</strong> — filtered junk submission</li>
            </ul>
          </section>
        </div>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Product Inventory ({products})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Stock</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((p) => (
                  <AdminProductRow key={p.id} id={p.id} name={p.name} priceUsd={p.priceUsd} stock={p.stock} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
