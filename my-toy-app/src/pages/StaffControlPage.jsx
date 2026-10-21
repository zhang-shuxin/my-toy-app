import { useEffect, useState } from 'react';
import DataControlPage from './DataControlPage.jsx';

const normalizeComment = (comment) => ({
  id: comment.id,
  text: comment.description,
  image: String(comment.imageUrl || '').replace(/^http:\/\//i, 'https://'),
  date: comment.dateCreated,
});

const normalizeToy = (toy) => ({
  id: toy.id,
  image: String(toy.imageUrl || '').replace(/^http:\/\//i, 'https://'),
  story: toy.story,
  scale: Number(toy.scale || 0),
  x: Number(toy.positionX || 0),
  y: Number(toy.positionY || 0),
  comments: Array.isArray(toy.comments) ? toy.comments.map(normalizeComment) : [],
  date: toy.dateCreated,
});

function StaffControlPage({ apiBaseUrl, onBack }) {
  const [token, setToken] = useState(() => sessionStorage.getItem('toy-community-staff-token') || '');
  const [password, setPassword] = useState('');
  const [toys, setToys] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdminToys = async (authToken = token) => {
    const response = await fetch(`${apiBaseUrl}/admin/toys`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.ok) {
      if (response.status === 401) {
        sessionStorage.removeItem('toy-community-staff-token');
        setToken('');
      }
      throw new Error('Could not load staff data.');
    }

    const data = await response.json();
    setToys(data.map(normalizeToy));
  };

  useEffect(() => {
    if (!token) return;

    fetchAdminToys().catch((loadError) => {
      console.error(loadError);
      setError(loadError.message);
    });
  }, [token]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiBaseUrl}/staff/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const responseType = response.headers.get('content-type') || '';
      if (!responseType.includes('application/json')) {
        throw new Error('Staff login is not available on the deployed backend. Deploy/restart the updated server first.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not sign in.');
      }

      sessionStorage.setItem('toy-community-staff-token', data.token);
      setToken(data.token);
      setPassword('');
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (path, message) => {
    const response = await fetch(`${apiBaseUrl}/admin/${path}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(message);
    }

    await fetchAdminToys();
  };

  const handleDeleteToy = async (toy) => {
    if (!window.confirm(`Delete this toy and its ${toy.comments.length} comments?`)) return;

    try {
      await handleDelete(`toys/${toy.id}`, 'The toy could not be deleted.');
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  const handleDeleteComment = async (comment) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      await handleDelete(`comments/${comment.id}`, 'The comment could not be deleted.');
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  if (!token) {
    return (
      <div className="mobile-container staff-login-page">
        <form className="staff-login-card" onSubmit={handleLogin}>
          <p className="data-control-eyebrow">PRIVATE AREA</p>
          <h1>Staff control</h1>
          <p>Enter the staff password to continue.</p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Staff password"
            autoComplete="current-password"
            required
          />
          {error && <p className="data-control-error" role="alert">{error}</p>}
          <button className="nav-btn btn-solid-active" type="submit" disabled={isLoading}>
            {isLoading ? 'CHECKING...' : 'SIGN IN'}
          </button>
          <button className="cancel-text-btn" type="button" onClick={onBack}>BACK</button>
        </form>
      </div>
    );
  }

  return (
    <DataControlPage
      savedToys={toys}
      adminSearch={search}
      setAdminSearch={setSearch}
      adminError={error}
      fetchToys={fetchAdminToys}
      handleAdminDeleteToy={handleDeleteToy}
      handleAdminDeleteComment={handleDeleteComment}
      onBack={onBack}
    />
  );
}

export default StaffControlPage;
