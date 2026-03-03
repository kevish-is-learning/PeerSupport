import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../lib/api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('reports');
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false);
  
  // Report form
  const [targetType, setTargetType] = useState('POST');
  const [targetId, setTargetId] = useState('');
  const [reason, setReason] = useState('SPAM');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    if (!api.token) {
      router.push('/login');
      return;
    }
    if (activeTab === 'reports') {
      loadReports();
    } else if (activeTab === 'users') {
      loadUsers();
    }
  }, [activeTab]);

  const loadReports = async () => {
    setLoading(true);
    try {
      const response = await api.getReports();
      setReports(response.data || []);
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await api.getAllUsers();
      setUsers(response.data || []);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.createReport(targetType, targetId, reason, description);
      setTargetType('POST');
      setTargetId('');
      setReason('SPAM');
      setDescription('');
      setShowReportForm(false);
      loadReports();
    } catch (err) {
      setError(err.message || 'Failed to create report');
    }
  };

  const handleResolveReport = async (id, action) => {
    const notes = prompt('Enter resolution notes (optional):');
    if (notes === null) return;

    try {
      await api.resolveReport(id, action, notes);
      loadReports();
    } catch (err) {
      alert('Failed to resolve report: ' + err.message);
    }
  };

  const handleBanUser = async (userId) => {
    const reason = prompt('Enter ban reason:');
    if (!reason) return;

    if (!confirm('Are you sure you want to ban this user?')) return;

    try {
      await api.banUser(userId, reason);
      loadUsers();
    } catch (err) {
      alert('Failed to ban user: ' + err.message);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Admin Panel</h1>

      <div className="flex mb-3" style={{ gap: '10px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <button
          onClick={() => setActiveTab('reports')}
          className="btn btn-sm"
          style={{
            background: activeTab === 'reports' ? '#fff' : 'transparent',
            color: activeTab === 'reports' ? '#000' : '#fff',
          }}
        >
          Reports
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className="btn btn-sm"
          style={{
            background: activeTab === 'users' ? '#fff' : 'transparent',
            color: activeTab === 'users' ? '#000' : '#fff',
          }}
        >
          Users
        </button>
      </div>

      {activeTab === 'reports' && (
        <div>
          <div className="flex-between mb-3">
            <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Reports</h2>
            <button onClick={() => setShowReportForm(!showReportForm)} className="btn btn-sm btn-primary">
              {showReportForm ? 'Cancel' : '+ Create Report'}
            </button>
          </div>

          {showReportForm && (
            <div className="card mb-3">
              <div className="card-header">Create Report</div>
              <form onSubmit={handleCreateReport}>
                <div className="form-group">
                  <label className="form-label">Target Type</label>
                  <select
                    className="form-control"
                    value={targetType}
                    onChange={(e) => setTargetType(e.target.value)}
                  >
                    <option value="POST">Post</option>
                    <option value="COMMENT">Comment</option>
                    <option value="USER">User</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Target ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Reason</label>
                  <select
                    className="form-control"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option value="SPAM">Spam</option>
                    <option value="HARASSMENT">Harassment</option>
                    <option value="INAPPROPRIATE">Inappropriate Content</option>
                    <option value="MISINFORMATION">Misinformation</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" className="btn btn-primary">
                  Submit Report
                </button>
              </form>
            </div>
          )}

          {loading ? (
            <div className="loading">Loading reports...</div>
          ) : reports.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ opacity: 0.7 }}>No reports found.</p>
            </div>
          ) : (
            <div>
              {reports.map((report) => (
                <div key={report.id} className="card">
                  <div className="flex-between mb-2">
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                        {report.targetType} Report
                      </h3>
                      <p className="text-sm">
                        Reported by {report.reporter?.username} •{' '}
                        {new Date(report.createdAt).toLocaleDateString()} •{' '}
                        Status: {report.status}
                      </p>
                    </div>
                    {report.status === 'PENDING' && (
                      <div className="flex" style={{ gap: '8px' }}>
                        <button
                          onClick={() => handleResolveReport(report.id, 'REMOVE_CONTENT')}
                          className="btn btn-sm btn-danger"
                        >
                          Remove Content
                        </button>
                        <button
                          onClick={() => handleResolveReport(report.id, 'WARNING')}
                          className="btn btn-sm"
                        >
                          Warning
                        </button>
                        <button
                          onClick={() => handleResolveReport(report.id, 'NO_ACTION')}
                          className="btn btn-sm"
                        >
                          No Action
                        </button>
                      </div>
                    )}
                  </div>
                  <p style={{ marginTop: '12px' }}>
                    <strong>Reason:</strong> {report.reason}
                  </p>
                  {report.description && (
                    <p style={{ marginTop: '8px' }}>
                      <strong>Description:</strong> {report.description}
                    </p>
                  )}
                  <p className="text-sm" style={{ marginTop: '8px' }}>
                    <strong>Target ID:</strong> {report.targetId}
                  </p>
                  {report.resolvedAt && (
                    <p className="text-sm" style={{ marginTop: '8px' }}>
                      <strong>Resolved:</strong> {new Date(report.resolvedAt).toLocaleString()}
                      {report.resolutionNotes && ` - ${report.resolutionNotes}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Users</h2>
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ opacity: 0.7 }}>No users found.</p>
            </div>
          ) : (
            <div>
              {users.map((user) => (
                <div key={user.id} className="card">
                  <div className="flex-between">
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                        {user.username}
                      </h3>
                      <p className="text-sm">{user.email}</p>
                      <p className="text-sm">
                        Role: {user.role} • Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        Posts: {user._count?.posts || 0} • Comments: {user._count?.comments || 0}
                      </p>
                    </div>
                    {!user.isBanned && user.role === 'USER' && (
                      <button onClick={() => handleBanUser(user.id)} className="btn btn-sm btn-danger">
                        Ban User
                      </button>
                    )}
                    {user.isBanned && (
                      <span style={{ color: '#f44', fontWeight: '600' }}>BANNED</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
