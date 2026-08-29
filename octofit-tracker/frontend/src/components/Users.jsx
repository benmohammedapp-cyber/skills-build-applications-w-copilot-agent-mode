import { useEffect, useState } from 'react';
import { fetchApiCollection } from '../api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApiCollection('users')
      .then((data) => setUsers(data))
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
