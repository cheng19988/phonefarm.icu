import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hardware Setup & Deployment Services",
  description:
    "Phone farm rack setup, remote control configuration, bulk device deployment, custom hardware engineering, maintenance, and overseas delivery from Guangzhou.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Hardware Setup Services</h1>
        <p className="text-slate-400 max-w-3xl mb-4">
          Hardware is only part of the deployment. We help with rack setup, device provisioning, and maintenance — quoted per project from our Guangzhou workshop.
        </p>
        <p className="text-sm text-slate-500 mb-10 max-w-3xl">
          Services are quoted per project. Most clients combine hardware purchase with one or two setup packages — share your device count and software stack on the contact form for a scoped proposal.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc) => (
            <article key={svc.slug} className="card overflow-hidden group">
              <div className="relative aspect-video">
                <Image src={svc.image} alt={svc.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">{svc.title}</h2>
                <p className="text-slate-400 text-sm mb-4">{svc.description}</p>
                <Link href={`/contact?service=${svc.slug}`} className="text-cyan-400 text-sm hover:text-white">
                  Request Quote for This Service
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16">
          <ContactCTA title="Need a Custom Deployment Plan?" />
        </div>
      </div>
    </div>
  );
}
