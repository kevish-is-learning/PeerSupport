'use client';

import Link from 'next/link';
import { timeAgo, truncate, cn, getInitials } from '@/lib/utils';
import { MessageCircle, ArrowBigUp, ArrowBigDown, Eye, Bookmark, User } from 'lucide-react';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    excerpt?: string;
    content: string;
    isAnonymous: boolean;
    upvoteCount: number;
    downvoteCount: number;
    commentCount: number;
    viewCount: number;
    createdAt: string;
    author?: {
      id: string;
      username: string;
      displayName?: string;
      avatar?: string;
    };
    category?: {
      name: string;
      color?: string;
      slug: string;
    };
    tags?: { tag: { name: string; slug: string } }[];
  };
  compact?: boolean;
}

export function PostCard({ post, compact = false }: PostCardProps) {
  const displayText = post.excerpt || truncate(post.content, compact ? 120 : 200);
  const score = post.upvoteCount - post.downvoteCount;

  return (
    <article className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-all hover:shadow-sm animate-fade-in">
      <div className="flex gap-3">
        {/* Vote column */}
        <div className="flex flex-col items-center gap-0.5 pt-1">
          <button className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-primary transition-colors">
            <ArrowBigUp className="w-5 h-5" />
          </button>
          <span className={cn(
            'text-sm font-semibold tabular-nums',
            score > 0 ? 'text-primary' : score < 0 ? 'text-destructive' : 'text-muted-foreground'
          )}>
            {score}
          </span>
          <button className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-destructive transition-colors">
            <ArrowBigDown className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Meta row */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
            {post.category && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: post.category.color ? `${post.category.color}20` : undefined,
                  color: post.category.color || undefined,
                }}
              >
                {post.category.name}
              </span>
            )}
            <span>•</span>
            {post.isAnonymous ? (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" /> Anonymous
              </span>
            ) : post.author ? (
              <Link href={`/users/${post.author.id}`} className="hover:text-foreground transition-colors">
                {post.author.displayName || post.author.username}
              </Link>
            ) : null}
            <span>•</span>
            <time>{timeAgo(post.createdAt)}</time>
          </div>

          {/* Title */}
          <Link href={`/posts/${post.id}`}>
            <h3 className="font-semibold text-foreground hover:text-primary transition-colors leading-snug mb-1">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          {!compact && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {displayText}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {post.tags.slice(0, 4).map(({ tag }) => (
                <span
                  key={tag.slug}
                  className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md font-medium"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Footer stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link
              href={`/posts/${post.id}`}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              {post.commentCount} {compact ? '' : 'comments'}
            </Link>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {post.viewCount}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
