import { notFound } from "next/navigation";
import { getKBArticle, KB_ARTICLES } from "@/data/knowledge-base";
import { ArticleLayout } from "@/components/content/article-layout";
import { JsonLd } from "@/components/shared";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, jsonLdGraph } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return KB_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getKBArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/knowledge-base/${slug}`,
  });
}

export default async function KBArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getKBArticle(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          articleJsonLd({
            title: article.title,
            description: article.excerpt,
            path: `/knowledge-base/${slug}`,
            category: article.category,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Knowledge Base", path: "/knowledge-base" },
            { name: article.title, path: `/knowledge-base/${slug}` },
          ]),
        )}
      />
      <ArticleLayout
        backHref="/knowledge-base"
        backLabel="Knowledge Base"
        category={article.category}
        title={article.title}
        ctaTitle="Need Help With Deployment?"
      >
        {article.body.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </ArticleLayout>
    </>
  );
}
