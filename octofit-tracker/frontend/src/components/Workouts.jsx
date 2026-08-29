import { useEffect, useState } from 'react';
import { fetchApiCollection } from '../api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApiCollection('workouts')
      .then((data) => setWorkouts(data))
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
