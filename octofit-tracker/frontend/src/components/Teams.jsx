import { useEffect, useState } from 'react';
import { fetchApiCollection } from '../api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApiCollection('teams')
      .then((data) => setTeams(data))
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
