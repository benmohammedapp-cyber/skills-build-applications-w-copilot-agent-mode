import { useEffect, useState } from 'react';
import { fetchApiCollection } from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApiCollection('activities')
      .then((data) => setActivities(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Activities</h2>
        {loading && <p>Loading activities...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Calories</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id ?? `${activity.type}-${activity.date}`}>
                    <td>{activity.type}</td>
                    <td>{activity.duration} min</td>
                    <td>{activity.calories}</td>
                    <td>{activity.date}</td>
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
