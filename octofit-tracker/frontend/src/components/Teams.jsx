import { useEffect, useState } from 'react';

const getTeamsApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName.trim() && codespaceName !== 'undefined') {
    return `https://${codespaceName.trim()}-8000.app.github.dev/api/teams/`;
  }

  return 'http://localhost:8000/api/teams/';
};

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(getTeamsApiUrl())
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        return response.json();
      })
      .then((payload) => {
        const data = Array.isArray(payload) ? payload : payload.results ?? payload.data ?? payload.items ?? [];
        setTeams(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Teams</h2>
        {loading && <p>Loading teams...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <div className="row g-3">
            {teams.map((team) => (
              <div key={team.id ?? team.name} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h5>{team.name}</h5>
                  <p className="mb-1"><strong>Sport:</strong> {team.sport}</p>
                  <p className="mb-0"><strong>Members:</strong> {Array.isArray(team.members) ? team.members.length : 0}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
