"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Search, Clock, BookOpen, X } from "lucide-react";
import PublicShell from "../../components/public/PublicShell";
import { contentApi } from "../../lib/api";
import { Badge, Card, EmptyState, Skeleton, cx, formatDate } from "../../components/ui/kit";

export default function ResourcesPage() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentApi
      .listTags()
      .then((res) => setTags(res.data?.tags || []))
      .catch(() => setTags([]));
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await contentApi.listPosts({
        tag: activeTag || undefined,
        search: search.trim() || undefined,
        limit: 24,
      });
      setPosts(res.data?.posts || []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [activeTag, search]);

  useEffect(() => {
    const timer = setTimeout(load, 300);
    return () => clearTimeout(timer);
  }, [load]);

  return (
    <PublicShell
      wide
      title="Resources"
      description="Preparation guides, strategy breakdowns and lessons from mentors who have been through the CAT cycle."
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-9 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#5061E4] focus:outline-none focus:ring-2 focus:ring-[#5061E4]/10"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <TagChip active={!activeTag} onClick={() => setActiveTag("")}>
            All
          </TagChip>
          {tags.map((tag) => (
            <TagChip key={tag} active={activeTag === tag} onClick={() => setActiveTag(tag)}>
              {tag}
            </TagChip>
          ))}
        </div>
      )}

      {loading && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-56" />
          ))}
        </div>
      )}

      {!loading && posts.length === 0 && (
        <EmptyState
          icon={BookOpen}
          title="No articles yet"
          description={
            search || activeTag
              ? "Nothing matches that filter — try clearing it."
              : "New guides and resources will show up here soon."
          }
        />
      )}

      {!loading && posts.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/resources/${post.slug}`} className="group block">
              <Card interactive className="flex h-full flex-col overflow-hidden">
                {post.coverImageUrl ? (
                  <img
                    src={post.coverImageUrl}
                    alt=""
                    className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="h-36 w-full bg-gradient-to-br from-[#EEF0FE] to-[#F8F9FF]" />
                )}

                <div className="flex flex-1 flex-col p-4">
                  {post.tags?.[0] && <Badge tone="brand">{post.tags[0]}</Badge>}

                  <h2 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#5061E4]">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-auto flex items-center gap-3 pt-3 text-[11px] text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingMinutes} min read
                    </span>
                    {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PublicShell>
  );
}

function TagChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
        active
          ? "border-[#5061E4] bg-[#5061E4] text-white"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
      )}
    >
      {children}
    </button>
  );
}
