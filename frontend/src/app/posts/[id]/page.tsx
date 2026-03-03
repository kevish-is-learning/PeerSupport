'use client';

import { useEffect, useState, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { postsApi, commentsApi } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { Comment } from '@/components/Comment';
import { LoadingSpinner, Badge } from '@/components/ui';
import { timeAgo, cn } from '@/lib/utils';
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Eye,
  ArrowLeft,
  User,
  Flag,
  Pencil,
  Trash2,
  Send,
} from 'lucide-react';

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, token } = useAuth();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [isAnonymousComment, setIsAnonymousComment] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      const res = await postsApi.getOne(id, token || undefined) as any;
      setPost(res.data);
    } catch {
      router.push('/feed');
    }
  }, [id, token, router]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await commentsApi.getByPost(id) as any;
      setComments(res.data || []);
    } catch {
      setComments([]);
    }
  }, [id]);

  useEffect(() => {
    Promise.all([fetchPost(), fetchComments()]).finally(() => setLoading(false));
  }, [fetchPost, fetchComments]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim() || !token) return;
    setSubmitting(true);
    try {
      await commentsApi.create(token, id, {
        content: commentContent.trim(),
        isAnonymous: isAnonymousComment,
      });
      setCommentContent('');
      await fetchComments();
      await fetchPost(); // refresh comment count
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId: string, content: string) => {
    if (!token) return;
    try {
      await commentsApi.create(token, id, { content, parentId });
      await fetchComments();
    } catch {
      // ignore
    }
  };

  const handleDelete = async () => {
    if (!token || !confirm('Are you sure you want to delete this post?')) return;
    try {
      await postsApi.delete(token, id);
      router.push('/feed');
    } catch {
      // ignore
    }
  };

  if (loading) return <LoadingSpinner className="mt-20" />;
  if (!post) return null;

  const score = post.upvoteCount - post.downvoteCount;
  const isAuthor = user?.id === post.authorId;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      {/* Back button */}
      <Link
        href="/feed"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Feed
      </Link>

      {/* Post */}
      <article className="bg-card rounded-xl border border-border p-6 mb-6">
        {/* Meta */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          {post.category && (
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
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
              <User className="w-3.5 h-3.5" /> Anonymous
            </span>
          ) : post.author ? (
            <Link href={`/users/${post.author.id}`} className="hover:text-foreground font-medium transition-colors">
              {post.author.displayName || post.author.username}
            </Link>
          ) : null}
          <span>•</span>
          <time>{timeAgo(post.createdAt)}</time>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-4 leading-snug">{post.title}</h1>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map(({ tag }: any) => (
              <span
                key={tag.slug}
                className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md font-medium"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-stone max-w-none text-foreground leading-relaxed whitespace-pre-wrap mb-6">
          {post.content}
        </div>

        {/* Actions bar */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors">
                <ArrowBigUp className="w-5 h-5" />
              </button>
              <span className={cn(
                'text-sm font-semibold tabular-nums',
                score > 0 ? 'text-primary' : score < 0 ? 'text-destructive' : 'text-muted-foreground'
              )}>
                {score}
              </span>
              <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-destructive transition-colors">
                <ArrowBigDown className="w-5 h-5" />
              </button>
            </div>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              {post.commentCount}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              {post.viewCount}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {isAuthor && (
              <>
                <Link
                  href={`/posts/${id}/edit`}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </article>

      {/* Comment form */}
      {user && (
        <form onSubmit={handleAddComment} className="bg-card rounded-xl border border-border p-4 mb-6">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Share your thoughts or words of support..."
            rows={3}
            className="w-full px-3 py-2.5 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary bg-white transition-colors"
          />
          <div className="flex items-center justify-between mt-3">
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymousComment}
                onChange={(e) => setIsAnonymousComment(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/30"
              />
              <User className="w-3.5 h-3.5" />
              Post anonymously
            </label>
            <button
              type="submit"
              disabled={!commentContent.trim() || submitting}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? 'Posting...' : 'Comment'}
            </button>
          </div>
        </form>
      )}

      {/* Comments */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Comments ({post.commentCount})
        </h2>
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          <div className="space-y-1 divide-y divide-border">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleReply}
                isLoggedIn={!!user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
