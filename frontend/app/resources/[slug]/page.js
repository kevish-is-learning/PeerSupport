import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import PublicShell from "../../../components/public/PublicShell";
import { API_BASE_URL } from "../../../lib/api";
import { SITE_URL } from "../../../lib/seo";

export const revalidate = 300;

async function fetchPost(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/content/posts/${slug}`, {
      next: { revalidate },
    });
    if (!response.ok) return null;
    const payload = await response.json();
    return payload?.data?.post ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: `/resources/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || undefined,
      url: `/resources/${post.slug}`,
      publishedTime: post.publishedAt || undefined,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({ params }) {
  const post = await fetchPost(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.publishedAt || undefined,
    author: post.authorName ? { "@type": "Person", name: post.authorName } : undefined,
    publisher: { "@type": "Organization", name: "PeerSupport", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/resources/${post.slug}`,
    image: post.coverImageUrl || undefined,
  };

  return (
    <PublicShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Link
        href="/resources"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        All resources
      </Link>

      <article>
        <header className="mb-8">
          {post.tags?.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-[#EEF0FE] px-2 py-0.5 text-[11px] font-semibold text-[#5061E4]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-3 text-base leading-relaxed text-gray-500">{post.excerpt}</p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
            {post.authorName && (
              <span className="font-medium text-gray-600">{post.authorName}</span>
            )}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingMinutes} min read
            </span>
          </div>
        </header>

        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt=""
            className="mb-8 w-full rounded-xl border border-gray-100 object-cover"
          />
        )}

        {/* Content is authored as plain text/markdown-ish prose by admins, so it
            renders as escaped paragraphs rather than raw HTML. */}
        <div className="space-y-4">
          {post.content
            .split(/\n{2,}/)
            .filter((block) => block.trim())
            .map((block, i) => (
              <p key={i} className="whitespace-pre-wrap text-[15px] leading-7 text-gray-700">
                {block.trim()}
              </p>
            ))}
        </div>
      </article>

      <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50/60 p-6 text-center">
        <p className="text-sm font-bold text-gray-900">Want feedback on your own profile?</p>
        <p className="mt-1 text-xs text-gray-500">
          Book a 1-on-1 session with an IIM alum or CAT topper.
        </p>
        <Link
          href="/find-mentors"
          className="mt-4 inline-flex rounded-lg bg-[#5061E4] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4453cc]"
        >
          Find a mentor
        </Link>
      </div>
    </PublicShell>
  );
}
