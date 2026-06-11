import { notFound } from "next/navigation";
import { getBlogPost, BLOG_POSTS } from "@/data/blog";
import { getKBArticle } from "@/data/knowledge-base";
import { ArticleLayout } from "@/components/content/article-layout";
import { articleJsonLd, buildMetadata, breadcrumbJsonLd, jsonLdGraph } from "@/lib/seo";
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
  const kbArticle = post.relatedKbSlug ? getKBArticle(post.relatedKbSlug) : undefined;

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${slug}`,
            category: post.category,
            datePublished: post.date,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        )}
      />
      <ArticleLayout
        backHref="/blog"
        backLabel="Guides & Blog"
        category={`${post.category} · ${post.date}`}
        title={post.title}
        ctaTitle="Shop Phone Farm Hardware"
        relatedKbSlug={post.relatedKbSlug}
        relatedKbTitle={kbArticle?.title}
      >
        <div className="whitespace-pre-line">{post.content}</div>
      </ArticleLayout>
    </>
  );
}
