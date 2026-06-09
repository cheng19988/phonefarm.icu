import { notFound } from "next/navigation";
import { getBlogPost, BLOG_POSTS } from "@/data/blog";
import { ArticleLayout } from "@/components/content/article-layout";
import { TrustStrip } from "@/components/trust-strip";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, path: `/blog/${slug}` });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />
      <TrustStrip variant="light" />
      <ArticleLayout
        backHref="/blog"
        backLabel="Guides & Blog"
        category={`${post.category} · ${post.date}`}
        title={post.title}
        ctaTitle="Shop Phone Farm Hardware"
      >
        <div className="whitespace-pre-line">{post.content}</div>
      </ArticleLayout>
    </>
  );
}
