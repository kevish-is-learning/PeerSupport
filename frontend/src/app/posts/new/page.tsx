'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postsApi } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { ArrowLeft, User, Send } from 'lucide-react';
import Link from 'next/link';

export default function NewPostPage() {
  const { token, user } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError('');
    setLoading(true);

    try {
      const body: Record<string, unknown> = {
        title,
        content,
        isAnonymous,
      };
      if (categoryId) body.categoryId = categoryId;
      if (tags.trim()) {
        body.tags = tags.split(',').map((t) => t.trim()).filter(Boolean);
      }
      const res = await postsApi.create(token, body) as any;
      router.push(`/posts/${res.data.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <Link
        href="/feed"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Feed
      </Link>

      <div className="bg-card rounded-xl border border-border p-6">
        <h1 className="text-xl font-bold text-foreground mb-1">Create a Post</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Share what&apos;s on your mind. The community is here to support you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="px-4 py-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={200}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary bg-white transition-colors"
              placeholder="Give your post a descriptive title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary bg-white transition-colors"
              placeholder="Share your thoughts, feelings, or questions..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Tags <span className="text-muted-foreground font-normal">(comma separated, optional)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary bg-white transition-colors"
              placeholder="e.g. anxiety, coping, support"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/30"
              />
              <User className="w-3.5 h-3.5" />
              Post anonymously
            </label>

            <button
              type="submit"
              disabled={loading || !title.trim() || !content.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
