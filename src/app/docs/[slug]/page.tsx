import { notFound } from "next/navigation";
import { getDoc, DOC_ARTICLES } from "@/data/docs";
import { ArticleLayout } from "@/components/content/article-layout";
import { JsonLd } from "@/components/shared";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, jsonLdGraph } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return DOC_ARTICLES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return buildMetadata({
    title: doc.title,
    description: doc.summary,
    path: `/docs/${slug}`,
  });
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          articleJsonLd({
            title: doc.title,
            description: doc.summary,
            path: `/docs/${slug}`,
            category: doc.section,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Docs", path: "/docs" },
            { name: doc.title, path: `/docs/${slug}` },
          ]),
        )}
      />
      <ArticleLayout
        backHref="/docs"
        backLabel="Buyer Docs"
        category={doc.section}
        title={doc.title}
        summary={doc.summary}
        ctaTitle="Ready to Place an Order?"
      >
        {doc.content.map((block) => (
          <p key={block}>{block}</p>
        ))}
      </ArticleLayout>
    </>
  );
}
