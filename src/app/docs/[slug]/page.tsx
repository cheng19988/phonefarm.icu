import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoc, DOC_ARTICLES } from "@/data/docs";
import { buildMetadata } from "@/lib/seo";

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
    <div className="section">
      <div className="container-wide max-w-3xl">
        <Link href="/docs" className="text-sm text-cyan-400 hover:text-white mb-4 inline-block">
          ← Documentation
        </Link>
        <p className="text-xs text-slate-500 mb-1">{doc.section}</p>
        <h1 className="text-3xl font-bold text-white mb-6">{doc.title}</h1>
        <p className="text-slate-400 mb-8">{doc.summary}</p>
        <div className="space-y-4 text-slate-300">
          {doc.content.map((block) => (
            <p key={block}>{block}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
