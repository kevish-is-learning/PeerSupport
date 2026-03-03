import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../lib/api';

export default function Home() {
  const [health, setHealth] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const response = await api.health();
      setHealth(response);
    } catch (error) {
      console.error('Health check failed:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '24px' }}>PeerSupport</h1>
      <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.7 }}>
        A minimal frontend to test backend API routes
      </p>
      
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-header">API Health</div>
        {health ? (
          <div style={{ textAlign: 'left' }}>
            <p><strong>Status:</strong> {health.success ? '✓ Running' : '✗ Down'}</p>
            <p><strong>Message:</strong> {health.message}</p>
            <p><strong>Uptime:</strong> {Math.floor(health.uptime)}s</p>
            <p className="text-sm"><strong>Timestamp:</strong> {health.timestamp}</p>
          </div>
        ) : (
          <div className="loading">Checking API...</div>
        )}
      </div>

      <div className="flex" style={{ justifyContent: 'center', marginTop: '40px', gap: '16px' }}>
        {api.token ? (
          <button onClick={() => router.push('/posts')} className="btn btn-primary">
            View Posts
          </button>
        ) : (
          <>
            <button onClick={() => router.push('/login')} className="btn btn-primary">
              Login
            </button>
            <button onClick={() => router.push('/register')} className="btn">
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}
