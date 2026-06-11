import Link from "next/link";
import { ContentHero } from "@/components/content/content-hero";
import { BLOG_POSTS } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hardware Guides & Blog",
  description:
    "Practical guides on phone farm hardware selection, deployment planning, QC, rack configuration, power, cooling, and B2B order process.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <ContentHero
        eyebrow="Resources"
        title="Hardware Guides & Blog"
        subtitle="Deployment planning, rack configuration, power and cooling, QC and packing, and B2B order process for real-device phone farm hardware."
      />
      <div className="section section-light pt-0">
        <div className="container-hero">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card card-hover p-6 group flex flex-col h-full">
                <span className="text-xs font-semibold text-[var(--brand)] uppercase">{post.category}</span>
                <span className="text-xs text-[var(--text-subtle)] mt-1">{post.date}</span>
                <h2 className="font-bold text-[var(--text)] mt-3 group-hover:text-[var(--brand)] transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-2 flex-1 line-clamp-3">{post.excerpt}</p>
                <span className="text-sm font-medium text-[var(--brand)] mt-4">Read guide</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
