import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../lib/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!api.token) {
      router.push('/login');
      return;
    }
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await api.getProfile();
      setUser(response.data);
      setBio(response.data.bio || '');
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.updateProfile({ bio });
      setEditing(false);
      loadProfile();
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return <div className="card">Profile not found</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Profile</h1>

      <div className="card">
        <div className="flex-between mb-3">
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '600' }}>{user.username}</h2>
            <p className="text-sm">{user.email}</p>
          </div>
          {!editing && (
            <button onClick={() => setEditing(true)} className="btn btn-sm">
              Edit Profile
            </button>
          )}
        </div>

        <div style={{ borderTop: '1px solid #333', paddingTop: '20px', marginTop: '20px' }}>
          <p className="text-sm" style={{ marginBottom: '8px' }}>
            <strong>Role:</strong> {user.role}
          </p>
          <p className="text-sm" style={{ marginBottom: '8px' }}>
            <strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {editing ? (
          <form onSubmit={handleUpdate} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                className="form-control"
                rows="4"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="flex" style={{ gap: '10px' }}>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setBio(user.bio || '');
                }}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Bio</h3>
            <p style={{ lineHeight: '1.6' }}>{user.bio || 'No bio yet.'}</p>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">Statistics</div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div>
            <p style={{ fontSize: '32px', fontWeight: '700' }}>{user._count?.posts || 0}</p>
            <p className="text-sm">Posts</p>
          </div>
          <div>
            <p style={{ fontSize: '32px', fontWeight: '700' }}>{user._count?.comments || 0}</p>
            <p className="text-sm">Comments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
