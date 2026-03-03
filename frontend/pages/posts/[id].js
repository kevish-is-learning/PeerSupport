import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../lib/api';

export default function PostDetail() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [commentAnonymous, setCommentAnonymous] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      loadPost();
      loadComments();
    }
  }, [id]);

  const loadPost = async () => {
    try {
      const response = await api.getPost(id);
      setPost(response.data);
    } catch (err) {
      console.error('Failed to load post:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const response = await api.getComments(id);
      setComments(response.data || []);
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.createComment(id, commentContent, commentAnonymous);
      setCommentContent('');
      setCommentAnonymous(false);
      loadComments();
    } catch (err) {
      setError(err.message || 'Failed to create comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      await api.deleteComment(commentId);
      loadComments();
    } catch (err) {
      alert('Failed to delete comment: ' + err.message);
    }
  };

  const handleDeletePost = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.deletePost(id);
      router.push('/posts');
    } catch (err) {
      alert('Failed to delete post: ' + err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (!post) {
    return <div className="card">Post not found</div>;
  }

  return (
    <div>
      <button onClick={() => router.push('/posts')} className="btn btn-sm mb-3">
        ← Back to Posts
      </button>

      <div className="card">
        <div className="flex-between mb-2">
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px' }}>
              {post.title}
            </h1>
            <p className="text-sm">
              by {post.isAnonymous ? 'Anonymous' : post.author?.username || 'Unknown'} •{' '}
              {post.category} • {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
          {api.token && post.author?.id && (
            <button onClick={handleDeletePost} className="btn btn-sm btn-danger">
              Delete Post
            </button>
          )}
        </div>
        <p style={{ lineHeight: '1.8', marginTop: '24px' }}>{post.content}</p>
      </div>

      <div className="card">
        <div className="card-header">Comments ({comments.length})</div>

        {api.token && (
          <form onSubmit={handleCreateComment} className="mb-3">
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Write a comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                required
              />
            </div>
            <div className="flex-between">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={commentAnonymous}
                  onChange={(e) => setCommentAnonymous(e.target.checked)}
                />
                Comment anonymously
              </label>
              <button type="submit" className="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
            {error && <div className="error">{error}</div>}
          </form>
        )}

        {comments.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.7, padding: '20px' }}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div>
            {comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  borderTop: '1px solid #333',
                  paddingTop: '16px',
                  marginTop: '16px',
                }}
              >
                <div className="flex-between mb-1">
                  <p className="text-sm">
                    {comment.isAnonymous ? 'Anonymous' : comment.author?.username || 'Unknown'} •{' '}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                  {api.token && comment.author?.id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p style={{ lineHeight: '1.6' }}>{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
