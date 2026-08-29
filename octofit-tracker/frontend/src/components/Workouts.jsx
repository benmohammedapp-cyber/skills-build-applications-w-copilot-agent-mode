import { useEffect, useState } from 'react';

const getWorkoutsApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName.trim() && codespaceName !== 'undefined') {
    return `https://${codespaceName.trim()}-8000.app.github.dev/api/workouts/`;
  }

  return 'http://localhost:8000/api/workouts/';
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(getWorkoutsApiUrl())
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        return response.json();
      })
      .then((payload) => {
        const data = Array.isArray(payload) ? payload : payload.results ?? payload.data ?? payload.items ?? [];
        setWorkouts(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Workouts</h2>
        {loading && <p>Loading workouts...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div key={workout.id ?? workout.name} className="col-md-4">
                <div className="border rounded p-3 h-100">
                  <h5>{workout.name}</h5>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                  <p className="mb-0"><strong>Duration:</strong> {workout.duration} min</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
