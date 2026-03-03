import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../lib/api';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('GENERAL');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await api.getPosts();
      setPosts(response.data || []);
    } catch (err) {
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.createPost(title, content, category, isAnonymous);
      setTitle('');
      setContent('');
      setCategory('GENERAL');
      setIsAnonymous(false);
      setShowForm(false);
      loadPosts();
    } catch (err) {
      setError(err.message || 'Failed to create post');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.deletePost(id);
      loadPosts();
    } catch (err) {
      alert('Failed to delete post: ' + err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div>
      <div className="flex-between mb-3">
        <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Posts</h1>
        {api.token && (
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Cancel' : '+ New Post'}
          </button>
        )}
      </div>

      {showForm && (
        <div className="card mb-3">
          <div className="card-header">Create New Post</div>
          <form onSubmit={handleCreatePost}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="GENERAL">General</option>
                <option value="MENTAL_HEALTH">Mental Health</option>
                <option value="ACADEMIC">Academic</option>
                <option value="RELATIONSHIPS">Relationships</option>
                <option value="CAREER">Career</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                Post anonymously
              </label>
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="btn btn-primary">
              Create Post
            </button>
          </form>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ opacity: 0.7 }}>No posts yet. Be the first to create one!</p>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="card">
              <div className="flex-between mb-2">
                <div>
                  <h3
                    style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', cursor: 'pointer' }}
                    onClick={() => router.push(`/posts/${post.id}`)}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm">
                    by {post.isAnonymous ? 'Anonymous' : post.author?.username || 'Unknown'} •{' '}
                    {post.category} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {api.token && post.author?.id && (
                  <button onClick={() => handleDelete(post.id)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                )}
              </div>
              <p style={{ lineHeight: '1.6' }}>{post.content.substring(0, 200)}...</p>
              <div className="flex mt-2" style={{ gap: '16px', fontSize: '14px', opacity: 0.7' }}>
                <span>💬 {post._count?.comments || 0} comments</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
