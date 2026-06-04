import Link from "next/link";
import { notFound } from "next/navigation";
import { getKBArticle, KB_ARTICLES } from "@/data/knowledge-base";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";

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
    <div className="section">
      <div className="container-wide max-w-3xl">
        <Link href="/knowledge-base" className="text-sm text-cyan-400 hover:text-white mb-4 inline-block">
          ← Knowledge Base
        </Link>
        <p className="text-xs text-cyan-400 mb-2">{article.category}</p>
        <h1 className="text-3xl font-bold text-white mb-6">{article.title}</h1>
        <div className="prose prose-invert max-w-none space-y-4 text-slate-300">
          {article.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
        <div className="mt-12">
          <ContactCTA title="Need Help With Deployment?" />
        </div>
      </div>
    </div>
  );
}
