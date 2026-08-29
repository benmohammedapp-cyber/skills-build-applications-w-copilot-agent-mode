import { useEffect, useState } from 'react';

const getUsersApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName.trim() && codespaceName !== 'undefined') {
    return `https://${codespaceName.trim()}-8000.app.github.dev/api/users/`;
  }

  return 'http://localhost:8000/api/users/';
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(getUsersApiUrl())
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        return response.json();
      })
      .then((payload) => {
        const data = Array.isArray(payload) ? payload : payload.results ?? payload.data ?? payload.items ?? [];
        setUsers(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Users</h2>
        {loading && <p>Loading users...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id ?? `${user.name}-${user.email}`}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
