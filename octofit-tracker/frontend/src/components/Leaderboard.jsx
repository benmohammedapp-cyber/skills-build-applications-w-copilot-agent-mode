import { useEffect, useState } from 'react';

const getLeaderboardApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName.trim() && codespaceName !== 'undefined') {
    return `https://${codespaceName.trim()}-8000.app.github.dev/api/leaderboard/`;
  }

  return 'http://localhost:8000/api/leaderboard/';
};

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(getLeaderboardApiUrl())
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        return response.json();
      })
      .then((payload) => {
        const data = Array.isArray(payload) ? payload : payload.results ?? payload.data ?? payload.items ?? [];
        setEntries(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Leaderboard</h2>
        {loading && <p>Loading leaderboard...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id ?? `${entry.name}-${entry.rank}`}>
                    <td>{entry.rank}</td>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
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
